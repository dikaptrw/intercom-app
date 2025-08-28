import Cookies from 'js-cookie';

export const ATTRIBUTE_DEFAULT_VALUE: Cookies.CookieAttributes = {
  sameSite: 'Lax',
  secure: !import.meta.env.DEV,
};

function useCookie() {
  const setCookie = (
    name: string,
    value: string,
    attributes: Cookies.CookieAttributes = {},
  ) => {
    Cookies.set(name, value, {
      ...ATTRIBUTE_DEFAULT_VALUE,
      ...attributes,
      ...(!value && { expires: new Date() }), // remove the token if value is null
    });
  };

  const getCookie = (name: string) => {
    return Cookies.get(name) ?? '';
  };

  const removeCookie = (name: string) => {
    Cookies.remove(name);
  };

  return {
    setCookie,
    getCookie,
    removeCookie,
  };
}

export default useCookie;
