import { useMeetingManager } from 'amazon-chime-sdk-component-library-react';
import { ChevronDown, Info, SwitchCamera } from 'lucide-react';

function RoomHeader() {
  const meetingManager = useMeetingManager();

  const externalMeetingId =
    meetingManager.meetingSessionConfiguration?.externalMeetingId;

  return (
    <div className="h-[var(--room-header-height)] px-5 flex items-center justify-between gap-5 lg:hidden [&_button]:cursor-pointer">
      <button className="flex col-span-3 text-white items-center gap-2">
        <ChevronDown className="w-4 h-4" />
        <div>{externalMeetingId}</div>
      </button>

      <div className="flex items-center gap-5">
        <button className="text-white">
          <Info className="w-5 h-5" />
        </button>
        <button className="text-white">
          <SwitchCamera className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

export default RoomHeader;
