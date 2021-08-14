import landing_img from "../../../img/landing.svg";
import "./Landing.css";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <>
      <section id="landing">
        <div className="container">
          <div className="row justify-content-center align-items-center">
            <div className="col-md-6 col-sm-12">
              <img
                src={landing_img}
                alt="searching for tips"
                className="img-fluid"
              />
            </div>

            <div id="landing-text" className="p-4 col-md-6 col-sm-12">
              <h2>Tips For Nics</h2>
              <p className="text-grey">What we brought to you</p>
              <p className="text-muted">
                Welcome from TFN. We will post new technology tips. And we will
                usually keep the text as short as possible. If the articles are
                too long, we often skip reading. So let's keep it short. You can
                also take two minutes to read the tips that came up from TFN.
              </p>
              <Link className="Btn-primary" to="/all-tips">
                Explore Tips
              </Link>
            </div>
          </div>
        </div>
      </section>
      <br />
      <br />
    </>
  );
};

export default Landing;
