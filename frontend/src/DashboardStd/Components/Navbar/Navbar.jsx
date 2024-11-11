import { Link, useNavigate } from "react-router-dom";
import "../../../DashboardStd/Components/Navbar/Navbarstd.css";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { FaRegCircleUser } from "react-icons/fa6";
import React from 'react';

export const Navbar = ({ fullName }) => {
  const navigate = useNavigate(); // Hook for navigation

  const handleLogout = () => {
    // Remove token and user information from local storage
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    localStorage.removeItem('fullName');
    
    // Navigate to signIn page
    navigate('/signIn', { replace: true });
  };

  return (
    <div className="navbar-students">
      <h2 className="navbar-title">{fullName}</h2> 
      <DropdownButton
        align="end"
        title={<FaRegCircleUser className="user-icon" size={25} />}
        id="dropdown-menu-align-end"
        className="user-dropdown"
      >
        <Dropdown.Item eventKey="1" as={Link} to="/student-profile" className="profile-link">
            Profile
        </Dropdown.Item>
        <Dropdown.Item eventKey="2" as={Link} to="/signIn" className="logout-link" onClick={handleLogout}>
            Logout
        </Dropdown.Item>
      </DropdownButton>
    </div>
  );
};

/*
import { Link } from "react-router-dom";
import "../../../DashboardStd/Components/Navbar/Navbarstd.css";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { FaRegCircleUser } from "react-icons/fa6";
import React from 'react';

export const Navbar = ({ fullName }) => {
  return (
    <div className="navbar-students">
      <h2 className="navbar-title">{fullName}</h2> 
      <DropdownButton
        align="end"
        title={<FaRegCircleUser className="user-icon" size={25} />}
        id="dropdown-menu-align-end"
        className="user-dropdown"
      >
        <Dropdown.Item eventKey="1">
        <Link to="/student-profile" className="profile-link">
           Profile
          </Link>
         </Dropdown.Item>
        <Dropdown.Item eventKey="2">
          <Link to="/signIn" className="logout-link">
            Logout
          </Link>
        </Dropdown.Item>
      </DropdownButton>
    </div>
  );
};
*/