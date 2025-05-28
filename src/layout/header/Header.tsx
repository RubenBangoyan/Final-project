import React from "react";
import { MoonFilled, SunOutlined } from "@ant-design/icons";
import { NavLink, useNavigate } from "react-router-dom";
import { useTheme } from "../../contexts/ThemeContext";
import { Button, Col, Row, Select, Modal } from "antd";
import { useAuth } from "../../contexts/AuthContext";
import { ROUTES } from "../../routes/paths";
import { useTranslation } from "react-i18next";
import { StorageService } from "../../services/StorageService";
import { LANGUAGE_STORAGE_KEY } from "../../constants/storageKeys";
import "./header.css";
import type { RootState } from "../../app/store";
import { Popover } from "antd";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../services/firebse-config";
import { getUserProfileFromFirebase } from "../../services/fetchUserProfile";
import { useDispatch } from "react-redux";
import { updateProfile } from "../../features/user/userSlice";


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
  const { isAuth, logout } = useAuth();
  const [language, setLanguage] = React.useState<"en" | "hy" | "ru">("en");
  const { t, i18n } = useTranslation();
  const profile = useSelector((state: RootState) => state.user.profile);
  const dispatch = useDispatch();


  React.useEffect(() => {
    const savedLang = StorageService.getItem(LANGUAGE_STORAGE_KEY) as
      | "en"
      | "hy"
      | "ru"
      | null;
    if (savedLang && flags[savedLang]) {
      setLanguage(savedLang);
    }
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const profile = await getUserProfileFromFirebase(user.uid);
        if (profile) {
          dispatch(updateProfile(profile));
        }
      }
    });

    return () => unsubscribe();
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
      okButtonProps: {
        danger: true,
      },
    });
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
                    <NavLink to={ROUTES.JOBS_PATH}>Jobs</NavLink>
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
              {theme === "light" ? (
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
            {profile && (
                <Col style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  {profile?.avatarUrl && (
                      <img
                          src={profile.avatarUrl}
                          alt="avatar"
                          style={{
                            width: 32,
                            height: 32,
                            borderRadius: "50%",
                            objectFit: "cover",
                          }}
                      />
                  )}
                  <Popover
                      content={
                        <div>
                          <p>
                            <strong>{profile.name} {profile.surname}</strong>
                          </p>
                          <p>Email: {profile.email}</p>
                          <p>Status: {profile.status}</p>
                          <Button
                              size="small"
                              style={{
                                fontSize: "12px",
                                padding: "2px 8px",
                                height: "auto",
                                lineHeight: 1,
                                marginTop: 8,
                              }}
                              onClick={() => navigate(ROUTES.PROFILE_PATH)}
                          >
                            Edit Profile
                          </Button>
                        </div>
                      }
                      trigger="click"
                  >
                  <span style={{ cursor: "pointer", fontWeight: 600 }}>
                    {profile.name} {profile.surname}
                  </span>
                  </Popover>
                </Col>
            )}

            {isAuth ? (
              <>
                <Col>
                  <Button
                    type="default"
                    style={{
                      backgroundColor:
                        theme === "light" ? "#1890ff" : "#001529",
                      color: "#ffffff",
                    }}
                    onClick={() => navigate(ROUTES.UPLOAD_WORK)}
                  >
                    {t("uploadWork")}
                  </Button>{" "}
                  {!profile && (<Button
                    type="default"
                    style={{
                      backgroundColor:
                        theme === "light" ? "#1890ff" : "#001529",
                      color: "#ffffff",
                    }}
                    onClick={() => navigate(ROUTES.PROFILE_PATH)}
                  >
                    {t("resume")}
                  </Button>) }
                </Col>
                <Col>
                  <Button type="primary" danger onClick={handleLogout}>
                    {t("logout")}
                  </Button>
                </Col>
              </>
            ) : (
              <>
                <Col>
                  <Button
                    style={{
                      backgroundColor:
                        theme === "light" ? "#1890ff" : "#001529",
                      color: "#ffffff",
                    }}
                    type="default"
                    onClick={() => navigate(ROUTES.SIGN_IN_PATH)}
                  >
                    {t("signIn")}
                  </Button>
                </Col>
                <Col>
                  <Button
                    style={{
                      backgroundColor:
                        theme === "light" ? "#1890ff" : "#001529",
                      color: "#ffffff",
                    }}
                    type="default"
                    onClick={() => navigate(ROUTES.SIGN_UP_PATH)}
                  >
                    {t("signUp")}
                  </Button>
                </Col>
              </>
            )}
          </Row>
        </Col>
      </Row>
    </header>
  );
};

export default Header;
