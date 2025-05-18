import { Button, Layout } from "antd";
import { NavLink, useNavigate } from "react-router-dom";
import {
  ABOUT_PATH,
  CONTACT_US_PATH,
  HOME_PATH,
  SIGN_IN_PATH,
  SIGN_UP_PATH,
} from "../routes/paths";
import { headerStyle } from "./style/AppLayout";
import "../components/style/Header.css";
const Header = () => {
  const { Header } = Layout;
  const navigate = useNavigate();
  return (
    <Header style={headerStyle}>
      <div className="nav-container">
        <div>logo</div>
        <nav>
          <ul className="list-container">
            <li>
              <NavLink to={HOME_PATH}>Home</NavLink>
            </li>
            <li>
              <NavLink to={ABOUT_PATH}>About</NavLink>
            </li>
            <li>
              <NavLink to={CONTACT_US_PATH}>Contact Us</NavLink>
            </li>
          </ul>
        </nav>
      </div>
      <div className="auth-buttons">
        <Button type="primary" onClick={() => navigate(SIGN_IN_PATH)}>
          Sign In
        </Button>
        <Button type="default" onClick={() => navigate(SIGN_UP_PATH)}>
          Sign Up
        </Button>
      </div>
    </Header>
  );
};

export default Header;
