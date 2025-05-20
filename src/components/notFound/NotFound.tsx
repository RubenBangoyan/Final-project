import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../routes/paths";
import { Button } from "antd";
import notFoundImg from "../../images/not-found-page.png";
import "./NotFound.css";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="not-found-wrapper">
      <div className="not-found-content">
        <img
          src={notFoundImg}
          alt="404 Not Found"
          className="not-found-image"
        />
        <h1 className="not-found-title">Oops! ERROR 404</h1>
        <p className="not-found-text">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <Button type="default" onClick={() => navigate(ROUTES.HOME_PATH)}>
          Go Back Home
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
