import {
  GlobalStyles,
  MeetingStatus,
  useAudioVideo,
  useMeetingManager,
  useMeetingStatus,
  useVideoInputs,
  VideoTileGrid,
} from 'amazon-chime-sdk-component-library-react';
import ControlBar from './control-bar';
import { useEffect, useState } from 'react';
import { MeetingSessionConfiguration } from 'amazon-chime-sdk-js';
import { AWS_CHIME_API } from '@/utils/constants/api';
import { useNavigate, useParams } from 'react-router-dom';
import { ROUTES } from '@/utils/constants/routes';
import { toast } from 'sonner';
import { Loader } from 'lucide-react';
import VideoGrid from './video-grid';

function MeetingRoomPage() {
  const { meetingId } = useParams();
  const navigate = useNavigate();
  const status = useMeetingStatus();
  const meetingManager = useMeetingManager();
  const audioVideo = useAudioVideo();
  const { devices, selectedDevice } = useVideoInputs();
  const [videoType, setVideoType] = useState<'custom' | 'video-tile-grid'>(
    'custom',
  );

  console.log({ devices, selectedDevice, audioVideo });

  useEffect(() => {
    const joinMeeting = async () => {
      const attendeeName: string = JSON.parse(
        localStorage.getItem('chimeMeeting') || '{}',
      )?.attendeeName;

      if (!meetingId || !attendeeName) {
        toast.error(
          'Meeting ID and Attendee Name are required to join a meeting',
        );
        navigate(ROUTES.JOIN);
        return;
      }

      const resJoinMeeting = await fetch(AWS_CHIME_API.meeting.join, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          meetingId: meetingId,
          attendeeName,
        }),
      });

      if (resJoinMeeting.status === 400) {
        toast.error(`Error joining meeting, please try rejoining the meeting.`);
        navigate(ROUTES.JOIN);
        return;
      }

      const jsonJoinMeeting = await resJoinMeeting.json();

      const configuration = new MeetingSessionConfiguration(
        jsonJoinMeeting.meeting,
        jsonJoinMeeting.attendee,
      );

      // Pass JoinInfo to Chime meetingManager
      await meetingManager.join(configuration);

      // Start session (needed to actually connect media)
      await meetingManager.start();
    };
    joinMeeting();
  }, [meetingId, meetingManager, navigate]);

  console.log({ status });

  useEffect(() => {
    document.body.classList.add('bg-[#1b1c20]');
  }, []);

  if (status !== MeetingStatus.Succeeded) {
    return (
      <div className="text-white h-screen flex items-center justify-center">
        <Loader className="animate-spin" />
        <span className="ml-2">Loading meeting...</span>
      </div>
    );
  }

  return (
    <div className="bg-[#1b1c20]">
      <GlobalStyles />

      <button
        className="cursor-pointer absolute top-8 right-8 z-[50] bg-gray-800 px-3 py-2 text-sm rounded flex items-center"
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

export default MeetingRoomPage;
