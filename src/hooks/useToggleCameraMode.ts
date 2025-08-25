import {
  useLocalVideo,
  useMeetingManager,
  useVideoInputs,
} from 'amazon-chime-sdk-component-library-react';

export function useToggleCameraMode() {
  const { devices, selectedDevice } = useVideoInputs();
  const { isVideoEnabled } = useLocalVideo();
  const meetingManager = useMeetingManager();

  const toggleCameraMode = async () => {
    // Ensure at least two cameras are available
    if (devices.length < 2) return;

    // Find the "other" camera (front/back)
    const next =
      devices.find((d) => d.deviceId !== selectedDevice) ?? devices[0];

    try {
      if (isVideoEnabled) {
        await meetingManager.startVideoInputDevice(next.deviceId);
      } else {
        meetingManager.selectVideoInputDevice(next.deviceId);
      }
    } catch (err) {
      console.error('Error toggling camera', err);
    }
  };

  return { toggleCameraMode };
}
