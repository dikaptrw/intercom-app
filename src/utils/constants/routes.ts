// Please sort the data alphabetically AAAA-ZZZZ

import { generateRootPath } from '@/utils/functions/routes';

export const BASE_ROUTES = {
  JOIN: 'join',
  MEETING_ROOM: 'room/:meetingId',
};

// Please sort the data alphabetically AAAA-ZZZZ
export const ROUTES = {
  JOIN: generateRootPath(BASE_ROUTES.JOIN),
  MEETING_ROOM: generateRootPath(BASE_ROUTES.MEETING_ROOM),
};
