import RoomFooter from './room-footer';
import RoomHeader from './room-header';
import RoomSideMenu from './room-side-menu';
import VideoGrid from './video-grid';

function RoomPage() {
  return (
    <div className="bg-room-background">
      <RoomHeader />
      <div className="h-[calc(100dvh-var(--room-footer-height)-var(--room-header-height))] w-full flex">
        <VideoGrid className="flex-1" />

        <RoomSideMenu />
      </div>
      <RoomFooter />
    </div>
  );
}

export default RoomPage;
