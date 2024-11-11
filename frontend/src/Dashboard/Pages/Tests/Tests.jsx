import "../Students/Students";
import { useState, useEffect } from "react";
import axios from "axios";
import { Sidebar } from "../../Components/Sidebar/Sidebar";
import { GoArrowLeft } from "react-icons/go";
import { GoArrowRight } from "react-icons/go";
import { MdAdd } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";
import useAuth from "../../../Components/useAuth";
import { ClipLoader } from "react-spinners"; 



const subjects = [
  "Math", "Science", "Chemistry", "Physics", 
  "English", "Arabic", "French", "History", 
  "Geography", "Robotics"
];

const testNames = ["MidTerm", "Finals"];

export const Tests = () => {
    const [data, setData] = useState([]);
    const [message, setMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(true); 
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage] = useState(10);
    const [selectedRows, setSelectedRows] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [showAddForm, setShowAddForm] = useState(false);
    const [showEditForm, setShowEditForm] = useState(false);
    const [editItemId, setEditItemId] = useState(null);
    const [students, setStudents] = useState([]);
    const [filteredStudents, setFilteredStudents] = useState([]);
    const [formValues, setFormValues] = useState({
      id: null,
      fullName: "",
      testName: "",
      subject: "",
      mark: "",
      totalMark: "",
      date: new Date().toISOString().substring(0, 10), // Default to today's date
    });

    const fetchTests = async () => {
      try {
        setLoading(true); 
        const response = await axios.get('http://localhost:4000/api/tests');
        setData(response.data);
      } catch (error) {
        console.error("Error fetching tests:", error);
        setErrorMessage("Failed to load tests.");
      }
      finally {
        setLoading(false);
      }
    };
  
    const fetchStudents = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/students'); // Adjust API endpoint accordingly
        setStudents(response.data);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };
  
    useEffect(() => {
      fetchTests();
      fetchStudents();
    }, []);
  
    const handleAdd = async () => {
      if (!formValues.fullName || !formValues.testName || !formValues.subject || !formValues.mark || !formValues.totalMark || !formValues.date) {
        setErrorMessage("All fields are required.");
        setTimeout(() => setErrorMessage(""), 5000);
        return;
      }
  
      if (Number(formValues.mark) > Number(formValues.totalMark)) {
        setErrorMessage("Mark must be less than or equal to Total Mark.");
        setTimeout(() => setErrorMessage(""), 5000);
        return;
      }

      try{
        const response = await axios.post('http://localhost:4000/api/test', formValues);
        setData([...data, response.data.test]); 
        await fetchTests();
        setShowAddForm(false);

      setFormValues({
        id: null,
        fullName: "",
        testName: "",
        subject: "",
        mark: "",
        totalMark: "",
        date: new Date().toISOString().substring(0, 10),
      });
      setMessage("Test Added successfully!");
      setTimeout(() => setMessage(""), 5000);
    } catch (error) {
      console.error('Error adding Test:', error);
    }
      
    };
    const handleEdit = (id) => {
      const testToEdit = data.find((item) => item._id === id);
  
      if (testToEdit) {
        setFormValues({
          id: testToEdit.id,
          fullName: testToEdit.studentId.fullName,
          testName: testToEdit.testName,
          subject: testToEdit.subject,
          mark: testToEdit.mark,
          totalMark: testToEdit.totalMark,
          date: new Date(testToEdit.date).toISOString().substring(0, 10),
        });
  
        setEditItemId(id);
        setShowEditForm(true);
      }
    };
  
    const handleSaveEdit = async () => {
      if (!formValues.fullName || !formValues.testName || !formValues.subject || !formValues.mark || !formValues.totalMark || !formValues.date) {
        setErrorMessage("All fields are required.");
        setTimeout(() => setErrorMessage(""), 5000);
        return;
      }
  
      if (Number(formValues.mark) > Number(formValues.totalMark)) {
        setErrorMessage("Mark must be less than or equal to Total Mark.");
        setTimeout(() => setErrorMessage(""), 5000);
        return;
      }
      try{
        const response = await axios.patch(`http://localhost:4000/api/test/${editItemId}`, formValues);
        setData((prevData) =>
          prevData.map((item) =>
            item.id === editItemId ?  response.data.updatedTest : item
          )
        );
        await fetchTests();
        setFormValues({
          id: null,
          fullName: "",
          testName: "",
          subject: "",
          mark: "",
          totalMark: "",
          date: new Date().toISOString().substring(0, 10),
        });
    
        setShowEditForm(false);
        setEditItemId(null);
        setMessage("Test updated successfully!");
      setTimeout(() => setMessage(""), 5000);
    } catch (error) {
      console.error("Error updating test:", error);
      setErrorMessage("Failed to update test.");
    }

      
    };
  
    const handleInputChange = (event) => {
      const { name, value } = event.target;
      setFormValues({ ...formValues, [name]: value });
    };
  
    const handleSelectRow = (id) => {
      setSelectedRows((prev) =>
        prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
      );
    };
  
    const handleDelete = async () => {
      try {
        await Promise.all(selectedRows.map(id => axios.delete(`http://localhost:4000/api/test/${id}`)));
        setData(data.filter(item => !selectedRows.includes(item._id)));
        setSelectedRows([]);
        setMessage("Test(s) deleted successfully!");
      } catch (error) {
        console.error("Error deleting tests:", error);
        setErrorMessage("Failed to delete test(s).");
      }
    };
  
    const handleSearch = (e) => {
      setSearchTerm(e.target.value);
      setCurrentPage(1);
      const filtered = students.filter(student => 
        student.fullName.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setFilteredStudents(filtered);
    };

    const handleAddFormOpen = () => {
      setShowAddForm(true);
      setShowEditForm(false);
      setFormValues({
        id: null,
        fullName: "",
        testName: "",
        subject: "",
        mark: "",
        totalMark: "",
        date: new Date().toISOString().substring(0, 10),
      });
    };
      useAuth();

  
    const filteredData = data.filter((item) =>
      item.studentId && item.studentId.fullName && item.studentId.fullName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentRows = filteredData.slice(indexOfFirstRow, indexOfLastRow);
    return (
      <div className="flex">
        <Sidebar />
        <div className="page-student">
          <h1>Future Typical School</h1>
          <div className="row-table flex">
            <input
              type="text"
              placeholder="Search by name..."
              value={searchTerm}
              onChange={handleSearch}
              className="input-search"
            />
             {message && <div className="message">{message}</div>}
  
            <div className=" flex item-center" style={{ gap: "10px" }}>
              <span>
                Records {indexOfFirstRow + 1} to{" "}
                {Math.min(indexOfLastRow, filteredData.length)} of
                {filteredData.length}
              </span>
              <button className="btn-tbl" onClick={handleAddFormOpen}>
                <MdAdd /> Add
              </button>
              {selectedRows.length > 0 && (
                <button onClick={handleDelete} className="btn-del">
                  <MdOutlineDelete size={25} />
                </button>
              )}
            </div>
          </div>
          {showAddForm && (
          <div className="popup-overlay">
            <PopUp
              fun={handleInputChange}
              {...formValues}
              students={filteredStudents} // Pass filtered students for autocomplete
              testNames={testNames}
              subjects={subjects}
              click_1={handleAdd}
              click_2={() => setShowAddForm(false)}
              errorMessage={errorMessage}
            />
          </div>
        )}
  
  {showEditForm && (
          <div className="popup-overlay">
            <PopUp
              fun={handleInputChange}
              {...formValues}
              students={filteredStudents} // Pass filtered students for autocomplete
              testNames={testNames}
              subjects={subjects}
              click_1={handleSaveEdit}
              click_2={() => setShowEditForm(false)}
              errorMessage={errorMessage}
            />
          </div>
          )}

{loading ? (
        <div className="spinner-container">
          <ClipLoader color="#010133cc" loading={loading} size={50} /> 
          </div>
      ) : (
          <table>
            <thead>
              <tr>
                <th></th>
                <th></th>
                <th>Full Name</th>
                <th>Test Type</th>
                <th>Subject</th>
                <th>Mark</th>
                <th>Total Mark</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {currentRows.map((row) => (
                <tr key={row.id}>
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedRows.includes(row._id)}
                      onChange={() => handleSelectRow(row._id)}
                    />
                  </td>
                  <td>
                    <button
                      className="btn-tbl"
                      onClick={() => handleEdit(row._id)}
                    >
                      <FaRegEdit />
                    </button>
                  </td>
                  <td>{row.studentId.fullName}</td>
                  <td>{row.testName}</td>
                  <td>{row.subject}</td>
                  <td>{row.mark}</td>
                  <td>{row.totalMark}</td>
                  <td>{new Date(row.date).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
          )}
  
          <div className="row-table flex">
            <div className="group-btn-table flex">
              <button
                className="btn-tbl"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              >
                <GoArrowLeft />
              </button>
              <button
                className="btn-tbl"
                onClick={() =>
                  setCurrentPage((prev) =>
                    Math.min(
                      prev + 1,
                      Math.ceil(filteredData.length / rowsPerPage)
                    )
                  )
                }
              >
                <GoArrowRight />
              </button>
            </div>
            <span>
              Page {currentPage} of {Math.ceil(filteredData.length / rowsPerPage)}
            </span>
          </div>
        </div>
      </div>
    );
  };
  
  
const PopUp = ({ fun, date, fullName, testName, subject, mark, totalMark, click_1, click_2, errorMessage }) => {
  return (
    <div className="popup-content">
      <form className="flex">
        <div className="group-input">
          <label htmlFor="fullName">Full Name</label>
          <input type="text" id="fullName" name="fullName" value={fullName} onChange={fun} required />
        </div>
        <div className="group-input">
          <label htmlFor="testName">Test Type</label>
          <select id="testName" name="testName" value={testName} onChange={fun} required>
            <option value="">Select Test Type</option>
            <option value="MidTerm">MidTerm</option>
            <option value="Finals">Finals</option>
          </select>
        </div>
        <div className="group-input">
          <label htmlFor="subject">Subject</label>
          <select id="subject" name="subject" value={subject} onChange={fun} required>
            <option value="">Select Subject</option>
            <option value="Math">Math</option>
            <option value="Science">Science</option>
            <option value="Chemistry">Chemistry</option>
            <option value="Physics">Physics</option>
            <option value="English">English</option>
            <option value="Arabic">Arabic</option>
            <option value="French">French</option>
            <option value="History">History</option>
            <option value="Geography">Geography</option>
            <option value="Robotics">Robotics</option>
          </select>
        </div>
        <div className="group-input">
          <label htmlFor="mark">Mark</label>
          <input type="number" id="mark" name="mark" value={mark} onChange={fun} required />
        </div>
        <div className="group-input">
          <label htmlFor="totalMark">Total Mark</label>
          <input type="number" id="totalMark" name="totalMark" value={totalMark} onChange={fun} required />
        </div>
        <div className="group-input">
          <label htmlFor="date">Date</label>
          <input type="date" id="date" name="date" value={date} onChange={fun} required />
        </div>
      </form>
      <div className="group-btn-form">
        <button className="btn-save" type="button" onClick={click_1}>
          Save
        </button>
        <button type="button" onClick={click_2}>
          Cancel
        </button>
      </div>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
    </div>
  );
};
  