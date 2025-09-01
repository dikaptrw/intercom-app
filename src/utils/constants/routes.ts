// Please sort the data alphabetically AAAA-ZZZZ

import { generateRootPath } from '@/utils/functions/routes';

export const BASE_ROUTES = {
  JOIN: 'join/:unitId',
  UNITS: 'units',
  MEETING_ROOM: 'room/:meetingId',
};

// Please sort the data alphabetically AAAA-ZZZZ
export const ROUTES = {
  JOIN: generateRootPath(BASE_ROUTES.JOIN),
  UNITS: generateRootPath(BASE_ROUTES.UNITS),
  MEETING_ROOM: generateRootPath(BASE_ROUTES.MEETING_ROOM),
};
