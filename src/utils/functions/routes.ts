export const MAIN_ROUTES = {
  // you can put another main routes here ex: /v2
  ROOT: "/",
};

/**
 * Generates a function that creates a full path by concatenating
 * a main path with a sub-path.
 *
 * @param main - The main part of the path (base URL or directory).
 * @returns A function that takes a sub-path and returns the full concatenated path.
 *
 * @example
 * const generateUnificationPath = pathGenerator('/v2');
 * const EXAMPLE_ROUTE = generateUnificationPath('sub'); // returns '/v2/sub'
 */
export const pathGenerator =
  (main: string) =>
  (path: string): string => {
    return `${main}/${path}`;
  };

/**
 * Replaces dynamic parameters in a route path with provided values.
 *
 * @param route - The route string containing dynamic parameters in the format `:paramName`.
 * @param params - An object where keys are parameter names and values are their replacements.
 *
 * @returns A new string where the route parameters are replaced with the corresponding values from `params`.
 *
 */
export const generateRouteParams = (
  route: string,
  params: { [key: string]: string | number }
): string => {
  return route.replace(/:([a-zA-Z0-9_]+)/g, (_, paramName) => {
    if (params[paramName] === undefined) {
      throw new Error(`Missing parameter: ${paramName}`);
    }
    return String(params[paramName]);
  });
};

// REGISTER ROUTE PATH GENERATOR HERE
export const generateRootPath = (path: string) => `${MAIN_ROUTES.ROOT}${path}`;
export function generatePathWithModal(path: string) {
  return `${path}/*`;
}
