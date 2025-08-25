import { cn } from '@/utils/functions';
import {
  Camera,
  Microphone,
  useAttendeeStatus,
  useMeetingManager,
  useRosterState,
} from 'amazon-chime-sdk-component-library-react';

export interface RosterAttendeeProps {
  attendeeId: string;
  className?: string;
  simpleUi?: boolean;
}

function RosterAttendee({
  attendeeId,
  className,
  simpleUi,
}: RosterAttendeeProps) {
  const { roster } = useRosterState();
  const meetingManager = useMeetingManager();
  const { muted, videoEnabled } = useAttendeeStatus(attendeeId);

  const attendee = roster[attendeeId];
  if (!attendee) return null;

  const localAttendeeId =
    meetingManager.meetingSession?.configuration.credentials?.attendeeId;
  const isLocal = attendeeId === localAttendeeId;

  return (
    <div
      className={cn(
        'min-h-[40px] flex items-center gap-4 justify-between',
        className,
      )}
    >
      <div className="text-sm line-clamp-1 break-all">
        {!simpleUi && (
          <>
            {attendee.externalUserId} {isLocal && '(You)'}
          </>
        )}
      </div>

      <div className="flex items-center gap-1 [&_button]:flex [&_button]:items-center [&_button]:justify-center">
        {!simpleUi && (
          <>
            <div className="text-white w-7 h-7 md:w-8 md:h-8 flex justify-center items-center rounded-full bg-black/30">
              <Microphone muted={muted} className="w-4 h-4 md:w-5 md:h-5" />
            </div>
            <div
              className={cn(
                'text-white w-7 h-7 md:w-8 md:h-8 flex justify-center items-center rounded-full bg-black/30',
              )}
            >
              <Camera
                disabled={!videoEnabled}
                className="w-5 h-5 md:w-6 md:h-6"
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default RosterAttendee;
