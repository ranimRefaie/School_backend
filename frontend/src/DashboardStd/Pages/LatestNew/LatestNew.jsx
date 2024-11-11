import { Navbar } from "../../Components/Navbar/Navbar";
import { Sidebar } from "../../Components/Sidebar/Sidebar";
//import "../../../Dashboard/Pages/Students/Students.css";
import { useState, useEffect } from "react";
import axios from 'axios';
import "../Home/Home.css";
import useAuth from "../../../Components/useAuth";


export const LatestNewStd = () => {
  const fullName = localStorage.getItem('fullName') || ''; // Default to 'Student' if not found
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const newsPerPage = 3; // Maximum quizzes per page
  
  useAuth();

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/student/announcements', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });

        console.log('API Response:', response.data);
        setData(response.data || []); // Ensure this is an array
      } catch (error) {
        console.error('Error fetching latest news:', error.response?.data?.message || error.message);
      }
    };

    fetchNews();
    const intervalId = setInterval(fetchNews, 3000); // Check for new quizzes every 10 seconds

    return () => clearInterval(intervalId); // Clean up on unmount
  }, []);

  // Calculate the quizzes to display on the current page
  const indexOfLastNews = currentPage * newsPerPage;
  const indexOfFirstNews = indexOfLastNews - newsPerPage;
  const currentNews = data.slice(indexOfFirstNews, indexOfLastNews);

  // Calculate total pages
  const totalPages = Math.ceil(data.length / newsPerPage);

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
                currentNews.map((announcements) => (
                  <div key={announcements._id} className="card">
                    <h3>{announcements.title}</h3>
                    <p><strong>Description:</strong> {announcements.description}</p>
                    <p><strong>Date:</strong> {new Date(announcements.date).toLocaleDateString('en-GB')}</p>
                 {/*   <p className="card-date"> {new Date(news.date).toLocaleDateString('en-GB')}</p>*/}
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
    id: 1,
    titleNew: "",
    description: "",
    date: "",
  },
];

export const LatestNewStd = () => {
  const [data, setData] = useState(initialData);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = data.filter((item) =>
    item.titleNew.toLowerCase().includes(searchTerm.toLowerCase())
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
                  <th>New Title</th>
                  <th>Description</th>
                  <th>date</th>
                </tr>
              </thead>
              <tbody>
                {currentRows.map((row) => (
                  <tr key={row.id}>
                    <td>{row.titleNew}</td>
                    <td>{row.description}</td>
                    <td>{row.date}</td>
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