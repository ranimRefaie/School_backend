import "./Sign.css";
import logo from "../../assets/Rectangle 3.svg";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

 const Sign = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userRole = localStorage.getItem('userRole');
    const fullName = localStorage.getItem('fullName');

    // Check if the token is present
    if (token) {
     

        // Redirect based on user role
        if (userRole === 'Admin') {
          navigate('/dashboard');
        } else {
          navigate('/student-dash');
        }
      
    }
  }, [navigate]);


  const handleSubmit = async (e) => {
    e.preventDefault(); 

    try {
      const response = await axios.post('http://localhost:4000/api/Login', { 
        username, 
        password 
      });


      // Assuming the server responds with a token
      localStorage.setItem('token', response.data.token); // Save token in local storage
      localStorage.setItem('userRole', response.data.user.role); // Store user role
      localStorage.setItem('fullName', response.data.user.fullName); // Assuming user.fullName contains the full name
      if (response.data.user.role === 'Admin') {
      navigate('/dashboard'); // Redirect to dashboard
      }
      else
      {
        navigate('/student-dash'); 
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message); 
    } else {
        setError("An unexpected error occurred."); 
    }
    console.error("Login failed:", error);
    }
  };

  return (
    <div className="sign-page">
      <div className="container-form flex">
        <div className="logo-form">
          <img src={logo} alt="" />
        </div>
        <form onSubmit={handleSubmit}>
          <h2>Sign In</h2>
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required 
          />
          
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required 
          />  

           {error && <p className="error">{error}</p>} 

          <button type="submit">Sign In</button>

        </form>
      </div>
    </div>
  );
};

export default Sign;
