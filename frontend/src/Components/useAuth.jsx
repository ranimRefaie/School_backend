import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const useAuth = () => {
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
}
export default useAuth;
