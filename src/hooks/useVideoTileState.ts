import { useAudioVideo } from 'amazon-chime-sdk-component-library-react';
import type { AudioVideoObserver, VideoTileState } from 'amazon-chime-sdk-js';
import { useEffect, useState } from 'react';

export interface UseVideoTileStateProps {
  attendeeId: string;
  observer?: {
    videoTileDidUpdate?: AudioVideoObserver['videoTileDidUpdate'];
    videoTileWasRemoved?: AudioVideoObserver['videoTileWasRemoved'];
  };
}

export function useVideoTileState({
  attendeeId,
  observer: observerProps,
}: UseVideoTileStateProps): VideoTileState | undefined {
  const audioVideo = useAudioVideo();
  const [tile, setTile] = useState<VideoTileState>();

  useEffect(() => {
    if (!audioVideo || !attendeeId) return;

    const observer: AudioVideoObserver = {
      videoTileDidUpdate: (tileState: VideoTileState) => {
        if (tileState.boundAttendeeId === attendeeId) {
          setTile(tileState);
          observerProps?.videoTileDidUpdate?.(tileState);
        }
      },
      videoTileWasRemoved: (tileId: number) => {
        if (tile?.tileId === tileId) {
          setTile(undefined);
          observerProps?.videoTileWasRemoved?.(tileId);
        }
      },
    };

    audioVideo.addObserver(observer);
    return () => {
      audioVideo.removeObserver(observer);
    };
  }, [audioVideo, attendeeId, tile?.tileId]);

  return tile;
}
