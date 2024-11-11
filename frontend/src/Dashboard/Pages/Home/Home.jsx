import { Sidebar } from "../../Components/Sidebar/Sidebar";
import "./Home.css";
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from "../../../Components/useAuth";


export const Home = () => {
  useAuth();

  return (
    <div>
      <div className="flex"></div>
      <Sidebar />
      <div className="page-student">

      <h1>Future Typical School</h1> 
        <h3>Welcome to the Admin Dashboard!</h3>

      </div>

    </div>
    
  );
};

