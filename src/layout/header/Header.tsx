import React from "react";
import { MoonFilled, SunOutlined } from "@ant-design/icons";
import { NavLink, useNavigate } from "react-router-dom";
import { useTheme } from "../../contexts/ThemeContext";
import { ROUTES } from "../../routes/paths";
import { Button, Col, Row, Select } from "antd";
import "./header.css";

import usFlag from "../../images/flags/us.png";
import hyFlag from "../../images/flags/am.png";
import ruFlag from "../../images/flags/ru.png";

const { Option } = Select;

const flags = {
  en: usFlag,
  hy: hyFlag,
  ru: ruFlag,
};

const Header = () => {
  const navigate = useNavigate();
  const { theme, handleClick } = useTheme();
  const [language, setLanguage] = React.useState<"en" | "hy" | "ru">("en");

  React.useEffect(() => {
    const savedLang = localStorage.getItem("appLang") as
      | "en"
      | "hy"
      | "ru"
      | null;
    if (savedLang && flags[savedLang]) {
      setLanguage(savedLang);
    }
  }, []);

  const onLanguageChange = (lang: "en" | "hy" | "ru") => {
    setLanguage(lang);
    localStorage.setItem("appLang", lang);
    // Если используешь i18n: i18n.changeLanguage(lang);
  };

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
              <Select
                className={`language-select language-select-${theme}`}
                value={language}
                onChange={onLanguageChange}
                popupMatchSelectWidth={false}
                optionLabelProp="label"
              >
                <Option
                  value="en"
                  label={
                    <div>
                      <img src={flags.en} alt="English" className="flag-icon" />{" "}
                      English
                    </div>
                  }
                >
                  <div className="option-item">
                    <img src={flags.en} alt="English" className="flag-icon" />
                    English
                  </div>
                </Option>
                <Option
                  value="hy"
                  label={
                    <div>
                      <img
                        src={flags.hy}
                        alt="Armenian"
                        className="flag-icon"
                      />{" "}
                      Հայերեն
                    </div>
                  }
                >
                  <div className="option-item">
                    <img src={flags.hy} alt="Armenian" className="flag-icon" />
                    Հայերեն
                  </div>
                </Option>
                <Option
                  value="ru"
                  label={
                    <div>
                      <img src={flags.ru} alt="Russian" className="flag-icon" />{" "}
                      Русский
                    </div>
                  }
                >
                  <div className="option-item">
                    <img src={flags.ru} alt="Russian" className="flag-icon" />
                    Русский
                  </div>
                </Option>
              </Select>
            </Col>
            <Col>
              {theme === "dark" ? (
                <MoonFilled
                  onClick={handleClick}
                  style={{ fontSize: 18, cursor: "pointer" }}
                />
              ) : (
                <SunOutlined
                  onClick={handleClick}
                  style={{ fontSize: 18, cursor: "pointer" }}
                />
              )}
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
