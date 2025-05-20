import { MoonFilled, SunOutlined } from "@ant-design/icons";
import { NavLink, useNavigate } from "react-router-dom";
import { useTheme } from "../../contexts/ThemeContext";
import { ROUTES } from "../../routes/paths";
import { Button, Col, Row } from "antd";
import "./header.css";
import LanguageSelector from "../../components/SelectLanguage/SelectLanguage";

const Header = () => {
  const navigate = useNavigate();
  const { theme, handleCLick } = useTheme();

  return (
    <header className={`header-${theme}`}>
      <Row justify="space-between" align="middle" wrap={false}>
        <Col flex="auto">
          <Row align="middle" gutter={32} wrap={false}>
            <Col>
              <div className="logo" onClick={() => navigate(ROUTES.HOME_PATH)}>
                Logo
              </div>
            </Col>
            <Col>
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
            </Col>
            <Col>
              {theme ? (
                <MoonFilled
                  onClick={handleCLick}
                  style={{ fontSize: 18, cursor: "pointer" }}
                />
              ) : (
                <SunOutlined
                  onClick={handleCLick}
                  style={{ fontSize: 18, cursor: "pointer" }}
                />
              )}
            </Col>
            <Col>
              <LanguageSelector />
            </Col>
          </Row>
        </Col>

        <Col>
          <Row gutter={12} wrap={false}>
            <Col>
              <Button
                type="primary"
                onClick={() => navigate(ROUTES.SIGN_IN_PATH)}
              >
                Sign In
              </Button>
            </Col>
            <Col>
              <Button
                type="default"
                onClick={() => navigate(ROUTES.SIGN_UP_PATH)}
              >
                Sign Up
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </header>
  );
};
export default Header;
