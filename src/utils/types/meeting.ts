import type { VideoTileState } from 'amazon-chime-sdk-js';
import type { JSX } from 'react';

export type Participant = {
  attendeeId: string;
  name: string;
  tileId: number | null;
  isLocal: boolean;
  tileState?: VideoTileState | null;
  isPinned?: boolean;
};

export type ControlItem = {
  icon: JSX.Element;
  onClick: () => void;
  label: string;
  className?: string;
  buttonClassName?: string;
  type?: string;
  tooltip?: string;
};

export type ChatMessage = {
  senderId: string;
  senderName: string;
  text: string;
  timestamp: number;
};
