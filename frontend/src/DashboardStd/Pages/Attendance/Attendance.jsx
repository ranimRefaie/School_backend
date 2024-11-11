import { Navbar } from "../../Components/Navbar/Navbar";
import { Sidebar } from "../../Components/Sidebar/Sidebar";
//import "../../../Dashboard/Pages/Students/Students.css";
import { useState, useEffect } from "react";
import axios from 'axios';
import "../Home/Home.css";
import useAuth from "../../../Components/useAuth";

export const Attendance = () => {
  

  const fullName = localStorage.getItem('fullName') || ''; // Default to 'Student' if not found
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const absencesPerPage = 3; 
  useAuth();
  // Fetch quizzes when the component mounts
  useEffect(() => {
    const fetchAbsences = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/student/absences', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });

        console.log('API Response:', response.data);
        setData(response.data.absences || []); // Ensure this is an array
      } catch (error) {
        console.error('Error fetching absences:', error.response?.data?.message || error.message);
      }
    };

    fetchAbsences();
   const intervalId = setInterval(fetchAbsences, 3000); 

    return () => clearInterval(intervalId); // Clean up on unmount*/
  }, []);

  const indexOfLastAbsence = currentPage * absencesPerPage;
  const indexOfFirstAbsence = indexOfLastAbsence - absencesPerPage;
  const currentAbsences = data.slice(indexOfFirstAbsence, indexOfLastAbsence);

  // Calculate total pages
  const totalPages = Math.ceil(data.length / absencesPerPage);

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
                currentAbsences.map((absence) => (
                  <div key={absence._id} className="card">
                    <h3>Absent</h3>
                    <p><strong>Absence Pattern:</strong>  <span className={absence.type === 'Unexcused' ? 'negative-type' : 'positive-type'}>
                    {absence.type}
                    </span></p>
                    <p><strong>Date:</strong> {new Date(absence.date).toLocaleDateString('en-GB')}</p>

                   {/* <p className="card-date"> {new Date(absence.date).toLocaleDateString('en-GB')}</p>*/}
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
import { useState } from "react";
import "../Home/Home.css";

const initialData = [
  {
    id: "1",
    fullName: "Ahmad Rashad",
    absencePattern: "justified ",
    date: "2024-10-01",
  },
];
export const Attendance = () => {
  const [data, setData] = useState(initialData);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = data.filter((item) =>
    item.fullName.toLowerCase().includes(searchTerm.toLowerCase())
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
                  <th>Date</th>
                  <th>Absence Pattern</th>
                </tr>
              </thead>
              <tbody>
                {currentRows.map((row) => (
                  <tr key={row.id}>
                    <td>{row.date}</td>
                    <td>{row.absencePattern}</td>
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