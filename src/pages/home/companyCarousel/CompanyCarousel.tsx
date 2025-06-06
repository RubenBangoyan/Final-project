import microsoftLogo from '../../../assets/images/microsoft-6.svg';
import facebookLogo from '../../../assets/images/facebook-5.svg';
import googleLogo from '../../../assets/images/google-1-1.svg';
import oracleLogo from '../../../assets/images/oracle-6.svg';
import appleLogo from '../../../assets/images/apple-11.svg';
import teslaLogo from '../../../assets/images/tesla-9.svg';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import Slider from 'react-slick';
import './CompanyCarousel.css';

const companies = [
  {
    name: 'Facebook',
    logo: facebookLogo,
    url: 'https://facebook.com/',
  },
  {
    name: 'Tesla',
    logo: teslaLogo,
    url: 'https://www.tesla.com/',
  },
  {
    name: 'Google',
    logo: googleLogo,
    url: 'https://about.google/',
  },
  {
    name: 'Microsoft',
    logo: microsoftLogo,
    url: 'https://www.microsoft.com/',
  },
  {
    name: 'Oracle',
    logo: oracleLogo,
    url: 'https://www.oracle.com/',
  },
  {
    name: 'Apple',
    logo: appleLogo,
    url: 'https://apple.com/',
  },
];

const CompanyCarousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    arrows: false,
    autoplaySpeed: 2500,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 600,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  return (
    <div className="carousel-container">
      <h2 className="carousel-title">Our Partners</h2>
      <Slider {...settings}>
        {companies.map((company, index) => (
          <div key={index} className="company-slide">
            <a
              href={company.url}
              target="_blank"
              rel="noopener noreferrer"
              className="company-card"
            >
              <img
                src={company.logo}
                alt={company.name}
                className="company-logo"
              />
            </a>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default CompanyCarousel;
