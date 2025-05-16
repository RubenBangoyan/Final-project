import { ABOUT, SIGN_IN, SIGN_UP, HOME, NOT_FOUND_PAGE, RESUME } from './paths';
import { Routes, Route } from 'react-router-dom';
import SignUp from '../pages/signUp/SignUp';
import SignIn from '../pages/signIn/SignIn';
import NotFound from '../pages/NotFound';
import About from '../pages/About';
import Home from '../pages/Home';
import ResumeForm from '../pages/resume/Resume';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path={HOME} element={<Home />} />
      <Route path={ABOUT} element={<About />} />
      <Route path={SIGN_IN} element={<SignIn />}></Route>
      <Route path={SIGN_UP} element={<SignUp />}></Route>
      <Route path={NOT_FOUND_PAGE} element={<NotFound />} />
      <Route path={RESUME} element={<ResumeForm />} />
    </Routes>
  );
};

export default AppRoutes;
