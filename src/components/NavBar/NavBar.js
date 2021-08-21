import "./NavBar.css";
import tfn_logo from "../../img/tfn logo.png";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  const [active, setActive] = useState(false);
  useEffect(() => {
    active
      ? (document.body.style.overflow = "hidden")
      : (document.body.style.overflow = "visible");
  });

  return (
    <nav className="container">
      <Link to="/" className="title">
        <h1>TFN</h1>
        <img src={tfn_logo} alt="" />
      </Link>

      <div
        onClick={() => setActive(!active)}
        className={`menu-toggle ${active ? "is-active" : ""}`}
        id="mobile-menu"
      >
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </div>

      <ul className={`nav-menu p-0 m-0 ${active ? "active" : ""}`}>
        <li>
          <Link onClick={() => setActive(false)} to="/">
            Home
          </Link>
        </li>
        <li>
          <a onClick={() => setActive(false)} href="/#about-us">
            About Us
          </a>
        </li>
        <li>
          <a onClick={() => setActive(false)} href="/#contact-us">
            Contact Us
          </a>
        </li>
        <li>
          <Link
            id="alltipBtn"
            onClick={() => setActive(false)}
            className="Btn-primary"
            to="/all-tips"
          >
            All Tips
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
