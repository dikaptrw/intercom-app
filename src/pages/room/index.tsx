import ControlBar from './control-bar';
import VideoGrid from './video-grid';

function RoomPage() {
  return (
    <div className="bg-room-background">
      <VideoGrid />
      <ControlBar />
    </div>
  );
}

export default RoomPage;
