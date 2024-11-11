import { NavLink, useNavigate } from "react-router-dom";
import "../../../Dashboard/Components/Sidebar/Sidebaradmin.css";
import logo from "../../../assets/logo.svg";
import { CiLogin } from "react-icons/ci";

export const Sidebar = () => {
  const navigate = useNavigate(); 

  const handleLogout = () => {
    try{
    localStorage.removeItem('token'); // Remove the token from local storage
    localStorage.removeItem('userRole');
    navigate('/signIn', { replace: true }); 
  }
  catch(error) {
    console.error("Logout failed:", error);
  }
  };


  const Item_Sidebar = [
    {
      id: 1,
      path: "/dashboard",
      name: "Home",
      icon: "",
    },
    {
      id: 2,
      path: "/students",
      name: "Students",
      icon: "",
    },
    {
      id: 3,
      path: "/absence",
      name: "Absence",
    },
    {
      id: 4,
      path: "/quizzes",
      name: "Quizzes",
    },
    {
      id: 5,
      path: "/tests",
      name: "Tests",
    },
    {
      id: 6,
      path: "/behavioral",
      name: "Behavioral Notes",
    },
    {
      id: 7,
      path: "/latest-news",
      name: "Latest news",
    },
    {
      id: 8,
      path: "/signIn", 
      name: "Logout",
      icon: <CiLogin />,
      onClick: handleLogout
    },
  ];

  return (
    <div className="countiner-sidebar-admin">
      <nav>
      <NavLink to="/" className="logo">
      <img src={logo} className="" alt="" />
        </NavLink>

        <ul>
          {Item_Sidebar.map((link) => (
            <NavLink 
              key={link.id} 
              to={link.path} 
              className="" 
              onClick={link.onClick ? link.onClick : undefined} 
            >
              <span>{link.icon}</span>
              <span className="">{link.name}</span>
            </NavLink>
          ))}
        </ul>
      </nav>
    </div>
  );
};

/*import { NavLink, useNavigate } from "react-router-dom";
import "./Sidebar.css";
import logo from "../../../assets/logo.svg";
import { CiLogin } from "react-icons/ci";

export const Sidebar = () => {

  const Item_Sidebar = [
    {
      id: 1,
      path: "/students",
      name: "Students",
      icon: "",
    },
    {
      id: 2,
      path: "/absence",
      name: "Absence",
    },
    {
      id: 3,
      path: "/quizzes",
      name: "Quizzes",
    },
    {
      id: 4,
      path: "/tests",
      name: "Tests",
    },
    {
      id: 5,
      path: "/behavioral",
      name: "Behavioral Notes",
    },
    {
      id: 6,
      path: "/latest-news",
      name: "Latest news",
    },
    {
      id: 7,
      path: "/signIn",
      name: "Logout",
      icon: <CiLogin />,
    },
  ];
  return (
    <div className="countiner-sidebar">
      <nav>
        <div className="logo">
          <img src={logo} className="" alt="" />
        </div>

        <ul>
          {Item_Sidebar.map((link) => (
            <NavLink key={link.id} to={link.path} className="">
              <span>{link.icon}</span>
              <span className="">{link.name}</span>
            </NavLink>
          ))}
        </ul>
      </nav>
    </div>
  );
};
*/


