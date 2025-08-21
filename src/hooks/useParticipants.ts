import { useEffect, useState } from 'react';
import {
  useMeetingManager,
  useRosterState,
} from 'amazon-chime-sdk-component-library-react';
import type { VideoTileState } from 'amazon-chime-sdk-js';
import type { Participant } from '@/utils/constants/meeting';

export function useParticipants() {
  const { roster } = useRosterState();
  const meetingManager = useMeetingManager();
  const [participants, setParticipants] = useState<Participant[]>([]);

  useEffect(() => {
    if (!meetingManager.audioVideo) return;
    const audioVideo = meetingManager.audioVideo;

    const localAttendeeId =
      meetingManager.meetingSession?.configuration.credentials?.attendeeId;

    const updateParticipants = () => {
      const currentTiles = audioVideo.getAllVideoTiles();

      // Map tileId → state
      const tileMap: Record<number, VideoTileState> = {};
      currentTiles.forEach((tile) => {
        const state = tile.state();
        const tileId = state.tileId || 0;
        tileMap[tileId] = state;
      });

      const list: Participant[] = Object.entries(roster).map(
        ([attendeeId, info]) => {
          const isLocal = attendeeId === localAttendeeId;

          // 🔹 Skip binding tileState for local user
          let tileState: VideoTileState | null = null;
          let tileId: number | null = null;

          if (!isLocal) {
            const remoteTileState = Object.values(tileMap).find(
              (t) => t.boundAttendeeId === attendeeId,
            );
            tileState = remoteTileState ?? null;
            tileId = remoteTileState?.tileId ?? null;
          }

          return {
            attendeeId,
            name: info?.externalUserId || 'Anonymous',
            isLocal,
            tileId,
            tileState,
          };
        },
      );

      setParticipants(list);
    };

    // Subscribe to video tile updates
    const handleTileUpdate = () => updateParticipants();
    audioVideo.addObserver({
      videoTileDidUpdate: handleTileUpdate,
      videoTileWasRemoved: handleTileUpdate,
    });

    // Initial population
    updateParticipants();

    return () => {
      audioVideo.removeObserver({
        videoTileDidUpdate: handleTileUpdate,
        videoTileWasRemoved: handleTileUpdate,
      });
    };
  }, [meetingManager, roster]);

  return participants;
}
