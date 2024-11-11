import { Navbar } from "../../Components/Navbar/Navbar";
import { Sidebar } from "../../Components/Sidebar/Sidebar";
//import "../../../Dashboard/Pages/Students/Students.css";
import { useState, useEffect } from "react";
import axios from 'axios';
import "../Home/Home.css";
import useAuth from "../../../Components/useAuth";


export const TestStd = () => {
  const fullName = localStorage.getItem('fullName') || ''; // Default to 'Student' if not found
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const testsPerPage = 3; // Maximum quizzes per page

  useAuth();
  // Fetch quizzes when the component mounts
  useEffect(() => {
    const fetchTests = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/student/tests', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });

        console.log('API Response:', response.data);
        setData(response.data.tests || []); // Ensure this is an array
      } catch (error) {
        console.error('Error fetching tests:', error.response?.data?.message || error.message);
      }
    };

    fetchTests();
    const intervalId = setInterval(fetchTests, 3000); // Check for new quizzes every 10 seconds

    return () => clearInterval(intervalId); // Clean up on unmount
  }, []);

  // Calculate the quizzes to display on the current page
  const indexOfLastTest = currentPage * testsPerPage;
  const indexOfFirstTest = indexOfLastTest - testsPerPage;
  const currentTests = data.slice(indexOfFirstTest, indexOfLastTest);

  // Calculate total pages
  const totalPages = Math.ceil(data.length / testsPerPage);

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
                currentTests.map((test) => (
                  <div key={test._id} className="card">
                    <h3>{test.testName}</h3>
                    <p><strong>Subject:</strong> {test.subject}</p>
                    <p><strong>Mark:</strong> {test.mark}</p>
                    <p><strong>Full Mark:</strong> {test.totalMark}</p>
                    <p className="card-date"> {new Date(test.date).toLocaleDateString('en-GB')}</p>
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
    testName: "",
    subject: "",
    mark: "",
    totalMark: "",
  },
];

export const TestStd = () => {
  const [data, setData] = useState(initialData);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = data.filter((item) =>
    item.testName.toLowerCase().includes(searchTerm.toLowerCase())
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
                  <th>Test Name</th>
                  <th>Subject</th>
                  <th>Mark</th>
                  <th>Total Mark</th>
                </tr>
              </thead>
              <tbody>
                {currentRows.map((row) => (
                  <tr key={row.id}>
                    <td>{row.testName}</td>
                    <td>{row.subject}</td>
                    <td>{row.mark}</td>
                    <td>{row.totalMark}</td>
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