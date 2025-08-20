import { cn } from '@/utils/functions';
import {
  LocalVideo,
  RemoteVideo,
  RosterAttendee,
  useRemoteVideoTileState,
  useRosterState,
} from 'amazon-chime-sdk-component-library-react';

const ParticipantTile = ({
  tileId = 0,
  isLocal = false,
}: {
  tileId?: number;
  isLocal?: boolean;
}) => {
  const { roster } = useRosterState(); // contains attendee info
  const { tileIdToAttendeeId } = useRemoteVideoTileState(); // video tiles state

  const attendeeId = tileIdToAttendeeId[tileId];
  const attendeeName =
    (roster[attendeeId]?.name ?? isLocal) ? 'You' : 'Anonymous';

  return (
    <div className="relative w-full h-full bg-black rounded-lg overflow-hidden flex items-center justify-center">
      <div className="aspect-video w-full max-h-full">
        {isLocal ? (
          <LocalVideo className="w-full h-full object-cover" />
        ) : (
          <RemoteVideo tileId={tileId} className="w-full h-full object-cover" />
        )}
      </div>

      <div className="[&_.ch-subtitle]:!text-sm absolute bottom-2 left-3 right-2 bg-opacity-50 text-white p-1 font-medium">
        <RosterAttendee attendeeId={attendeeId} subtitle={attendeeName} />
      </div>
    </div>
  );
};

const VideoGrid = () => {
  const { tiles } = useRemoteVideoTileState();

  return (
    <div
      className={cn(
        'grid gap-4 items-center justify-center w-full h-[calc(100vh-80px)] !p-4 !border-b !border-white/5',
        tiles.length > 0 ? 'grid-cols-2' : 'grid-cols-1',
      )}
    >
      {/* Local user video */}
      <ParticipantTile isLocal />

      {tiles.map((tileId) => {
        return <ParticipantTile key={tileId} tileId={tileId} />;
      })}
    </div>
  );
};

export default VideoGrid;
