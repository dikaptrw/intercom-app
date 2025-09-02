import {
  useQuery,
  useMutation,
  UseQueryOptions,
  UseMutationOptions,
} from '@tanstack/react-query';
import { execute } from '../hooks/useGraphqlFetcher';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never;
    };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
};

export type CallSession = {
  __typename?: 'CallSession';
  id: Scalars['ID']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  call: CallSession;
};

export type MutationCallArgs = {
  id: Scalars['ID']['input'];
};

export type Query = {
  __typename?: 'Query';
  session: Scalars['Boolean']['output'];
  units?: Maybe<Array<Unit>>;
};

export type QuerySessionArgs = {
  id: Scalars['ID']['input'];
};

export type Unit = {
  __typename?: 'Unit';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

export type UnitsQueryVariables = Exact<{ [key: string]: never }>;

export type UnitsQuery = {
  __typename?: 'Query';
  units?: Array<{ __typename?: 'Unit'; id: string; name: string }> | null;
};

export type SessionQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;

export type SessionQuery = { __typename?: 'Query'; session: boolean };

export type CallMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;

export type CallMutation = {
  __typename?: 'Mutation';
  call: { __typename?: 'CallSession'; id: string };
};

export const UnitsDocument = /*#__PURE__*/ `
    query units {
  units {
    id
    name
  }
}
    `;

export const useUnitsQuery = <TData = UnitsQuery, TError = unknown>(
  variables?: UnitsQueryVariables,
  options?: Omit<UseQueryOptions<UnitsQuery, TError, TData>, 'queryKey'> & {
    queryKey?: UseQueryOptions<UnitsQuery, TError, TData>['queryKey'];
  },
) => {
  return useQuery<UnitsQuery, TError, TData>({
    queryKey: variables === undefined ? ['units'] : ['units', variables],
    queryFn: execute<UnitsQuery, UnitsQueryVariables>(UnitsDocument, variables),
    ...options,
  });
};

useUnitsQuery.getKey = (variables?: UnitsQueryVariables) =>
  variables === undefined ? ['units'] : ['units', variables];

useUnitsQuery.fetcher = (
  variables?: UnitsQueryVariables,
  options?: RequestInit['headers'],
) =>
  execute<UnitsQuery, UnitsQueryVariables>(UnitsDocument, variables, options);

export const SessionDocument = /*#__PURE__*/ `
    query session($id: ID!) {
  session(id: $id)
}
    `;

export const useSessionQuery = <TData = SessionQuery, TError = unknown>(
  variables: SessionQueryVariables,
  options?: Omit<UseQueryOptions<SessionQuery, TError, TData>, 'queryKey'> & {
    queryKey?: UseQueryOptions<SessionQuery, TError, TData>['queryKey'];
  },
) => {
  return useQuery<SessionQuery, TError, TData>({
    queryKey: ['session', variables],
    queryFn: execute<SessionQuery, SessionQueryVariables>(
      SessionDocument,
      variables,
    ),
    ...options,
  });
};

useSessionQuery.getKey = (variables: SessionQueryVariables) => [
  'session',
  variables,
];

useSessionQuery.fetcher = (
  variables: SessionQueryVariables,
  options?: RequestInit['headers'],
) =>
  execute<SessionQuery, SessionQueryVariables>(
    SessionDocument,
    variables,
    options,
  );

export const CallDocument = /*#__PURE__*/ `
    mutation call($id: ID!) {
  call(id: $id) {
    id
  }
}
    `;

export const useCallMutation = <TError = unknown, TContext = unknown>(
  options?: UseMutationOptions<
    CallMutation,
    TError,
    CallMutationVariables,
    TContext
  >,
) => {
  return useMutation<CallMutation, TError, CallMutationVariables, TContext>({
    mutationKey: ['call'],
    mutationFn: (variables?: CallMutationVariables) =>
      execute<CallMutation, CallMutationVariables>(CallDocument, variables)(),
    ...options,
  });
};

useCallMutation.fetcher = (
  variables: CallMutationVariables,
  options?: RequestInit['headers'],
) =>
  execute<CallMutation, CallMutationVariables>(
    CallDocument,
    variables,
    options,
  );
