import {
  Camera,
  ControlBarButton,
  Dialer,
  Microphone,
  Phone,
  Sound,
  ControlBar as ControlBarChime,
  Laptop,
  useLocalVideo,
  useLocalAudioOutput,
} from 'amazon-chime-sdk-component-library-react';
import type { ControlBarButtonProps } from 'amazon-chime-sdk-component-library-react/lib/components/ui/ControlBar/ControlBarButton';

function ControlBar() {
  const { isVideoEnabled, toggleVideo } = useLocalVideo();
  const { isAudioOn, toggleAudio } = useLocalAudioOutput();

  const microphoneButtonProps: ControlBarButtonProps = {
    icon: !isAudioOn ? <Microphone muted /> : <Microphone />,
    onClick: () => toggleAudio(),
    label: 'Mute',
  };

  const cameraButtonProps: ControlBarButtonProps = {
    icon: isVideoEnabled ? <Camera /> : <Camera disabled />,
    popOver: [
      {
        onClick: () => console.log('camera popover option 1'),
        children: <span>Some option text</span>,
      },
      {
        onClick: () => console.log('camera popover option 2'),
        children: <span>More option text</span>,
      },
    ],
    onClick: async () => await toggleVideo(),
    label: 'Camera',
  };

  const dialButtonProps: ControlBarButtonProps = {
    icon: <Dialer />,
    onClick: () => console.log('Toggle dial pad'),
    label: 'Dial',
  };

  const hangUpButtonProps: ControlBarButtonProps = {
    icon: <Phone />,
    onClick: () => console.log('End meeting'),
    label: 'End',
  };

  const volumeButtonProps: ControlBarButtonProps = {
    icon: <Sound />,
    onClick: () => console.log('Volume button clicked'),
    popOver: [
      {
        onClick: () => console.log('volume popover option 1'),
        children: <span>Some option text</span>,
      },
      {
        onClick: () => console.log('volume popover option 2'),
        children: <span>More option text</span>,
      },
    ],
    label: 'Volume',
  };

  const laptopButtonProps: ControlBarButtonProps = {
    icon: <Laptop />,
    onClick: () => console.log('Screen button clicked'),
    label: 'Screen',
  };

  return (
    <ControlBarChime showLabels layout="bottom">
      <ControlBarButton {...microphoneButtonProps} />
      <ControlBarButton {...volumeButtonProps} />
      <ControlBarButton {...cameraButtonProps} />
      <ControlBarButton {...dialButtonProps} />
      <ControlBarButton {...laptopButtonProps} />
      <ControlBarButton {...hangUpButtonProps} />
    </ControlBarChime>
  );
}

export default ControlBar;
