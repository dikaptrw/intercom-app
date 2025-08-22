import ControlBar from './control-bar';
import RoomHeader from './room-header';
import VideoGrid from './video-grid';

function RoomPage() {
  return (
    <div className="bg-room-background">
      <RoomHeader />
      <VideoGrid />
      <ControlBar />
    </div>
  );
}

export default RoomPage;
