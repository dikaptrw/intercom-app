import { useEffect } from 'react';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider,
} from 'react-router-dom';
import { BASE_ROUTES, ROUTES } from '@/utils/constants/routes';
import LoginPage from './pages/join';
import MeetingPage from './pages/meeting';
import { ThemeProvider } from 'styled-components';
import {
  lightTheme,
  MeetingProvider,
} from 'amazon-chime-sdk-component-library-react';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route index element={<Navigate to={ROUTES.JOIN} replace />} />
      <Route path={BASE_ROUTES.JOIN} element={<LoginPage />} />å
      <Route path={BASE_ROUTES.MEETING} element={<MeetingPage />} />å
    </>,
  ),
);

function App() {
  useEffect(() => {
    window.history.scrollRestoration = 'manual';
  }, []);

  return (
    <ThemeProvider theme={lightTheme}>
      <MeetingProvider>
        <RouterProvider router={router} />
      </MeetingProvider>
    </ThemeProvider>
  );
}

export default App;
