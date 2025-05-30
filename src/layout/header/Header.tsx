import { LANGUAGE_STORAGE_KEY } from "../../constants/storageKeys";
import { StorageService } from "../../services/StorageService";
import { MoonFilled, SunOutlined } from "@ant-design/icons";
import { NavLink, useNavigate } from "react-router-dom";
import { useTheme } from "../../contexts/ThemeContext";
import { Button, Col, Modal, Row, Select, Space } from "antd";
import { useAuth } from "../../contexts/AuthContext";
import logo from "../../assets/images/logo3.png";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { ROUTES } from "../../routes/paths";
import "./header.css";

import usFlag from "../../assets/images/flags/us.png";
import hyFlag from "../../assets/images/flags/am.png";
import ruFlag from "../../assets/images/flags/ru.png";

const flags = {
  en: usFlag,
  hy: hyFlag,
  ru: ruFlag,
};

const Header = () => {
  const navigate = useNavigate();
  const { theme, handleClick } = useTheme();
  const { isAuth, logout } = useAuth();
  const [language, setLanguage] = useState<"en" | "hy" | "ru">("en");
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const savedLang = StorageService.getItem(LANGUAGE_STORAGE_KEY) as
      | "en"
      | "hy"
      | "ru"
      | null;
    if (savedLang) setLanguage(savedLang);
  }, []);

  const onLanguageChange = (lang: "en" | "hy" | "ru") => {
    setLanguage(lang);
    i18n.changeLanguage(lang);
    StorageService.setItem(LANGUAGE_STORAGE_KEY, lang);
  };

  const handleLogout = () => {
    Modal.confirm({
      title: t("confirmLogoutTitle"),
      content: t("confirmLogoutContent"),
      okText: t("yes"),
      cancelText: t("no"),
      onOk: async () => {
        logout();
        navigate(ROUTES.HOME_PATH);
      },
      okButtonProps: { danger: true },
    });
  };

  const AuthButtons = () => (
    <Space.Compact className="auth-buttons">
      {isAuth ? (
        <>
          <Button onClick={() => navigate(ROUTES.PROFILE_PATH)}>
            {t("Profile")}
          </Button>
          <Button type="primary" danger onClick={handleLogout}>
            {t("Logout")}
          </Button>
        </>
      ) : (
        <>
          <Button
            className="sign-in-btn"
            onClick={() => navigate(ROUTES.SIGN_IN_PATH)}
          >
            {t("signIn")}
          </Button>
          <Button
            className="sign-up-btn"
            onClick={() => navigate(ROUTES.SIGN_UP_PATH)}
          >
            {t("signUp")}
          </Button>
        </>
      )}
    </Space.Compact>
  );

  return (
    <header className={`header-${theme}`}>
      <Row
        justify="space-between"
        align="middle"
        className="header-container"
        wrap={false}
      >
        <Col>
          <Row align="middle" gutter={16} className="left-section">
            <Col>
              <div className="logo" onClick={() => navigate(ROUTES.HOME_PATH)}>
                <img className="logo-image" src={logo} alt="logo" />
              </div>
            </Col>

            <Col>
              <nav className="nav-container">
                <ul className="list-container">
                  <li>
                    <NavLink to={ROUTES.HOME_PATH}>{t("home")}</NavLink>
                  </li>
                  <li>
                    <NavLink to={ROUTES.ABOUT_PATH}>{t("about")}</NavLink>
                  </li>
                  <li>
                    <NavLink to={ROUTES.CONTACT_US_PATH}>
                      {t("contact")}
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to={ROUTES.JOBS_PATH}>{t("Jobs")}</NavLink>
                  </li>
                </ul>
              </nav>
            </Col>
          </Row>
        </Col>

        <Col>
          <Row align="middle" gutter={16} className="right-section">
            <Col>
              <Select
                className={`language-select language-select-${theme}`}
                value={language}
                onChange={onLanguageChange}
                popupMatchSelectWidth={false}
                optionLabelProp="label"
              >
                {(["en", "hy", "ru"] as const).map((lang) => (
                  <Select.Option
                    key={lang}
                    value={lang}
                    label={
                      <div className="option-item">
                        <img
                          src={flags[lang]}
                          alt={lang}
                          className="flag-icon"
                        />
                        {lang === "en"
                          ? "English"
                          : lang === "hy"
                          ? "Հայերեն"
                          : "Русский"}
                      </div>
                    }
                  >
                    <div className="option-item">
                      <img src={flags[lang]} alt={lang} className="flag-icon" />
                      {lang === "en"
                        ? "English"
                        : lang === "hy"
                        ? "Հայերեն"
                        : "Русский"}
                    </div>
                  </Select.Option>
                ))}
              </Select>
            </Col>

            <Col>
              <div className="theme-toggle" onClick={handleClick}>
                {theme === "light" ? (
                  <MoonFilled className="theme-icon" />
                ) : (
                  <SunOutlined className="theme-icon" />
                )}
              </div>
            </Col>

            <Col>{<AuthButtons />}</Col>
          </Row>
        </Col>
      </Row>
    </header>
  );
};

export default Header;
