import { cn } from '@/utils/functions';
import ParticipantTile from './participant-tile';
import { useParticipants } from '@/hooks/useParticipants';

const VideoGrid = () => {
  const participants = useParticipants();

  console.log('Participants:', participants);

  return (
    <div className="h-[calc(100vh-var(--room-control-height))] w-full flex items-center justify-center">
      <div
        className={cn(
          'h-[calc(100vh-var(--room-control-height))] grid gap-4 items-center justify-center w-full p-4 pb-0',
          participants.length > 1 ? 'max-w-[1240px]' : '',
          participants.length <= 1
            ? 'grid-cols-1'
            : participants.length === 2
              ? 'grid-cols-2'
              : participants.length <= 4
                ? 'grid-cols-2'
                : participants.length <= 6
                  ? 'grid-cols-3'
                  : 'grid-cols-4',
        )}
      >
        {participants?.map((participant, i) => {
          const isLastRowStart =
            participants.length % 2 !== 0 && i === participants.length - 1;

          return (
            <div
              key={participant.tileId}
              className={cn(
                'flex h-full w-full justify-center items-center',
                // if last item in an odd row, center it
                isLastRowStart ? 'col-span-full flex justify-center' : '',
              )}
            >
              <ParticipantTile
                className={cn(
                  isLastRowStart && participants.length > 1
                    ? 'max-w-[calc(50%-8px)]'
                    : '',
                )}
                participant={participant}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default VideoGrid;
