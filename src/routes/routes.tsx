import { createBrowserRouter } from 'react-router-dom';
import { ROUTES } from './paths';
import AppLayout from '../layout/appLayout/AppLayout';
import Home from '../pages/Home';
import About from '../pages/About';
import Contact from '../pages/Contact';
import SignIn from '../pages/signIn/SignIn';
import SignUp from '../pages/signUp/SignUp';
import NotFound from '../pages/NotFound';
import { ProtectedRouter } from './ProtectedRouter';
import ResumeForm from '../pages/resume/Resume';

export const router = createBrowserRouter([
  {
    path: ROUTES.HOME_PATH,
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        element: <ProtectedRouter />,
        children: [
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
  {
    path: '*',
    element: <NotFound />,
  },
  {
    path: ROUTES.RESUME_PATH,
    element: <ResumeForm />,
  },
]);
