import type { Participant } from '@/utils/constants/meeting';
import { cn, getInitials } from '@/utils/functions';
import {
  LocalVideo,
  RemoteVideo,
  RosterAttendee,
  useLocalVideo,
} from 'amazon-chime-sdk-component-library-react';
import { useRef } from 'react';

export interface ParticipantTileProps {
  participant?: Participant;
  className?: string;
}

const FallbackInitials = ({ name }: { name: string }) => {
  const initials = getInitials(name);
  return (
    <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 z-[5] bg- text-white p-1 rounded-full h-[20%] md:h-[30%] aspect-square flex items-center justify-center font-medium uppercase [container-type:inline-size] bg-room-primary">
      <span className="!text-[35cqw] md:!text-[40cqw]">{initials}</span>
    </div>
  );
};

const ParticipantTile = ({ participant, className }: ParticipantTileProps) => {
  const { isVideoEnabled } = useLocalVideo();

  const handleEnterPiP = async () => {
    participant?.tileState?.boundVideoElement?.requestPictureInPicture();
  };

  return (
    <div
      className={cn(
        'relative w-full h-full bg-room-foreground rounded-lg overflow-hidden flex items-center justify-center',
        className,
      )}
    >
      <div className="flex items-center justify-center w-full h-full">
        {/* Aspect ratio video inside */}
        <div className="w-full h-full max-w-full max-h-full">
          {participant?.isLocal ? (
            isVideoEnabled ? (
              <LocalVideo className="!bg-room-foreground [&>.ch-video]:!aspect-video [&>.ch-video]:!object-contain w-full h-full" />
            ) : (
              <FallbackInitials name={participant?.name || 'You'} />
            )
          ) : participant?.tileId ? (
            <RemoteVideo
              tileId={participant?.tileId}
              className="!bg-room-foreground [&>.ch-video]:!aspect-video [&>.ch-video]:!object-contain w-full h-full"
            />
          ) : (
            <FallbackInitials name={participant?.name || 'Anonymous'} />
          )}
        </div>
      </div>

      {/* picture in picture */}
      <button
        className="absolute top-2 right-2 z-10 bg-white/20 hover:bg-white/30 p-2 rounded-full"
        onClick={handleEnterPiP}
        title="Enter Picture-in-Picture"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 10V5a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-5m-4-4h4m0 0v4m0-4l3.5-3.5M19 10l3.5-3.5M19 10l3.5 3.5M19 10l3.5-3.5"
          />
        </svg>
      </button>

      {/* subtitle */}

      <div className="[&_.ch-subtitle]:!text-sm absolute bottom-2 left-3 right-2 bg-opacity-50 text-white p-1 font-medium">
        <RosterAttendee
          attendeeId={participant?.attendeeId || ''}
          subtitle={
            participant?.isLocal
              ? `${participant?.name} (You)`
              : participant?.name || 'Anonymous'
          }
        />
      </div>
    </div>
  );
};

export default ParticipantTile;
