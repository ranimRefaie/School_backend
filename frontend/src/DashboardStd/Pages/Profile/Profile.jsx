import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from "../../Components/Navbar/Navbar";
import { Sidebar } from "../../Components/Sidebar/Sidebar";
import './Profile.css'; // Create a CSS file for styling
//import "../../../Dashboard/Pages/Students/Students.css";
import { useState, useEffect } from "react";
import axios from 'axios';
import useAuth from "../../../Components/useAuth";


const Profile = () => {
  const [userData, setUserData] = useState([]);
  
useAuth();
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/student/info', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, // Send token in the headers
          },
        });
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);



return (
    <div className="flex" style={{ width: "100%" }}>
      <Sidebar />
      <div style={{ width: "100%" }}>
        <Navbar fullName={userData.fullName} />
        <div className="flex" style={{ width: "65%", margin: "auto" }}>
          <div className="page-student main-student">
            <div className="overlay"></div>
            <div className="container">
              
                  <div className="profile-card">
                    <h3>Student Profile</h3>
                    <p><strong>Username: </strong> {userData.username}</p>
                    <p><strong>Full Name: </strong> {userData.fullName}</p>
                    <p><strong>Father's Name: </strong> {userData.fathersName}</p>
                    <p><strong>Mother's Name: </strong> {userData.mothersName}</p>
                    <p><strong>Mobile Number: </strong> {userData.mobileNumber}</p>
                    <p><strong>Class: </strong> {userData.sclass}</p>
                  </div>
             
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};



export default Profile;
