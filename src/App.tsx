import { useEffect } from 'react';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Outlet,
  Route,
  RouterProvider,
} from 'react-router-dom';
import { BASE_ROUTES, ROUTES } from '@/utils/constants/routes';
import LoginPage from './pages/join';
import MeetingRoomPage from './pages/meeting-room';
import { ThemeProvider } from 'styled-components';
import {
  darkTheme,
  MeetingProvider,
} from 'amazon-chime-sdk-component-library-react';
import RoomGuard from './guards/RoomGuard';
import MainLayout from './layouts/MainLayout';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route index element={<Navigate to={ROUTES.JOIN} replace />} />

      <Route
        element={
          <MainLayout>
            <Outlet />
          </MainLayout>
        }
      >
        <Route path={BASE_ROUTES.JOIN} element={<LoginPage />} />

        <Route
          path={BASE_ROUTES.MEETING_ROOM}
          element={
            <RoomGuard>
              <MeetingRoomPage />
            </RoomGuard>
          }
        />
      </Route>
    </>,
  ),
);

function App() {
  useEffect(() => {
    window.history.scrollRestoration = 'manual';
  }, []);

  return (
    <ThemeProvider theme={darkTheme}>
      <MeetingProvider>
        <RouterProvider router={router} />
      </MeetingProvider>
    </ThemeProvider>
  );
}

export default App;
