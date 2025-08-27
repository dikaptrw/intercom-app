import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerTitle,
} from '@/components/ui/drawer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToggleCameraMode } from '@/hooks/useToggleCameraMode';
import {
  useAttendeeStatus,
  useMeetingManager,
} from 'amazon-chime-sdk-component-library-react';
import { ChevronDown, Info, SwitchCamera } from 'lucide-react';
import RoomChat from './room-chat';
import { useDevice } from '@/hooks/useDevice';
import { useRoom } from '@/hooks/useRoom';

function RoomHeader() {
  const meetingManager = useMeetingManager();
  const { isLg } = useDevice();
  const { sideMenu, setSideMenu } = useRoom();
  const { toggleCameraMode, isCanToggleCameraMode } = useToggleCameraMode();

  const externalMeetingId =
    meetingManager.meetingSessionConfiguration?.externalMeetingId;
  const localAttendeeId =
    meetingManager.meetingSession?.configuration.credentials?.attendeeId;
  const { videoEnabled } = useAttendeeStatus(localAttendeeId || '');

  return (
    <>
      <Drawer open={!!sideMenu && isLg} onClose={() => setSideMenu(undefined)}>
        <DrawerContent className="min-h-[97dvh] h-full">
          <DrawerTitle className="sr-only">Room Menu</DrawerTitle>
          <DrawerDescription className="sr-only">Room Menu</DrawerDescription>

          <Tabs
            defaultValue="messages"
            className="w-full h-full mt-4 flex flex-col max-w-[700px] mx-auto"
          >
            <div className="px-4">
              <TabsList className="w-full">
                <TabsTrigger value="messages">Messages</TabsTrigger>
                <TabsTrigger value="participants">Participants</TabsTrigger>
                <TabsTrigger value="info">Info</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="messages" className="flex flex-col flex-1">
              <RoomChat className="mt-2" />
            </TabsContent>
            <TabsContent value="participants">
              <div className="px-4">Participants content</div>
            </TabsContent>
            <TabsContent value="info">
              <div className="px-4">Meeting details content</div>
            </TabsContent>
          </Tabs>
        </DrawerContent>
      </Drawer>

      <div className="h-[var(--room-header-height)] px-5 flex items-center justify-between gap-5 lg:hidden [&_button]:cursor-pointer">
        <button
          onClick={() => setSideMenu('chat')}
          className="flex col-span-3 text-white items-center gap-2"
        >
          <ChevronDown className="w-4 h-4" />
          <div className="font-medium text-lg">{externalMeetingId}</div>
        </button>

        <div className="flex items-center gap-5">
          <button className="text-white">
            <Info className="w-5 h-5" />
          </button>
          {videoEnabled && isCanToggleCameraMode && (
            <button onClick={toggleCameraMode} className="text-white">
              <SwitchCamera className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    </>
  );
}

export default RoomHeader;
