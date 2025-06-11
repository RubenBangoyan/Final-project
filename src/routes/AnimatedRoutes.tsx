import { startProgress, stopProgress } from '../utils/routerProgress';
import JobApplicant from '../pages/jobs/jobApplicant/JobApplicant';
import { useLocation, useRoutes } from 'react-router-dom';
import JobDetail from '../pages/jobs/jobdetail/JobDetail';
import UploadWork from '../pages/uploadWork/UploadWork';
import { AnimatePresence, motion } from 'framer-motion';
import NotFound from '../components/notFound/NotFound';
import { ProtectedRouter } from './ProtectedRouter';
import { useEffect, useRef, useState } from 'react';
import ProfilePage from '../pages/profile/Profile';
import ResumeForm from '../pages/resume/Resume';
import Contact from '../pages/contact/Contact';
import SignIn from '../pages/signIn/SignIn';
import SignUp from '../pages/signUp/SignUp';
import TeamPage from '../pages/team/Team';
import About from '../pages/About/About';
import Home from '../pages/home/Home';
import Jobs from '../pages/jobs/Jobs';
import { ROUTES } from './paths';

const routeElements = [
  { path: ROUTES.HOME_PATH, element: <Home /> },
  { path: ROUTES.SIGN_IN_PATH, element: <SignIn /> },
  { path: ROUTES.SIGN_UP_PATH, element: <SignUp /> },
  { path: ROUTES.RESUME_PATH, element: <ResumeForm /> },
  { path: ROUTES.UPLOAD_WORK, element: <UploadWork /> },
  { path: ROUTES.TEAM, element: <TeamPage /> },
  { path: ROUTES.ABOUT_PATH, element: <About /> },
  {
    element: <ProtectedRouter />,
    children: [
      { path: ROUTES.CONTACT_US_PATH, element: <Contact /> },
      { path: ROUTES.PROFILE_PATH, element: <ProfilePage /> },
      { path: ROUTES.JOBS_PATH, element: <Jobs /> },
      { path: ROUTES.JOB_DETAIL_PATH, element: <JobDetail /> },
      { path: ROUTES.JOB_APPLICANTS, element: <JobApplicant /> },
    ],
  },
  { path: '*', element: <NotFound /> },
];

const AnimatedRoutes = () => {
  const location = useLocation();
  const routes = useRoutes(routeElements);
  const prevPath = useRef(location.pathname);
  const [firstLoad, setFirstLoad] = useState(true);

  useEffect(() => {
    if (location.pathname !== prevPath.current) {
      startProgress();
      const timeout = setTimeout(() => {
        stopProgress();
        setFirstLoad(false);
      }, 400);
      prevPath.current = location.pathname;
      return () => clearTimeout(timeout);
    }
  }, [location.pathname]);

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={location.pathname}
        initial={firstLoad ? false : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={firstLoad ? undefined : { opacity: 0, y: -20 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        style={{ position: 'relative', width: '100%' }}
      >
        {routes}
      </motion.div>
    </AnimatePresence>
  );
};

export default AnimatedRoutes;
