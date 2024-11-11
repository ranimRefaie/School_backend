import { Navbar } from "../../Components/Navbar/Navbar";
import { Sidebar } from "../../Components/Sidebar/Sidebar";
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const StudentDash = () => {
  const fullName = localStorage.getItem('fullName') || ''; // Default to 'Student' if not found
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      const parts = token.split('.');
      if (parts.length === 3) {
        const payload = JSON.parse(atob(parts[1])); // Decode the payload
        const currentTime = Date.now() / 1000; // Current time in seconds

        // Check if the token has expired
        if (payload.exp < currentTime) {
          // Token expired
          localStorage.removeItem('token');
          localStorage.removeItem('userRole');
          localStorage.removeItem('fullName');
          
          toast.error("Your session has expired. Please sign in again.");

          // Redirect to sign-in with a message
          navigate('/signIn');
        }
      }
    } else {
      // No token, redirect to sign-in
      navigate('/signIn');
    }
  }, [navigate]);

  

  return (
    <div className="flex" style={{ width: "100%" }}>
      <Sidebar />
      <div
        className=""
        style={{
          width: "100%",
        }}
      >
        <Navbar fullName={fullName} />
        <div className="flex" style={{ width: "65%", margin: "auto" }}>
          <div className="page-student main-student">
            <div className="overlay"></div>
            </div></div>
      </div>
    </div>
  );
};
