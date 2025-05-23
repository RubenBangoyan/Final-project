import OfferingWorkFormStep from '../pages/uploadWork/UploadWork.tsx';
import LookingWorkFormStep from '../pages/lookingWorkFormStep/LookingWorkFormStep.tsx';
import NotFound from '../components/notFound/NotFound';
import { createBrowserRouter } from 'react-router-dom';
import AppLayout from '../layout/appLayout/AppLayout';
import { ProtectedRouter } from './ProtectedRouter';
import ResumeForm from '../pages/resume/Resume';
import SignIn from '../pages/signIn/SignIn';
import SignUp from '../pages/signUp/SignUp';
import Contact from '../pages/contact/Contact';
import About from '../pages/About/About.tsx';
import Home from '../pages/home/Home';
import { ROUTES } from './paths';
import UploadWork from '../pages/uploadWork/UploadWork.tsx';

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
  {
    path: ROUTES.UPLOAD_WORK,
    element: <UploadWork />,
  },
]);
