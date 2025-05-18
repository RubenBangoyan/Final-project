import { createBrowserRouter } from "react-router-dom";
import {
  ABOUT_PATH,
  CONTACT_US_PATH,
  HOME_PATH,
  SIGN_IN_PATH,
  SIGN_UP_PATH,
} from "./paths";
import AppLayout from "../components/AppLayout";
import Home from "../pages/Home";
import About from "../pages/About";
import Contact from "../pages/Contact";
import SignIn from "../pages/signIn/SignIn";
import SignUp from "../pages/signUp/SignUp";

export const router = createBrowserRouter([
  {
    path: HOME_PATH,
    element: <AppLayout />,
    children: [
      {
        path: HOME_PATH,
        element: <Home />,
      },
      {
        path: ABOUT_PATH,
        element: <About />,
      },
      {
        path: CONTACT_US_PATH,
        element: <Contact />,
      },
    ],
  },
  {
    path: SIGN_IN_PATH,
    element: <SignIn />,
  },
  {
    path: SIGN_UP_PATH,
    element: <SignUp />,
  },
]);
