import { useEffect, useState, useCallback } from 'react';
import { useVideoTileState } from './useVideoTileState';

export interface UsePictureInPictureProps {
  attendeeId?: string;
  onPiPChange?: (isPiP: boolean) => void;
}

export function usePictureInPicture({
  attendeeId,
  onPiPChange,
}: UsePictureInPictureProps) {
  const videoTileState = useVideoTileState({
    attendeeId: attendeeId || '',
  });
  const [isPiP, setIsPiP] = useState(false);

  const togglePiP = useCallback(() => {
    const tileElement = videoTileState?.boundVideoElement;
    if (!tileElement) return;

    try {
      tileElement.removeAttribute('disablePictureInPicture');

      if (
        (tileElement as any).webkitSupportsPresentationMode &&
        typeof (tileElement as any).webkitSetPresentationMode === 'function'
      ) {
        const isInPiP =
          (tileElement as any).webkitPresentationMode === 'picture-in-picture';
        (tileElement as any).webkitSetPresentationMode(
          isInPiP ? 'inline' : 'picture-in-picture',
        );
      } else if (document.pictureInPictureElement) {
        document.exitPictureInPicture();
      } else if (tileElement.requestPictureInPicture) {
        tileElement.requestPictureInPicture().catch((error) => {
          console.error('Failed to enter Picture-in-Picture mode:', error);
        });
      }
    } catch (error) {
      console.error('PiP error:', error);
    }
  }, [videoTileState]);

  useEffect(() => {
    const video = videoTileState?.boundVideoElement;
    if (!video) return;

    const handleEnter = () => {
      onPiPChange?.(true);
      setIsPiP(true);
    };
    const handleLeave = () => {
      onPiPChange?.(false);
      setIsPiP(false);
    };

    video.addEventListener('enterpictureinpicture', handleEnter);
    video.addEventListener('leavepictureinpicture', handleLeave);

    return () => {
      video.removeEventListener('enterpictureinpicture', handleEnter);
      video.removeEventListener('leavepictureinpicture', handleLeave);
    };
  }, [videoTileState?.boundVideoElement]);

  return { isPiP, togglePiP };
}
