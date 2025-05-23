import UploadWork from "../pages/uploadWork/UploadWork.tsx";
import NotFound from "../components/notFound/NotFound";
import { createBrowserRouter } from "react-router-dom";
import AppLayout from "../layout/appLayout/AppLayout";
import { ProtectedRouter } from "./ProtectedRouter";
import ResumeForm from "../pages/resume/Resume";
import Contact from "../pages/contact/Contact";
import SignIn from "../pages/signIn/SignIn";
import About from "../pages/About/About.tsx";
import SignUp from "../pages/signUp/SignUp";
import Home from "../pages/home/Home";
import { ROUTES } from "./paths";

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
    path: ROUTES.NOT_FOUND_PATH,
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
