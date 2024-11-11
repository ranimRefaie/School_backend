import { Navbar } from "../../Components/Navbar/Navbar";
import { Sidebar } from "../../Components/Sidebar/Sidebar";
//import "../../../Dashboard/Pages/Students/Students.css";
import { useState, useEffect } from "react";
import axios from 'axios';
import "../Home/Home.css";
import useAuth from "../../../Components/useAuth";


export const QuizzStd = () => {
  const fullName = localStorage.getItem('fullName') || ''; // Default to 'Student' if not found
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const quizzesPerPage = 3; 

useAuth();
  // Fetch quizzes when the component mounts
  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/student/quizzes', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });

        console.log('API Response:', response.data);
        setData(response.data.quizzes || []); // Ensure this is an array
      } catch (error) {
        console.error('Error fetching quizzes:', error.response?.data?.message || error.message);
      }
    };

    fetchQuizzes();
    const intervalId = setInterval(fetchQuizzes, 3000); // Check for new quizzes every 10 seconds

    return () => clearInterval(intervalId); // Clean up on unmount
  }, []);

  // Calculate the quizzes to display on the current page
  const indexOfLastQuiz = currentPage * quizzesPerPage;
  const indexOfFirstQuiz = indexOfLastQuiz - quizzesPerPage;
  const currentQuizzes = data.slice(indexOfFirstQuiz, indexOfLastQuiz);

  // Calculate total pages
  const totalPages = Math.ceil(data.length / quizzesPerPage);

  // Function to handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="flex" style={{ width: "100%" }}>
      <Sidebar />
      <div style={{ width: "100%" }}>
        <Navbar fullName={fullName} />
        <div className="flex" style={{ width: "65%", margin: "auto" }}>
          <div className="page-student main-student">
            <div className="overlay"></div>
            <div className="container">
              {(
                currentQuizzes.map((quiz) => (
                  <div key={quiz._id} className="card">
                    <h3>{quiz.quizName}</h3>
                    <p><strong>Subject:</strong> {quiz.subject}</p>
                    <p><strong>Score:</strong> {quiz.score}</p>
                    <p><strong>Max Score:</strong> {quiz.maxScore}</p>
                    <p className="card-date"> {new Date(quiz.date).toLocaleDateString('en-GB')}</p>
                  </div>
                ))
              ) }
            </div>
            {/* Pagination Controls */}
            <div className="pagination">
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index + 1}
                  onClick={() => handlePageChange(index + 1)}
                  className={currentPage === index + 1 ? 'active' : ''}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};










/*import { Navbar } from "../../Components/Navbar/Navbar";
import { Sidebar } from "../../Components/Sidebar/Sidebar";
import "../../../Dashboard/Pages/Students/Students.css";
import { useState, useEffect } from "react";
import axios from 'axios';
import "../Home/Home.css";

export const QuizzStd = () => {
  const [data, setData] = useState([]);

  // Fetch quizzes when the component mounts
  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/student/quizzes', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });

        console.log('API Response:', response.data);
        setData(response.data.quizzes); // Ensure this is an array
      } catch (error) {
        console.error('Error fetching quizzes:', error.response?.data?.message || error.message);
      }
    };

    fetchQuizzes();
  }, []);

  return (
    <div className="flex" style={{ width: "100%" }}>
      <Sidebar />
      <div style={{ width: "100%" }}>
        <Navbar />
        <div className="flex" style={{ width: "80%", margin: "auto" }}>
          <div className="page-student main-student">
            <div className="overlay"></div>
            <div className="quizzes-container">
              { (
                data.map((quiz) => (
                  <div key={quiz._id} className="quiz-card">
                    <h3>{quiz.quizName}</h3>
                    <p><strong>Subject:</strong> {quiz.subject}</p>
                    <p><strong>Score:</strong> {quiz.score}</p>
                    <p><strong>Max Score:</strong> {quiz.maxScore}</p>
                    <p><strong>Date:</strong> {new Date(quiz.date).toLocaleDateString()}</p>
                  </div>
                ))
              ) }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

*/









/*import { Navbar } from "../../Components/Navbar/Navbar";
import { Sidebar } from "../../Components/Sidebar/Sidebar";
import "../../../Dashboard/Pages/Students/Students.css";
import { useState, useEffect } from "react";
import axios from 'axios';
import "../Home/Home.css";

export const QuizzStd = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch quizzes when the component mounts
  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/student/quizzes', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}` // Assuming the token is stored in localStorage
          }
        });
        console.log('API Response:', response.data); // Log the entire response

        setData(response.data.quizzes); // Update state with fetched quizzes
      } catch (error) {
        console.error('Error fetching quizzes:', error.response?.data?.message || error.message);
      }
    };

    fetchQuizzes();
  }, []);

  const filteredData = data.filter((item) =>
    item.quizName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredData.slice(indexOfFirstRow, indexOfLastRow);

  return (
    <div className="flex" style={{ width: "100%" }}>
      <Sidebar />
      <div style={{ width: "100%" }}>
        <Navbar />
        <div className="flex" style={{ width: "80%", margin: "auto" }}>
          <div className="page-student main-student">
            <div className="overlay"></div>
            <table>
              <thead style={{ background: "#fbda5b" }}>
                <tr>
                  <th>Quiz Type</th>
                  <th>Subject</th>
                  <th>Score</th>
                  <th>Max Score</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {currentRows.map((row) => (
                  <tr key={row._id}> 
                    <td>{row.quizName}</td>
                    <td>{row.subject}</td>
                    <td>{row.score}</td>
                    <td>{row.maxScore}</td>
                    <td>{new Date(row.date).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};*/








