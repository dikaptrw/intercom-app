import {
  GlobalStyles,
  useAudioVideo,
  useVideoInputs,
  VideoTileGrid,
} from 'amazon-chime-sdk-component-library-react';
import ControlBar from './control-bar';
import { useState } from 'react';
import VideoGrid from './video-grid';

function RoomPage() {
  const audioVideo = useAudioVideo();
  const { devices, selectedDevice } = useVideoInputs();
  const [videoType, setVideoType] = useState<'custom' | 'video-tile-grid'>(
    'custom',
  );

  console.log({ devices, selectedDevice, audioVideo });

  return (
    <div className="bg-room-primary">
      <GlobalStyles />

      <div className="absolute top-8 right-8 z-[50] flex items-center gap-4">
        <div className="text-white">
          Current View:{' '}
          <span className="ml-1 font-semibold">
            {videoType === 'custom' ? 'Custom View' : 'Video Tile Grid'}
          </span>
        </div>
        <button
          className="cursor-pointer bg-gray-800 px-3 py-2 text-sm rounded flex items-center"
          onClick={() =>
            setVideoType(videoType === 'custom' ? 'video-tile-grid' : 'custom')
          }
        >
          <span className="text-white">
            {videoType === 'custom'
              ? 'Switch to Video Tile Grid'
              : 'Switch to Custom View'}
          </span>
        </button>
      </div>

      {videoType === 'custom' && <VideoGrid />}

      {videoType === 'video-tile-grid' && (
        <div className="h-[calc(100vh-80px)] !p-4 !border-b !border-white/5">
          <VideoTileGrid />
        </div>
      )}

      <ControlBar />
    </div>
  );
}

export default RoomPage;
