import logo from "../../img/tfn logo.png";
import "./Footer.css";
import { FaFacebookF } from "react-icons/fa";
import { FaTelegramPlane } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import { IoIosCall } from "react-icons/io";
import { AiOutlineMail } from "react-icons/ai";

const Footer = () => {
  return (
    <div className="footer navbar-fixed-bottom">
      <footer>
        <div className="container-fluid">
          <div className="p-3 row align-items-start justify-content-around">
            <div className="justify-self-start p-3 logo-footer col-6 col-sm-6 col-md-3">
              <h3 className="text-white text-end">
                Tips For
                <br /> <strong>Nics </strong>
              </h3>
              <img src={logo} alt="Logo" />
            </div>

            <div className="p-3 col-6 col-sm-6 col-md-3">
              <h6>FIND US ON</h6>
              <ul>
                <li>
                  <a href="https://google.com">
                    <i className="fab fa-facebook-f">
                      <FaFacebookF />
                    </i>
                    &nbsp; Facebook
                  </a>
                </li>
                <li>
                  <a href="https://google.com">
                    <i className="fab fa-telegram-plane">
                      <FaTelegramPlane />
                    </i>
                    &nbsp; Telegram
                  </a>
                </li>
                <li>
                  <a href="https://google.com">
                    <i className="fab fa-youtube">
                      <FaYoutube />
                    </i>
                    &nbsp; Youtube
                  </a>
                </li>
              </ul>
            </div>

            <div className="p-3 col-12 col-sm-12 col-md-3">
              <h6>CONTACT</h6>
              <ul>
                <li>
                  <i className="fas fa-map-marker-alt">
                    <MdLocationOn />
                  </i>
                  Yangon, Myanmar
                </li>
                <li>
                  <i className="fas fa-phone-alt">
                    {" "}
                    <IoIosCall />
                  </i>
                  09 965 901 483
                </li>
                <li>
                  <i className="fas fa-envelope">
                    <AiOutlineMail />
                  </i>{" "}
                  tipsfornicstfn@gmail.com
                </li>
              </ul>
            </div>
          </div>
          <div className="py-3 row text-center">
            <p id="copy">&copy; 2021 Tips for Nics</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
