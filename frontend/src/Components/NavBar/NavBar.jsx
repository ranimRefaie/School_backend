import { useEffect, useState } from "react";
import "./NavBarmain.css";
//import "../../Components/NavBar/NavBarmain.css";

import logo from "../../assets/logo.svg";
import MobileNav from "../MobileNav/MobileNav";
import { IoClose } from "react-icons/io5";
import { FiAlignJustify } from "react-icons/fi";
import { Link } from "react-router-dom";

const NavBar = () => {
  const [isFixed, setIsFixed] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const links = [
    { id: 1, name: "Home", to: "/" },
    { id: 2, name: "About Us", to: "/about-us" },
    { id: 3, name: "Timetable", to: "/Timetable" },
    { id: 4, name: "Contact Us", to: "/contact-us" },
    { id: 5, name: "", to: "" },
  ];
  const toggleMenu = () => {
    setOpenMenu(!openMenu);
  };
  const handleScroll = () => {
    if (window.scrollY > 50) {
      setIsFixed(true);
    } else {
      setIsFixed(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className={`nav-bar ${isFixed ? "fixed" : ""}`}>
      <MobileNav isOpen={openMenu} toggleMenu={toggleMenu} />
      <nav className="desktop-nav container flex between">
        <div className="logo">
          <img src={logo} alt="" />
        </div>
        <ul className="nav-items flex">
          {links.map((item) => (
            <li key={item.id}>
              <Link to={item.to}>{item.name}</Link>
            </li>
          ))}
        </ul>
        <Link to="/signIn" className="btn-1">
          SIGN IN
        </Link>

        <button className="menu-btn" onClick={toggleMenu}>
          <span
            className="material-symbols-outlined"
            style={{ fontSize: "1.8rem" }}
          >
            <FiAlignJustify />
          </span>
        </button>
      </nav>
    </div>
  );
};

export default NavBar;
