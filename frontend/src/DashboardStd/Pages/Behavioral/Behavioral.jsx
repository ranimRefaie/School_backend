import { Navbar } from "../../Components/Navbar/Navbar";
import { Sidebar } from "../../Components/Sidebar/Sidebar";
//import "../../../Dashboard/Pages/Students/Students.css";
import { useState, useEffect } from "react";
import axios from 'axios';
import "../Home/Home.css";
import useAuth from "../../../Components/useAuth";



export const BehavioralNote = () => {
  const fullName = localStorage.getItem('fullName') || ''; // Default to 'Student' if not found
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const notesPerPage = 3; 

  useAuth();

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/student/bnotes', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });

        console.log('API Response:', response.data);
        setData(response.data.notes || []); // Ensure this is an array
      } catch (error) {
        console.error('Error fetching notes:', error.response?.data?.message || error.message);
      }
    };

    fetchNotes();
    const intervalId = setInterval(fetchNotes, 3000); 

    return () => clearInterval(intervalId); // Clean up on unmount
  }, []);

  const indexOfLastNote = currentPage * notesPerPage;
  const indexOfFirstNote = indexOfLastNote - notesPerPage;
  const currentNotes = data.slice(indexOfFirstNote, indexOfLastNote);

  // Calculate total pages
  const totalPages = Math.ceil(data.length / notesPerPage);

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
                currentNotes.map((note) => (
                  <div key={note._id} className="card">
                    <h3>Behavioral Note:</h3>
                    <p><strong>Type: </strong>
                    <span className={note.type === 'Negative' ? 'negative-type' : 'positive-type'}>
                      {note.type}
                    </span></p>
                    <p><strong>The Note:</strong> {note.note}</p>
                    <p className="card-date"> {new Date(note.date).toLocaleDateString('en-GB')}</p>
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


















/*import { Navbar } from "../../Components/Navbar/Navbar";
import { Sidebar } from "../../Components/Sidebar/Sidebar";
import "../../../Dashboard/Pages/Students/Students.css";
import { useState } from "react";
import "../Home/Home.css";

const initialData = [
  {
    id: 1,
    fullName: "reem Hefnawi",
    type: "Negative",
    note: "bad behavioral",
  },
];
export const BehavioralNote = () => {
  const [data, setData] = useState(initialData);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = data.filter((item) =>
    item.note.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredData.slice(indexOfFirstRow, indexOfLastRow);
  return (
    <div className="flex" style={{ width: "100%" }}>
      <Sidebar />
      <div
        className=""
        style={{
          width: "100%",
        }}
      >
        <Navbar />
        <div className="flex " style={{ width: "80%", margin: "auto" }}>
          <div className="page-student main-student">
            <div class="overlay"></div>
            <table>
              <thead style={{ background: "#fbda5b" }}>
                <tr>
                  <th>Type</th>
                  <th>Note</th>
                </tr>
              </thead>
              <tbody>
                {currentRows.map((row) => (
                  <tr key={row.id}>
                    <td>{row.type}</td>
                    <td>{row.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
*/