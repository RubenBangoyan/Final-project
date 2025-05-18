import { NavLink, useNavigate } from 'react-router-dom';
import { ROUTES } from '../../routes/paths';
// import '../components/Header.css';
import { Button } from 'antd';
import './header.css'


const Header = () => {
  const navigate = useNavigate();
  return (
    <header>
      <div className="nav-container">
        <div>Logo</div>
        <nav>
          <ul className="list-container">
            <li>
              <NavLink to={ROUTES.HOME_PATH}>Home</NavLink>
            </li>
            <li>
              <NavLink to={ROUTES.ABOUT_PATH}>About</NavLink>
            </li>
            <li>
              <NavLink to={ROUTES.CONTACT_US_PATH}>Contact Us</NavLink>
            </li>
          </ul>
        </nav>
      </div>
      <div className="auth-buttons">
        <Button type="primary" onClick={() => navigate(ROUTES.SIGN_IN_PATH)}>
          Sign In
        </Button>
        <Button type="default" onClick={() => navigate(ROUTES.SIGN_UP_PATH)}>
          Sign Up
        </Button>
      </div>
    </header>
  );
};

export default Header;
