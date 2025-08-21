import { AWS_CHIME_API } from '@/utils/constants/api';
import { ROUTES } from '@/utils/constants/routes';
import {
  MeetingStatus,
  useMeetingManager,
  useMeetingStatus,
} from 'amazon-chime-sdk-component-library-react';
import { MeetingSessionConfiguration } from 'amazon-chime-sdk-js';
import { Loader } from 'lucide-react';
import { useEffect, type ReactNode } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { Fragment } from 'react/jsx-runtime';
import { toast } from 'sonner';

function RoomGuard({ children }: { children: ReactNode }) {
  const status = useMeetingStatus();
  const { meetingId } = useParams();
  const meetingManager = useMeetingManager();
  const navigate = useNavigate();

  useEffect(() => {
    document.body.classList.add('!bg-room-primary');
    document.documentElement.classList.add('!bg-room-primary');
  }, []);

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
        toast.error(
          `The meeting room you are trying to access does not exist or has already ended.`,
        );
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

  if (status === MeetingStatus.Failed) {
    toast.error(
      'Failed to join the meeting. Please check your network connection and try again.',
    );
    return <Navigate to={ROUTES.JOIN} />;
  }

  if (status !== MeetingStatus.Succeeded) {
    return (
      <div className="text-white h-screen flex items-center justify-center">
        <Loader className="animate-spin" />
        <span className="ml-2">Loading meeting...</span>
      </div>
    );
  }

  return <Fragment>{children}</Fragment>;
}

export default RoomGuard;
