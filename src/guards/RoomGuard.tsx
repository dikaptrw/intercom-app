import { ROUTES } from '@/utils/constants/routes';
import {
  MeetingStatus,
  useMeetingStatus,
} from 'amazon-chime-sdk-component-library-react';
import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { Fragment } from 'react/jsx-runtime';

function RoomGuard({ children }: { children: ReactNode }) {
  const status = useMeetingStatus();

  if (status === MeetingStatus.Failed) {
    return <Navigate to={ROUTES.JOIN} />;
  }

  return <Fragment>{children}</Fragment>;
}

export default RoomGuard;
