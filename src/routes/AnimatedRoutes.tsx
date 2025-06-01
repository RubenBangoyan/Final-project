import { useLocation, useRoutes } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { startProgress, stopProgress } from "../utils/routerProgress";
import { ROUTES } from "./paths";

import Home from "../pages/home/Home";
import About from "../pages/About/About";
import Contact from "../pages/contact/Contact";
import SignIn from "../pages/signIn/SignIn";
import SignUp from "../pages/signUp/SignUp";
import ProfilePage from "../pages/profile/Profile";
import Jobs from "../pages/jobs/Jobs";
import JobDetail from "../pages/jobs/JobDetail";
import JobApplicant from "../pages/jobs/JobApplicant";
import ResumeForm from "../pages/resume/Resume";
import UploadWork from "../pages/uploadWork/UploadWork";
import NotFound from "../components/notFound/NotFound";
import { ProtectedRouter } from "./ProtectedRouter";

const routeElements = [
    { path: ROUTES.HOME_PATH, element: <Home /> },
    { path: ROUTES.SIGN_IN_PATH, element: <SignIn /> },
    { path: ROUTES.SIGN_UP_PATH, element: <SignUp /> },
    { path: ROUTES.RESUME_PATH, element: <ResumeForm /> },
    { path: ROUTES.UPLOAD_WORK, element: <UploadWork /> },
    {
        element: <ProtectedRouter />,
        children: [
            { path: ROUTES.ABOUT_PATH, element: <About /> },
            { path: ROUTES.CONTACT_US_PATH, element: <Contact /> },
            { path: ROUTES.PROFILE_PATH, element: <ProfilePage /> },
            { path: ROUTES.JOBS_PATH, element: <Jobs /> },
            { path: ROUTES.JOB_DETAIL_PATH, element: <JobDetail /> },
            { path: ROUTES.JOB_APPLICANTS, element: <JobApplicant /> },
        ],
    },
    { path: "*", element: <NotFound /> },
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
                transition={{ duration: 0.4, ease: "easeOut" }}
                style={{ position: "relative", width: "100%" }}
            >
                {routes}
            </motion.div>
        </AnimatePresence>
    );
};

export default AnimatedRoutes;
