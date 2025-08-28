import type { VideoTileState } from 'amazon-chime-sdk-js';
import type { LucideProps } from 'lucide-react';
import type { ForwardRefExoticComponent, RefAttributes } from 'react';

export type Participant = {
  attendeeId: string;
  name: string;
  tileId: number | null;
  isLocal: boolean;
  tileState?: VideoTileState | null;
  isPinned?: boolean;
};

export type ControlItem = {
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>
  >;
  iconClassName?: string;
  onClick: () => void;
  label: string;
  className?: string;
  buttonClassName?: string;
  type?: string;
  tooltip?: string;
  showLabel?: boolean;
};

export type ChatMessage = {
  senderId: string;
  senderName: string;
  text: string;
  timestamp: number;
};
