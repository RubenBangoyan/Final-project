import notFoundImg from '../../images/404-not-found.png';
import { ROUTES } from '../../routes/paths';
import { NavLink } from 'react-router';
import './NotFound.css';

const NotFound = () => {
  return (
    <div className="not-found-container">
      <img src={notFoundImg} alt="404" />
      <NavLink to={ROUTES.SIGN_UP_PATH}>Sign Up</NavLink>
    </div>
  );
};

export default NotFound;
