import React from 'react'
import { useTheme } from '../../contexts/ThemeContext'
import './footer.css'

const facebookLogo = 'https://upload.wikimedia.org/wikipedia/commons/0/05/Facebook_Logo_(2019).png'
const instagramLogo = 'https://upload.wikimedia.org/wikipedia/commons/e/e7/Instagram_logo_2016.svg'

const Footer = () => {
  const { theme } = useTheme()

  return (
    <footer className={`footer footer-${theme}`}>
      <div className="footer-container">
        <div className="footer-left">
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
            <img src={facebookLogo} alt="Facebook" className="social-logo" />
          </a>
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
            <img src={instagramLogo} alt="Instagram" className="social-logo" />
          </a>
        </div>

        <div className="footer-center">
          <h2>ACA</h2>
          <div>Yerevan, Armenia</div>
          <div>Phone: +374 000 00 00</div>
        </div>

        <div className="footer-right"></div>
      </div>
    </footer>
  )
}

export default Footer
