import type { VideoTileState } from 'amazon-chime-sdk-js';

export type Participant = {
  attendeeId: string;
  name: string;
  tileId: number | null;
  isLocal: boolean;
  tileState?: VideoTileState | null;
  isPinned?: boolean;
};
