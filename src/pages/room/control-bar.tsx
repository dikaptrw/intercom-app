import { useClock } from '@/hooks/useClock';
import { cn } from '@/utils/functions';
import {
  useAttendeeStatus,
  useLocalVideo,
  useMeetingManager,
  useToggleLocalMute,
} from 'amazon-chime-sdk-component-library-react';
import {
  Info,
  MessagesSquare,
  Mic,
  MicOff,
  MonitorUp,
  Phone,
  UsersRound,
  Video,
  VideoOff,
  Volume2,
} from 'lucide-react';

function ControlBar() {
  const meetingManager = useMeetingManager();
  const time24 = useClock({ format: 24 });
  const { toggleVideo } = useLocalVideo();
  const { muted, toggleMute } = useToggleLocalMute();

  const localAttendeeId =
    meetingManager.meetingSession?.configuration.credentials?.attendeeId;

  const { videoEnabled } = useAttendeeStatus(localAttendeeId || '');

  const externalMeetingId =
    meetingManager.meetingSessionConfiguration?.externalMeetingId;

  const mainControlItems = [
    {
      icon: <Volume2 />,
      onClick: () => console.log('Volume button clicked'),
      label: 'Audio',
    },
    {
      icon: muted ? <MicOff /> : <Mic />,
      onClick: () => toggleMute(),
      label: 'Mute',
    },
    {
      icon: videoEnabled ? <Video /> : <VideoOff />,
      popOverPlacement: 'bottom-start',
      onClick: async () => await toggleVideo(),
      label: 'Camera',
    },
    {
      icon: <MonitorUp />,
      onClick: () => console.log('Volume button clicked'),
      label: 'Share Screen',
    },
    {
      icon: <Phone className="rotate-[135deg]" />,
      onClick: () => console.log('End meeting'),
      label: 'End',
      type: 'destructive',
    },
  ];

  const rightSideControlItems = [
    {
      icon: <MessagesSquare />,
      onClick: () => console.log('End meeting'),
      label: 'End',
    },
    {
      icon: <UsersRound />,
      onClick: () => console.log('End meeting'),
      label: 'End',
    },
    {
      icon: <Info />,
      onClick: () => console.log('End meeting'),
      label: 'End',
    },
  ];

  return (
    <div className="h-[var(--room-control-height)] px-5 grid grid-cols-12 items-center">
      <div className="col-span-3 text-white flex items-center gap-4">
        <div>{time24}</div>
        <div className="h-6 w-[1px] bg-white/20 ml-1"></div>
        <div>{externalMeetingId}</div>
      </div>

      <div
        className={cn(
          'col-span-6 flex justify-center items-center gap-2 text-white text-xs rounded-lg',
        )}
      >
        {mainControlItems.map((item, index) => {
          return (
            <div
              className="flex flex-col items-center justify-center gap-1"
              key={index}
            >
              <button
                className={cn(
                  'cursor-pointer py-3 px-4 rounded-full flex justify-center items-center bg-[#323537] hover:bg-[#494c4e] transition-colors duration-300',
                  '[&>svg]:w-6 [&>svg]:h-6 [&>svg]:scale-90',
                  item.type === 'destructive'
                    ? 'bg-[#DA352F] hover:bg-[#ea4e48]'
                    : '',
                )}
                onClick={item.onClick}
              >
                {item.icon}
              </button>
            </div>
          );
        })}
      </div>

      <div className="col-span-3 flex justify-end">
        {rightSideControlItems.map((item, index) => {
          return (
            <div
              className="flex flex-col items-center justify-center gap-1"
              key={index}
            >
              <button
                className={cn(
                  'text-white cursor-pointer w-12 h-12 rounded-full flex justify-center items-center hover:bg-white/10 transition-colors duration-300',
                  '[&>svg]:w-6 [&>svg]:h-6 [&>svg]:scale-90',
                )}
                onClick={item.onClick}
              >
                {item.icon}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ControlBar;
