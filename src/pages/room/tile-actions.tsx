import { useVideoTileState } from '@/hooks/useVideoTileState';
import { useMeetingManager } from 'amazon-chime-sdk-component-library-react';
import { EllipsisVertical, PictureInPicture, Pin } from 'lucide-react';

export interface TileActionsProps {
  attendeeId: string;
  togglePiP: () => void;
}

function TileActions({ attendeeId, togglePiP }: TileActionsProps) {
  const meetingManager = useMeetingManager();

  const videoTileState = useVideoTileState({
    attendeeId: attendeeId || '',
  });
  const localAttendeeId =
    meetingManager.meetingSession?.configuration.credentials?.attendeeId;
  const isLocal = attendeeId === localAttendeeId;

  return (
    <div className="bg-room-background/90 hover:bg-room-background transition-colors duration-300 rounded-full flex items-center [&>button]:w-12 [&>button]:h-12 [&>button]:flex [&>button]:items-center [&>button]:justify-center [&>button]:text-white [&>button]:hover:bg-white/7 [&>button]:rounded-full [&>button]:cursor-pointer">
      <button>
        <Pin className="w-6 h-6" />
      </button>
      {videoTileState?.boundVideoElement && isLocal && (
        <button onClick={togglePiP}>
          <PictureInPicture className="w-6 h-6" />
        </button>
      )}
      <button>
        <EllipsisVertical className="w-6 h-6" />
      </button>
    </div>
  );
}

export default TileActions;
