import UploadWork from '../pages/uploadWork/UploadWork.tsx';
import NotFound from '../components/notFound/NotFound';
import { createBrowserRouter } from 'react-router-dom';
import AppLayout from '../layout/appLayout/AppLayout';
import { ProtectedRouter } from './ProtectedRouter';
import ResumeForm from '../pages/resume/Resume';
import Contact from '../pages/contact/Contact';
import SignIn from '../pages/signIn/SignIn';
import SignUp from '../pages/signUp/SignUp';
import ProfilePage from '../pages/profilePage/Profile.tsx';
import About from '../pages/About/About.tsx';
import Home from '../pages/home/Home';
import { ROUTES } from './paths';
import Jobs from '../pages/jobs/Jobs.tsx';
import JobDetail from '../pages/jobs/JobDetail.tsx';

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
        path: ROUTES.JOBS_PATH,
        element: <Jobs />,
      },
      {
        path: ROUTES.JOB_DETAIL_PATH,
        element: <JobDetail />,
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
          {
            path: ROUTES.PROFILE_PATH,
            element: <ProfilePage />,
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
        path: ROUTES.RESUME_PATH,
        element: <ResumeForm />,
      },
      {
        path: ROUTES.UPLOAD_WORK,
        element: <UploadWork />,
      },
      {
        path: ROUTES.NOT_FOUND_PATH,
        element: <NotFound />,
      },
    ],
  },
]);
