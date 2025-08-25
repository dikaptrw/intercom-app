import RoomFooter from './room-footer';
import RoomHeader from './room-header';
import VideoGrid from './video-grid';

function RoomPage() {
  return (
    <div className="bg-room-background">
      <RoomHeader />
      <VideoGrid />
      <RoomFooter />
    </div>
  );
}

export default RoomPage;
