import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { useFetchData } from '../hooks/useGraphqlFetcher';
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
    queryFn: useFetchData<UnitsQuery, UnitsQueryVariables>(
      UnitsDocument,
      variables,
    ),
    ...options,
  });
};

useUnitsQuery.getKey = (variables?: UnitsQueryVariables) =>
  variables === undefined ? ['units'] : ['units', variables];

useUnitsQuery.fetcher = (
  variables?: UnitsQueryVariables,
  options?: RequestInit['headers'],
) =>
  useFetchData<UnitsQuery, UnitsQueryVariables>(
    UnitsDocument,
    variables,
    options,
  );
