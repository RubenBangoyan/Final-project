import React from 'react'
import { MoonFilled, SunOutlined } from '@ant-design/icons'
import { NavLink, useNavigate } from 'react-router-dom'
import { useTheme } from '../../contexts/ThemeContext'
import { ROUTES } from '../../routes/paths'
import { Button, Select } from 'antd'
import './header.css'

import LanguageSelector from '../../components/SelectLanguage/SelectLanguage'

import usFlag from '../../images/flags/us.png'
import hyFlag from '../../images/flags/am.png'
import ruFlag from '../../images/flags/ru.png'

const { Option } = Select

const flags = {
  en: usFlag,
  hy: hyFlag,
  ru: ruFlag,
}

const Header = () => {
  const navigate = useNavigate()
  const { theme, handleClick } = useTheme()
  const [language, setLanguage] = React.useState<'en' | 'hy' | 'ru'>('en')

  React.useEffect(() => {
    const savedLang = localStorage.getItem('appLang') as 'en' | 'hy' | 'ru' | null
    if (savedLang && flags[savedLang]) {
      setLanguage(savedLang)
    }
  }, [])

  const onLanguageChange = (lang: 'en' | 'hy' | 'ru') => {
    setLanguage(lang)
    localStorage.setItem('appLang', lang)
    // If you use i18n, you can call i18n.changeLanguage(lang) here
  }

  return (
    <header className={`header-${theme}`}>
      <nav className="nav-container">
        <div className="nav-left">
          <NavLink to={ROUTES.HOME_PATH} className="nav-link">Home</NavLink>
          <NavLink to={ROUTES.ABOUT_PATH} className="nav-link">About</NavLink>
          <NavLink to={ROUTES.CONTACT_US_PATH} className="nav-link">Contact</NavLink>

          <Select
            className={`language-select language-select-${theme}`}
            value={language}
            onChange={onLanguageChange}
            dropdownMatchSelectWidth={false}
            optionLabelProp="label"
          >
            <Option
              value="en"
              label={<div><img src={flags.en} alt="English" className="flag-icon" /> English</div>}
            >
              <div className="option-item">
                <img src={flags.en} alt="English" className="flag-icon" />
                English
              </div>
            </Option>
            <Option
              value="hy"
              label={<div><img src={flags.hy} alt="Armenian" className="flag-icon" /> Հայերեն</div>}
            >
              <div className="option-item">
                <img src={flags.hy} alt="Armenian" className="flag-icon" />
                Հայերեն
              </div>
            </Option>
            <Option
              value="ru"
              label={<div><img src={flags.ru} alt="Russian" className="flag-icon" /> Русский</div>}
            >
              <div className="option-item">
                <img src={flags.ru} alt="Russian" className="flag-icon" />
                Русский
              </div>
            </Option>
          </Select>
        </div>

        <div className="nav-right">
          <Button type="primary" onClick={() => navigate(ROUTES.SIGN_IN_PATH)}>Sign In</Button>
          <Button onClick={() => navigate(ROUTES.SIGN_UP_PATH)}>Sign Up</Button>

          <div className="theme-toggle" onClick={handleClick}>
            {theme === 'dark' ? <MoonFilled /> : <SunOutlined />}
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header
