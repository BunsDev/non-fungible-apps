import React, { forwardRef, useState } from 'react';

import { Card, ComboboxItem, Flex, Grid, Icon, Spinner } from '@/components';
import { Input } from '@/components/core/input';
import { useDebounce } from '@/hooks/use-debounce';
import { useGithubStore } from '@/store';
import { Mint } from '@/views/mint/mint.context';
import { MintCardHeader } from '@/views/mint/mint-card';

import { RepositoriesList } from './repositories-list';
import { UserOrgsCombobox } from './users-orgs-combobox';

export const Loading = () => (
  <Flex
    css={{
      justifyContent: 'center',
      alignItems: 'center',
      height: '$60',
    }}
  >
    <Spinner />
  </Flex>
);

type RepoRowProps = {
  repo: string;
  button: React.ReactNode;
} & React.ComponentProps<typeof Flex>;

export const RepoRow = forwardRef<HTMLDivElement, RepoRowProps>(
  ({ repo, button, ...props }, ref) => (
    <Flex
      {...props}
      ref={ref}
      // eslint-disable-next-line react/prop-types
      css={{ justifyContent: 'space-between', my: '$4', ...props.css }}
    >
      <Flex css={{ alignItems: 'center' }}>
        <Icon name="github" css={{ fontSize: '$2xl', mr: '$2' }} />
        <span>{repo}</span>
      </Flex>
      {button}
    </Flex>
  )
);

RepoRow.displayName = 'RepoRow';

export const GithubRepositoryConnection: React.FC = () => {
  const { queryLoading, queryUserAndOrganizations } = useGithubStore();
  const [searchValue, setSearchValue] = useState('');

  const { setGithubStep, setSelectedUserOrg } = Mint.useContext();

  const setSearchValueDebounced = useDebounce(
    (event: React.ChangeEvent<HTMLInputElement>) =>
      setSearchValue(event.target.value),
    500
  );

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.stopPropagation();
    setSearchValueDebounced(event);
  };

  const handlePrevStepClick = () => {
    setGithubStep(1);
    setSelectedUserOrg({} as ComboboxItem);
  };

  return (
    <Card.Container css={{ maxWidth: '$107h', maxHeight: '$95h', pb: '$0h' }}>
      <MintCardHeader
        title="Select Repository"
        onClickBack={handlePrevStepClick}
      />
      <Card.Body css={{ pt: '$4' }}>
        <Grid css={{ rowGap: '$2' }}>
          <Flex css={{ gap: '$4' }}>
            <UserOrgsCombobox />
            <Input
              leftIcon="search"
              placeholder="Search repo"
              onChange={handleSearchChange}
            />
          </Flex>
          {queryLoading === 'loading' ||
          queryUserAndOrganizations === 'loading' ? (
            <Loading />
          ) : (
            <RepositoriesList searchValue={searchValue} />
          )}
        </Grid>
      </Card.Body>
    </Card.Container>
  );
};
