import { DropdownItem } from '@/components';
import { Octokit } from 'octokit';

export type UserData = {
  value: string;
  label: string;
  avatar: string;
};

export class GithubClient {
  octokit: Octokit;
  token: string;

  constructor(token: string) {
    (this.token = token),
      (this.octokit = new Octokit({
        auth: token,
      }));
  }

  async fetchUser(): Promise<UserData> {
    const { data: userData } = await this.octokit.request('GET /user');

    return {
      value: userData.repos_url,
      label: userData.login,
      avatar: userData.avatar_url,
    };
  }

  async fetchOrgs(): Promise<UserData[]> {
    const { data: organizationsData } = await this.octokit.request(
      'GET /user/orgs'
    );

    return organizationsData.map((org) => {
      return {
        label: org.login,
        value: org.repos_url,
        avatar: org.avatar_url,
      };
    });
  }

  async fetchRepos(url: string) {
    try {
      const repos = await fetch(url, {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      }).then((res) => res.json());

      return repos;
    } catch (error) {
      return error;
    }
  }

  async fetchBranches(owner: string, repo: string): Promise<DropdownItem[]> {
    const branches = await this.octokit
      .request('GET /repos/{owner}/{repo}/branches', {
        owner,
        repo,
      })
      .then((res) =>
        res.data.map((branch) => {
          return {
            label: branch.name,
            value: branch.commit.sha,
          };
        })
      );

    return branches;
  }
}