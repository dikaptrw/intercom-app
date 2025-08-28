import useToken, {
  ACCESS_TOKEN_COOKIE_NAME,
  ID_TOKEN_COOKIE_NAME,
} from '@/hooks/useToken';
import { GRAPHQL_URL } from '@/utils/constants/config';
import Cookies from 'js-cookie';

const fetchData = async <TData, TVariables>(
  url: string,
  query: string,
  variables?: TVariables,
  options?: RequestInit['headers'],
  accessToken?: string,
): Promise<TData> => {
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      ...options,
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  function handleUnauthorized() {
    localStorage.clear();
    Cookies.remove(ACCESS_TOKEN_COOKIE_NAME);
    Cookies.remove(ID_TOKEN_COOKIE_NAME);
    window.location.replace('/');
  }

  if (res.status === 401) {
    handleUnauthorized();
  }

  const json = await res.json();

  if (json.errors) {
    const { message } = json.errors[0] || {};

    if (message === 'invalid.token') {
      handleUnauthorized();
    }

    throw new Error(message || 'Error…');
  }

  return json.data;
};

export const useFetchData = <TData, TVariables>(
  query: string,
  variables?: TVariables,
  options?: RequestInit['headers'],
): (() => Promise<TData>) => {
  const { getAccessToken } = useToken();

  return async () => {
    return await fetchData<TData, TVariables>(
      GRAPHQL_URL,
      query,
      variables,
      options,
      getAccessToken(),
    );
  };
};
