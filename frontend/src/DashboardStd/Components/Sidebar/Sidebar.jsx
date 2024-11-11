import { NavLink, useNavigate } from "react-router-dom";
import logo2 from "../../../assets/logo2.png";
import { CiLogin } from "react-icons/ci";
import React from 'react';
import "../../../DashboardStd/Components/Sidebar/Sidebarstd.css";
import { useState } from "react";
import { FaHome } from "react-icons/fa";
import { FaClock } from "react-icons/fa";
import { FaNoteSticky } from "react-icons/fa6";
import { PiNotepadFill } from "react-icons/pi";
import { FaNewspaper } from "react-icons/fa6";
import { IoCreateSharp } from "react-icons/io5";

export const Sidebar = () => {
  const [activeLink, setActiveLink] = useState(""); // State to track the active link

  const navigate = useNavigate(); 

  const handleLogout = () => {
    try{
    localStorage.removeItem('token'); // Remove the token from local storage
    localStorage.removeItem('userRole');
    navigate('/signIn'); 
  }
  catch(error) {
    console.error("Logout failed:", error);
  }
  };

  const Item_Sidebar = [
    {
      id: 1,
      path: "/student-dash",
      name: "Home",
      icon: <FaHome size={22} />,
    },
    {
      id: 2,
      path: "/attendance",
      name: "Attendance",
      icon: <FaClock size={22} />,
    },
    {
      id: 3,
      path: "/test-student",
      name: "Tests",
      icon: <FaNoteSticky size={22} />,
    },
    {
      id: 4,
      path: "/quizzes-student",
      name: "Quizzes",
      icon: <IoCreateSharp size={22} />,
    },
    {
      id: 5,
      path: "/behavioral-observations",
      name: "Behavioral Observations",
      icon: <PiNotepadFill size={22} />,
    },
    {
      id: 6,
      path: "/latest-name-student",
      name: "Latest News",
      icon: <FaNewspaper size={22} />,
    },
    /*{
      id: 7,
      path: "/signIn",
      name: "Logout",
      icon: <CiLogin size={22} />,
      onClick: handleLogout,
    },*/
  ];
  return (
    <div className="countiner-sidebar-std">
      <nav>
               <NavLink to="/" className="logo2">
                <img src={logo2} className="" alt="" />
                </NavLink>   
        

        <ul>
          {Item_Sidebar.map((link) => (
            <NavLink 
            key={link.id} 
            to={link.path}
            onClick={link.onClick ? link.onClick : undefined} 
            className={`nav-link ${activeLink === link.name ? 'active' : ''}`}

        
          >
              <span>{link.icon}</span>
              <span className="name-link">{link.name}</span>
            </NavLink>
          ))}
        </ul>
      </nav>
    </div>
  );
};
