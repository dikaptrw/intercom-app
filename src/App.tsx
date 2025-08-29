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
import JoinPage from './pages/join';
import RoomPage from './pages/room';
import { ThemeProvider } from 'styled-components';
import {
  darkTheme,
  MeetingProvider,
} from 'amazon-chime-sdk-component-library-react';
import RoomGuard from './guards/RoomGuard';
import MainLayout from './layouts/MainLayout';
import { MAIN_ROUTES } from './utils/functions/routes';
import UnitsPage from './pages/units';
import QueryClientProvider from './providers/QueryProvider';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route index element={<Navigate to={ROUTES.UNITS} replace />} />

      <Route
        element={
          <MainLayout>
            <Outlet />
          </MainLayout>
        }
      >
        <Route path={BASE_ROUTES.JOIN} element={<JoinPage />} />
        <Route path={BASE_ROUTES.UNITS} element={<UnitsPage />} />

        <Route
          path={BASE_ROUTES.MEETING_ROOM}
          element={
            <RoomGuard>
              <RoomPage />
            </RoomGuard>
          }
        />
      </Route>

      <Route path="*" element={<Navigate to={MAIN_ROUTES.ROOT} />} />
    </>,
  ),
);

function App() {
  useEffect(() => {
    window.history.scrollRestoration = 'manual';
  }, []);

  return (
    <QueryClientProvider>
      <ThemeProvider theme={darkTheme}>
        <MeetingProvider>
          <RouterProvider router={router} />
        </MeetingProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
