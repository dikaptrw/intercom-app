import { useEffect } from 'react';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider,
} from 'react-router-dom';
import { BASE_ROUTES, ROUTES } from '@/utils/constants/routes';
import LoginPage from './pages/login';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route index element={<Navigate to={ROUTES.LOGIN} replace />} />
      <Route path={BASE_ROUTES.LOGIN} element={<LoginPage />} />å
    </>,
  ),
);

function App() {
  useEffect(() => {
    window.history.scrollRestoration = 'manual';
  }, []);

  return <RouterProvider router={router} />;
}

export default App;
