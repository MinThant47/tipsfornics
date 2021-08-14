import "./AboutUs.css";
import { GoGear } from "react-icons/go";
import { IoBulbOutline } from "react-icons/io5";
import { IoHardwareChipOutline } from "react-icons/io5";
import { FaRobot } from "react-icons/fa";

const AboutUs = () => {
  return (
    <>
      <section id="about-us">
        <div className="container">
          <h3 className="fw-bold text-grey text-center title-text">About Us</h3>

          <div className="row align-items-center">
            <div className="col-6 col-sm-6 col-md-3 col-lg-3">
              <div className="about-us text-center">
                <i className="fas fa-cog">
                  <GoGear />
                </i>
                <h5>
                  Mecha<strong>nic</strong>
                </h5>
              </div>
            </div>

            <div className="col-6 col-sm-6 col-md-3 col-lg-3">
              <div className="about-us text-center">
                <i className="fas fa-lightbulb">
                  <IoBulbOutline />
                </i>
                <h5>
                  Electro<strong>nic</strong>
                </h5>
              </div>
            </div>

            <div className="col-6 col-sm-6 col-md-3 col-lg-3">
              <div className="about-us text-center">
                <i className="fas fa-robot">
                  <FaRobot />
                </i>
                <h5>
                  Mechatro<strong>nic</strong>
                </h5>
              </div>
            </div>

            <div className="col-6 col-sm-6 col-md-3 col-lg-3">
              <div className="about-us text-center">
                <i className="fas fa-microchip">
                  <IoHardwareChipOutline />
                </i>
                <h5>
                  Tech<strong>nic</strong>
                </h5>
              </div>
            </div>
          </div>

          <div className="row text-center">
            <p className="text-muted">
              From Tips for Nics, the nics includes Mechanic, Electronic,
              Mechatronic and Technic. Morever, we are sharing about Web
              Development, Quantum Physics, New Tech Products and Personal
              Opinions.
            </p>
          </div>
        </div>
      </section>
      <br />
      <br />
    </>
  );
};

export default AboutUs;
