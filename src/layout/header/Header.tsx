import { MoonFilled, SunOutlined } from "@ant-design/icons";
import { NavLink, useNavigate } from "react-router-dom";
import { useTheme } from "../../contexts/ThemeContext";
import { useAuth } from "../../contexts/AuthContext";
import { ROUTES } from "../../routes/paths";
import { Button, Modal } from "antd"; // <-- Import Modal
import "./header.css";
import LanguageSelector from "../../components/SelectLanguage/SelectLanguage";

const Header = () => {
  const navigate = useNavigate();
  const { theme, handleCLick } = useTheme();
  const { isAuth, logout } = useAuth();

  const handleLogout = () => {
    Modal.confirm({
      title: "Confirm Logout",
      content: "Are you sure you want to log out?",
      okText: "Yes",
      cancelText: "No",
      onOk: logout,
      okButtonProps: {
        danger: true,
      },
    });
  };

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

        <div onClick={handleCLick} className="theme-toggle-icon">
          {theme === "light" ? <MoonFilled /> : <SunOutlined />}
        </div>

        <div>
          <LanguageSelector />
        </div>
      </div>

      <div className="auth-buttons">
        {isAuth ? (
          <>
            <Button
              type="default"
              onClick={() => navigate(ROUTES.RESUME_PATH)}
            >
              Profile / Resume
            </Button>
            <Button
              type="primary"
              danger
              onClick={handleLogout} // <-- Use handler here
            >
              Logout
            </Button>
          </>
        ) : (
          <>
            <Button
              type="primary"
              onClick={() => navigate(ROUTES.SIGN_IN_PATH)}
            >
              Login
            </Button>
            <Button
              type="default"
              onClick={() => navigate(ROUTES.SIGN_UP_PATH)}
            >
              Sign Up
            </Button>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
