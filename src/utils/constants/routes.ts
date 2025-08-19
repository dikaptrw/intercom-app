// Please sort the data alphabetically AAAA-ZZZZ

import { generateRootPath } from '@/utils/functions/routes';

export const BASE_ROUTES = {
  JOIN: 'join',
  MEETING: 'meeting',
};

// Please sort the data alphabetically AAAA-ZZZZ
export const ROUTES = {
  JOIN: generateRootPath(BASE_ROUTES.JOIN),
  MEETING: generateRootPath(BASE_ROUTES.MEETING),
};
