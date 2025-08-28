import type { CodegenConfig } from '@graphql-codegen/cli';
import { GRAPHQL_URL } from './src/utils/constants/config';
import { ACCESS_TOKEN } from './graphql/config';

const config: CodegenConfig = {
  overwrite: true,
  schema: {
    [GRAPHQL_URL]: {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + ACCESS_TOKEN,
      },
    },
  },
  documents: './graphql/operations.graphql',
  ignoreNoDocuments: true,
  generates: {
    'src/graphql/api.graphql.ts': {
      plugins: [
        {
          add: {
            content: '// @ts-ignore\n',
          },
        },
        'typescript',
        'typescript-operations',
        'typescript-react-query',
      ],
    },
    './graphql/schema.graphql': {
      plugins: ['schema-ast'],
      config: {
        includeDirectives: true,
      },
    },
  },
  config: {
    fetcher: '../hooks/useGraphqlFetcher#useFetchData',
    reactQueryVersion: 5,
    pureMagicComment: true,
    exposeQueryKeys: true,
    exposeFetcher: true,
    isReactHook: true,
  },
  hooks: { afterAllFileWrite: ['prettier --write'] },
};

export default config;
