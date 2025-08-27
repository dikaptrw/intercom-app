import type { ChatMessage } from '@/utils/types/meeting';
import {
  useMeetingManager,
  useRosterState,
} from 'amazon-chime-sdk-component-library-react';
import type { DataMessage } from 'amazon-chime-sdk-js';
import { createContext, useEffect, useState } from 'react';

interface RoomContextType {
  messages: ChatMessage[];
  sendMessage: (text: string) => void;
  sideMenu?: 'chat' | 'info' | 'participants';
  setSideMenu: React.Dispatch<
    React.SetStateAction<RoomContextType['sideMenu'] | undefined>
  >;
}

export const RoomContext = createContext<RoomContextType | null>(null);

interface RoomProviderProps {
  children?: React.ReactNode;
}

export const RoomProvider = ({ children }: RoomProviderProps) => {
  const [sideMenu, setSideMenu] = useState<RoomContextType['sideMenu']>();
  const [messages, setMessages] = useState<RoomContextType['messages']>([]);
  const meetingManager = useMeetingManager();
  const { roster } = useRosterState();

  useEffect(() => {
    const audioVideo = meetingManager.audioVideo;
    if (!audioVideo) return;

    const handleMessage = (dataMessage: DataMessage) => {
      const text = new TextDecoder().decode(dataMessage.data);
      const senderId = dataMessage.senderAttendeeId;

      console.log({ dataMessage, roster });

      const senderName =
        roster[senderId]?.externalUserId || `User-${senderId.slice(0, 5)}`;

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
    audioVideo.realtimeSendDataMessage('chat', text, 10000);

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

  return (
    <RoomContext.Provider
      value={{
        sideMenu,
        setSideMenu,
        messages,
        sendMessage,
      }}
    >
      {children}
    </RoomContext.Provider>
  );
};
