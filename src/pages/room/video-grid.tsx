import { cn } from '@/utils/functions';
import ParticipantTile from './participant-tile';
import { useParticipants } from '@/hooks/useParticipants';
import { useMemo } from 'react';
import type { Participant } from '@/utils/types/meeting';
import { useDevice } from '@/hooks/useDevice';
import {
  useAttendeeStatus,
  useMeetingManager,
} from 'amazon-chime-sdk-component-library-react';

const VideoGrid = () => {
  const { participants: allParticipants, localParticipant } = useParticipants();
  const meetingManager = useMeetingManager();
  const { isMobile, isTablet } = useDevice();

  const localAttendeeId =
    meetingManager.meetingSession?.configuration.credentials?.attendeeId;

  const participants = useMemo<Participant[]>(() => {
    if ((isTablet || isMobile) && allParticipants.length > 1) {
      return allParticipants.filter((p) => p.attendeeId !== localAttendeeId);
    }

    return allParticipants;
  }, [isMobile, isTablet, localAttendeeId, allParticipants]);

  const { videoEnabled } = useAttendeeStatus(localAttendeeId || '');

  return (
    <div className="relative h-[calc(100dvh-var(--room-footer-height)-var(--room-header-height))] w-full flex items-center justify-center px-8 md:px-4 pb-0 pt-0 lg:pt-4">
      {(isTablet || isMobile) && allParticipants.length > 1 && (
        <div
          className={cn(
            'absolute right-4 bottom-13 z-[20]',
            videoEnabled ? 'w-[120px] h-[180px]' : 'w-[100px] h-[80px]',
          )}
        >
          <ParticipantTile
            simpleUi
            className={cn('shadow-2xl border border-black/40')}
            participant={localParticipant}
          />
        </div>
      )}

      <div
        className={cn(
          'h-full grid gap-4 items-center justify-center w-full grid-cols-1',
          participants.length > 1 ? 'max-w-[1240px]' : '',
          participants.length <= 1
            ? 'md:grid-cols-1'
            : participants.length === 2
              ? 'md:grid-cols-2'
              : participants.length <= 4
                ? 'md:grid-cols-2'
                : participants.length <= 6
                  ? 'md:grid-cols-3'
                  : 'md:grid-cols-4',
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
