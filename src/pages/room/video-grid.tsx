import { cn } from '@/utils/functions';
import ParticipantTile from './participant-tile';
import { useParticipants } from '@/hooks/useParticipants';

const VideoGrid = () => {
  const participants = useParticipants();

  console.log('Participants PAGE:', participants);

  return (
    <div
      className={cn(
        'grid gap-4 items-center justify-center w-full h-[calc(100vh-80px)] !p-4 !border-b !border-white/5',
        participants.length > 0 ? 'grid-cols-2' : 'grid-cols-1',
      )}
    >
      {participants?.map((participant) => {
        return (
          <ParticipantTile key={participant.tileId} participant={participant} />
        );
      })}
    </div>
  );
};

export default VideoGrid;
