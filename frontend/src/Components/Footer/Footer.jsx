import logo from "../../assets/logo.svg";
import "./Footer.css";
import { FaFacebook } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";
import { FaTelegram } from "react-icons/fa";

export const Footer = () => {
  return (
    <div className="footer">
      <div className="con-footer container flex between">
        <div className="logo">
          <img src={logo} alt="" />
          <div className="social-media flex item-center">
          <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">              {" "}
              <FaFacebook className="icon" />
            </a>
            <a href="https://web.whatsapp.com/" target="_blank" rel="noopener noreferrer">              {" "}
            <FaWhatsapp className="icon" />
            </a>
            <a href="https://web.telegram.org/" target="_blank" rel="noopener noreferrer">              {" "}
              {" "}
              <FaTelegram className="icon" />
            </a>
          </div>
        </div>

        <div className="links">
          <h3>Quick Linkes</h3>
          <ul className="nav-items">
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/about-us">About Us</a>
            </li>
            <li>
              <a href="/Timetable">Calendar</a>
            </li>
          </ul>
        </div>

        <div className="links">
          <h3>Other Services </h3>
          <ul className="nav-items">
            <li>
              <a href="/signIn">Sign In</a>
            </li>
            <li>
              <a href="/Job-Application">Job Application</a>
            </li>
            <li>
              <a href="/contact-us">Contact Us</a>
            </li>
          </ul>
        </div>

        <div className="links">
          <h3>Get In Touch</h3>

          <div className="nav-items">
            <p>Syria - Damascus</p>
            <p>info@futureschool.com</p>
            <p>011-6335944</p>
          </div>
        </div>
      </div>
    </div>
  );
};
