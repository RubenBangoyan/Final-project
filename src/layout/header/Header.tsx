import { LANGUAGE_STORAGE_KEY } from '../../constants/storageKeys';
import { StorageService } from '../../services/StorageService';
import { MoonFilled, SunOutlined } from '@ant-design/icons';
import { NavLink, useNavigate } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';
import { Button, Col, Row, Select, Modal } from 'antd';
import { useAuth } from '../../contexts/AuthContext';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { ROUTES } from '../../routes/paths';
import './header.css';

import usFlag from '../../assets/images/flags/us.png'
import hyFlag from '../../assets/images/flags/am.png';
import ruFlag from '../../assets/images/flags/ru.png'

const flags = {
  en: usFlag,
  hy: hyFlag,
  ru: ruFlag,
};

const Header = () => {
  const navigate = useNavigate();
  const { theme, handleClick } = useTheme();
  const { isAuth, logout } = useAuth();
  const [language, setLanguage] = useState<'en' | 'hy' | 'ru'>('en');
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const savedLang = StorageService.getItem(LANGUAGE_STORAGE_KEY) as
      | 'en'
      | 'hy'
      | 'ru'
      | null;
    if (savedLang) setLanguage(savedLang);
  }, []);

  const onLanguageChange = (lang: 'en' | 'hy' | 'ru') => {
    setLanguage(lang);
    i18n.changeLanguage(lang);
    StorageService.setItem(LANGUAGE_STORAGE_KEY, lang);
  };

  const handleLogout = () => {
    Modal.confirm({
      title: t('confirmLogoutTitle'),
      content: t('confirmLogoutContent'),
      okText: t('yes'),
      cancelText: t('no'),
      onOk: async () => {
        logout();
        navigate(ROUTES.HOME_PATH);
      },
      okButtonProps: { danger: true },
    });
  };

  const renderFlagOption = (lang: 'en' | 'hy' | 'ru', label: string) => (
    <Select.Option value={lang} label={label}>
      <div className="option-item">
        <img src={flags[lang]} alt={label} className="flag-icon" />
        {label}
      </div>
    </Select.Option>
  );

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
                    <NavLink to={ROUTES.HOME_PATH}>{t('home')}</NavLink>
                  </li>
                  <li>
                    <NavLink to={ROUTES.ABOUT_PATH}>{t('about')}</NavLink>
                  </li>
                  <li>
                    <NavLink to={ROUTES.CONTACT_US_PATH}>
                      {t('contact')}
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
                {renderFlagOption('en', 'English')}
                {renderFlagOption('hy', 'Հայերեն')}
                {renderFlagOption('ru', 'Русский')}
              </Select>
            </Col>
            <Col>
              {theme === 'light' ? (
                <MoonFilled
                  onClick={handleClick}
                  style={{ fontSize: 18, cursor: 'pointer' }}
                />
              ) : (
                <SunOutlined
                  onClick={handleClick}
                  style={{ fontSize: 18, cursor: 'pointer' }}
                />
              )}
            </Col>
          </Row>
        </Col>

        <Col>
          <Row gutter={12} wrap={false}>
            {isAuth ? (
              <>
                <Col>
                  <Button onClick={() => navigate(ROUTES.PROFILE_PATH)}>
                    Profile
                  </Button>
                </Col>
                <Col>
                  <Button type="primary" danger onClick={handleLogout}>
                    {t('logout')}
                  </Button>
                </Col>
              </>
            ) : (
              <>
                <Col>
                  <Button
                    style={{
                      backgroundColor:
                        theme === 'light' ? '#1890ff' : '#001529',
                      color: '#ffffff',
                    }}
                    onClick={() => navigate(ROUTES.SIGN_IN_PATH)}
                  >
                    {t('signIn')}
                  </Button>
                </Col>
                <Col>
                  <Button
                    style={{
                      backgroundColor:
                        theme === 'light' ? '#1890ff' : '#001529',
                      color: '#ffffff',
                    }}
                    onClick={() => navigate(ROUTES.SIGN_UP_PATH)}
                  >
                    {t('signUp')}
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
