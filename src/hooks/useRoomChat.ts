import { useEffect, useState } from 'react';
import {
  useMeetingManager,
  useRosterState,
} from 'amazon-chime-sdk-component-library-react';
import type { DataMessage } from 'amazon-chime-sdk-js';

type ChatMessage = {
  senderId: string;
  senderName: string;
  text: string;
  timestamp: number;
};

export function useRoomChat() {
  const meetingManager = useMeetingManager();
  const { roster } = useRosterState();
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  useEffect(() => {
    const audioVideo = meetingManager.audioVideo;
    if (!audioVideo) return;

    const handleMessage = (dataMessage: DataMessage) => {
      const text = new TextDecoder().decode(dataMessage.data);
      const senderId = dataMessage.senderAttendeeId;
      const senderName =
        roster[senderId]?.name || `User-${senderId.slice(0, 5)}`;

      setMessages((prev) => [
        ...prev,
        { senderId, senderName, text, timestamp: Date.now() },
      ]);
    };

    audioVideo.realtimeSubscribeToReceiveDataMessage('chat', handleMessage);

    return () => {
      audioVideo.realtimeUnsubscribeFromReceiveDataMessage('chat');
    };
  }, [meetingManager.audioVideo, roster]);

  const sendMessage = (text: string) => {
    const audioVideo = meetingManager.audioVideo;
    if (!audioVideo) return;

    // Send via Chime
    audioVideo.realtimeSendDataMessage('chat', text, 1000);

    // Add local echo (sender’s own message)
    const selfId =
      meetingManager?.meetingSession?.configuration?.credentials?.attendeeId ??
      'me';
    const selfName =
      meetingManager?.meetingSession?.configuration?.credentials
        ?.externalUserId ?? 'You';

    setMessages((prev) => [
      ...prev,
      {
        senderId: selfId,
        senderName: selfName,
        text,
        timestamp: Date.now(),
      },
    ]);
  };

  return { messages, sendMessage };
}
