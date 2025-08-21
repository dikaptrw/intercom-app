import type { Participant } from '@/utils/constants/meeting';
import { getInitials } from '@/utils/functions';
import {
  LocalVideo,
  RemoteVideo,
  RosterAttendee,
  useLocalVideo,
} from 'amazon-chime-sdk-component-library-react';

export interface ParticipantTileProps {
  participant?: Participant;
}

const FallbackInitials = ({ name }: { name: string }) => {
  const initials = getInitials(name);
  return (
    <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 z-[5] bg- text-white p-1 rounded-full w-[15%] aspect-square flex items-center justify-center font-medium uppercase [container-type:inline-size] bg-room-primary">
      <span className="!text-[40cqw]">{initials}</span>
    </div>
  );
};

const ParticipantTile = ({ participant }: ParticipantTileProps) => {
  const { isVideoEnabled } = useLocalVideo();

  return (
    <div className="relative w-full h-full bg-room-foreground rounded-lg overflow-hidden flex items-center justify-center">
      <div className="aspect-video w-full max-h-full">
        {participant?.isLocal ? (
          isVideoEnabled ? (
            <LocalVideo className="w-full h-full object-cover" />
          ) : (
            <FallbackInitials name={participant?.name || 'You'} />
          )
        ) : participant?.tileId ? (
          <RemoteVideo
            tileId={participant?.tileId}
            className="w-full h-full object-cover"
          />
        ) : (
          <FallbackInitials name={participant?.name || 'Anonymous'} />
        )}
      </div>

      <div className="[&_.ch-subtitle]:!text-sm absolute bottom-2 left-3 right-2 bg-opacity-50 text-white p-1 font-medium">
        <RosterAttendee
          attendeeId={participant?.attendeeId || ''}
          subtitle={participant?.name}
        />
      </div>
    </div>
  );
};

export default ParticipantTile;
