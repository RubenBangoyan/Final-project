import { createBrowserRouter } from 'react-router-dom';
import AppLayout from '../layout/appLayout/AppLayout';
import SignUp from '../pages/signUp/SignUp';
import SignIn from '../pages/signIn/SignIn';
import Contact from '../pages/Contact';
import About from '../pages/About';
import Home from '../pages/Home';
import { ROUTES } from './paths';

export const router = createBrowserRouter([
  {
    path: ROUTES.HOME_PATH,
    element: <AppLayout />,
    children: [
      {
        path: ROUTES.HOME_PATH,
        element: <Home />,
      },
      {
        path: ROUTES.ABOUT_PATH,
        element: <About />,
      },
      {
        path: ROUTES.CONTACT_US_PATH,
        element: <Contact />,
      },
    ],
  },
  {
    path: ROUTES.SIGN_IN_PATH,
    element: <SignIn />,
  },
  {
    path: ROUTES.SIGN_UP_PATH,
    element: <SignUp />,
  },
]);
