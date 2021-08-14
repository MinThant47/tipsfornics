import { Link } from "react-router-dom";
import "./ErrorPage.css";

const ErrorPage = ({ type, secondary }) => {
  return (
    <>
      <div className="container my-5 d-flex align-items-center justify-content-center">
        <div className="card-size">
          <div
            id="error"
            className="card p-5 text-danger row justify-content-center align-items-center"
          >
            <h3 className="text-center">{type}</h3>
            <p className="text-grey text-center">{secondary}</p>
            <p className="w-100 text-center text-grey">
              Go back to
              <Link to="/"> Home Page</Link>
            </p>
          </div>
        </div>
      </div>
      <br />
      <br />
    </>
  );
};

export default ErrorPage;
