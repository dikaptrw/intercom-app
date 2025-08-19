// Please sort the data alphabetically AAAA-ZZZZ

import { generateRootPath } from '@/utils/functions/routes';

export const BASE_ROUTES = {
  LOGIN: 'login',
  MEETING: 'meeting',
};

// Please sort the data alphabetically AAAA-ZZZZ
export const ROUTES = {
  LOGIN: generateRootPath(BASE_ROUTES.LOGIN),
  MEETING: generateRootPath(BASE_ROUTES.MEETING),
};
