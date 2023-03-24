import type { AWS } from '@serverless/typescript';

import { submitBuildInfo } from '@functions/submitBuildInfo';

const serverlessConfiguration: AWS = {
  service: 'nfa-serverless',
  frameworkVersion: '3',
  plugins: ['serverless-esbuild', 'serverless-offline'],
  provider: {
    name: 'aws',
    runtime: 'nodejs18.x',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
    },
    // iam: {
    //   role: {
    //     statements: [{
    //       Effect: "Allow",
    //       Action: [
    //         "dynamodb:DescribeTable",
    //         "dynamodb:Query",
    //         "dynamodb:Scan",
    //         "dynamodb:GetItem",
    //         "dynamodb:PutItem",
    //         "dynamodb:UpdateItem",
    //         "dynamodb:DeleteItem",
    //       ],
    //       Resource: "arn:aws:dynamodb:us-west-2:*:table/TodosTable",
    //     }],
    //   },
  },
  // import the function via paths
  functions: { submitBuildInfo },
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node18',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },
  },
};

module.exports = serverlessConfiguration;
