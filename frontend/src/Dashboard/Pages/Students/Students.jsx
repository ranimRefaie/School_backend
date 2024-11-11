import { useState, useEffect } from "react";
import { Sidebar } from "../../Components/Sidebar/Sidebar";
import "./Students.css";
import { GoArrowLeft } from "react-icons/go";
import { GoArrowRight } from "react-icons/go";
import { MdAdd } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";
import axios from "axios";
import useAuth from "../../../Components/useAuth";
import { ClipLoader } from "react-spinners"; 


const Students = () => {
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
  const [formValues, setFormValues] = useState({
    username: "",
    Password: "",
    fullName: "",
    fathersName: "",
    mothersName: "",
    sclass: "",
    sex: "",
    mobileNumber: ""
  });
  
const fetchStudents = async () => {
      try {
        setLoading(true); 
        const response = await axios.get('http://localhost:4000/api/students'); // Ensure the URL is correct
        setData(response.data);
      } catch (error) {
        console.error('Error fetching students:', error);
      }
      finally {
        setLoading(false);
      }
    };
  useEffect(() => {
    
    fetchStudents();
   
  }, []);
  useAuth();

  const handleAdd = async () => {
    for (const key in formValues) {
      if (formValues[key] === "") {
        setErrorMessage(`Please fill in the ${capitalize(key.replace(/([A-Z])/g, ' $1'))} field.`);
        return;
      }
    }
    if (!['Male', 'Female'].includes(formValues.sex)) {
      setErrorMessage("Please select Male or Female for sex."); 
      return;
    }
  
    try {
      const response = await axios.post('http://localhost:4000/api/student', formValues);
      setData([...data, response.data.student]);
      await fetchStudents();

      setShowAddForm(false);
      setFormValues({ username: "", Password: "", fullName: "", fathersName: "", mothersName: "", sclass: "", sex: "", mobileNumber: "" });
      setMessage("Student Added successfully!"); 
      setTimeout(() => setMessage(""), 5000); 
     
    } catch (error) {
      console.error('Error adding student:', error);
    }
  };

  const handleEdit = (id) => {
    const studentToEdit = data.find((item) => item._id === id); // Use _id for matching

    if (studentToEdit) {
      setFormValues({
        username: studentToEdit.username,
        Password: studentToEdit.Password, 
        fullName: studentToEdit.fullName,
        fathersName: studentToEdit.fathersName, 
        mothersName: studentToEdit.mothersName, 
        sclass: studentToEdit.sclass, 
        sex: studentToEdit.sex,
        mobileNumber: studentToEdit.mobileNumber 
      });

      setEditItemId(studentToEdit._id);
      setShowEditForm(true);
    }
  };


const handleSaveEdit = async () => {
  for (const key in formValues) {
    if (formValues[key] === "") {
      setErrorMessage(`Please fill in the ${capitalize(key.replace(/([A-Z])/g, ' $1'))} field.`);
      return;
    }
  }
  if (!['Male', 'Female'].includes(formValues.sex)) {
    setErrorMessage("Please select Male or Female for sex."); 
    return;
  }
  try {
    const response = await axios.patch(`http://localhost:4000/api/student/${editItemId}`, formValues);
    setData((prevData) =>
      prevData.map((item) =>
        item._id === editItemId ? { ...item, ...response.data.updatedStudent } : item
      )
    );
    await fetchStudents();
    setShowEditForm(false);
    setEditItemId(null);
    setFormValues({
      username: "",
      Password: "",
      fullName: "",
      fathersName: "",
      mothersName: "",
      sclass: "",
      sex: "",
      mobileNumber: ""
    });
    setMessage("Student Updated successfully!"); // Set success message
    setTimeout(() => setMessage(""), 5000); // Clear message after 3 seconds
  } catch (error) {
    console.error('Error updating student:', error);
  }
};

  const handleDelete = async () => {
    try {
      await Promise.all(selectedRows.map(id => axios.delete(`http://localhost:4000/api/student/${id}`)));
      setData(data.filter((item) => !selectedRows.includes(item._id))); // Filter out deleted students
      setSelectedRows([]);
      setMessage("Student(s) deleted successfully!"); // Set success message
      setTimeout(() => setMessage(""), 3000); // Clear message after 3 seconds
    } catch (error) {
      console.error('Error deleting students:', error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleSelectRow = (id) => {
    setSelectedRows((prevSelectedRows) =>
      prevSelectedRows.includes(id)
        ? prevSelectedRows.filter((rowId) => rowId !== id) // Deselect if already selected
        : [...prevSelectedRows, id] // Select if not already selected
    );
  };
  const handleAddFormOpen = () => {
    setShowAddForm(true);
    setShowEditForm(false); // Ensure the edit form is closed
    setFormValues({
      username: "",
      Password: "",
      fullName: "",
      fathersName: "",
      mothersName: "",
      sclass: "",
      sex: "",
      mobileNumber: ""
    }); // Reset form values
  };

  const filteredData = data.filter((item) =>
    item.fullName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredData.slice(indexOfFirstRow, indexOfLastRow);
  const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

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
           {/* Display message */}
         {message && <div className="message">{message}</div>}
          <div className="flex item-center" style={{ gap: "10px" }}>
            <span>
              Records {indexOfFirstRow + 1} to{" "}
              {Math.min(indexOfLastRow, filteredData.length)} of{" "}
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
            <div className="popup-content">
              <form className="flex">
                {Object.keys(formValues).map((key) => (
                  <div className="group-input" key={key}>
                  <label htmlFor={key}>{capitalize(key.replace(/([A-Z])/g, ' $1'))} {key !== 'sex' && <span style={{ color: 'red' }}>*</span>}</label>
                  {key === 'sex' ? (
      <div>
        <label>
          <input
            type="radio"
            name="sex"
            value="Male"
            checked={formValues.sex === 'Male'}
            onChange={handleInputChange}
          />
          Male  
        </label>
        <label>
          <input
            type="radio"
            name="sex"
            value="Female"
            checked={formValues.sex === 'Female'}
            onChange={handleInputChange}
          />
          Female
        </label>
      </div>
    ) : (
      <input
        type={key === "Password" ? "password" : "text"}
        id={key}
        name={key}
        value={formValues[key]}
        onChange={handleInputChange}
      />
    )}
                  </div>
                  
                ))}
                {/* Display error message */}
         {errorMessage && <div className="error-message">{errorMessage}</div>}
              </form>
              <div className="group-btn-form">
                <button className="btn-save" type="button" onClick={handleAdd}>
                  Save
                </button>
                <button type="button" onClick={() => setShowAddForm(false)}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {showEditForm && (
          <div className="popup-overlay">
            <div className="popup-content">
              <form className="flex">
                {Object.keys(formValues).map((key) => (
                  <div className="group-input" key={key}>
    <label htmlFor={key}>{capitalize(key.replace(/([A-Z])/g, ' $1'))}  {key !== 'sex' && <span style={{ color: 'red' }}>*</span>} </label>
    {key === 'sex' ? (
      <div>
        <label>
          <input
            type="radio"
            name="sex"
            value="Male"
            checked={formValues.sex === 'Male'}
            onChange={handleInputChange}
          />
          Male
        </label>
        <label>
          <input
            type="radio"
            name="sex"
            value="Female"
            checked={formValues.sex === 'Female'}
            onChange={handleInputChange}
          />
          Female
        </label>
      </div>
    ) : (
      <input
        type={key === "Password" ? "password" : "text"}
        id={key}
        name={key}
        value={formValues[key]}
        onChange={handleInputChange}
      />
    )}
                  </div>
                ))}
                {/* Display error message */}
         {errorMessage && <div className="error-message">{errorMessage}</div>}
              </form>
              <div className="group-btn-form">
                <button className="btn-save" type="button" onClick={handleSaveEdit}>
                  Update
                </button>
                <button type="button" onClick={() => setShowEditForm(false)}>
                  Cancel
                </button>
              </div>
            </div>
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
              <th>Username</th>
              <th>Password</th>
              <th>Full Name</th>
              <th>Father Name</th>
              <th>Mother Name</th>
              <th>Class</th>
              <th>Sex</th>
              <th>Phone Number</th>
            </tr>
          </thead>
          <tbody>
            {currentRows.map((row) => (
              <tr key={row._id}>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedRows.includes(row._id)}
                    onChange={() => handleSelectRow(row._id)}
                  />
                </td>
                <td>
                  <button className="btn-tbl" onClick={() => handleEdit(row._id)}>
                    <FaRegEdit />
                  </button>
                </td>
                <td>{row.username}</td>
                <td>{row.Password}</td>
                <td>{row.fullName}</td>
                <td>{row.fathersName}</td>
                <td>{row.mothersName}</td>
                <td>{row.sclass}</td>
                <td>{row.sex}</td>
                <td>{row.mobileNumber}</td>
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
                  Math.min(prev + 1, Math.ceil(filteredData.length / rowsPerPage))
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

export default Students;













