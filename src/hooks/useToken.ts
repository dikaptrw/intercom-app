import Cookies from 'js-cookie';
import { ATTRIBUTE_DEFAULT_VALUE } from './useCookie';

export const ID_TOKEN_COOKIE_NAME = 'auth.idToken';
export const ACCESS_TOKEN_COOKIE_NAME = 'auth.accessToken';

export const getAccessToken = () => {
  return Cookies.get(ACCESS_TOKEN_COOKIE_NAME) ?? '';
};

export const getIdToken = () => {
  return Cookies.get(ID_TOKEN_COOKIE_NAME) ?? '';
};

export const setAccessToken = (value: string) => {
  Cookies.set(ACCESS_TOKEN_COOKIE_NAME, value, {
    ...ATTRIBUTE_DEFAULT_VALUE,
    ...(!value && { expires: new Date() }), // remove the token if value is null
  });
};

export const setIdToken = (value: string) => {
  Cookies.set(ID_TOKEN_COOKIE_NAME, value, {
    ...ATTRIBUTE_DEFAULT_VALUE,
    ...(!value && { expires: new Date() }), // remove the token if value is null
  });
};

export const removeAllToken = () => {
  Cookies.remove(ACCESS_TOKEN_COOKIE_NAME);
  Cookies.remove(ID_TOKEN_COOKIE_NAME);
};

export default function useToken() {
  // you can call the react hook lifecycle here
  return {
    getAccessToken,
    setAccessToken,
    getIdToken,
    setIdToken,
    removeAllToken,
  };
}
