import { MoonFilled, SunOutlined } from '@ant-design/icons';
import { NavLink, useNavigate } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';
import { ROUTES } from '../../routes/paths';
import { Button } from 'antd';
import './header.css';
import LanguageSelector from '../../components/SelectLanguage/SelectLanguage';

const Header = () => {
  const navigate = useNavigate();

  const { theme, handleCLick } = useTheme();
  return (
    <header className={`header-${theme}`}>
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
        <div>
          {theme ? (
            <MoonFilled onClick={handleCLick} />
          ) : (
            <SunOutlined onClick={handleCLick} />
          )}
        </div>
        <div>
          <LanguageSelector />
        </div>
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
