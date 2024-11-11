import { useState, useEffect } from "react";
import axios from "axios";
import "../Students/Students";
import { Sidebar } from "../../Components/Sidebar/Sidebar";
import { GoArrowLeft } from "react-icons/go";
import { GoArrowRight } from "react-icons/go";
import { MdAdd } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";
import useAuth from "../../../Components/useAuth";
import { ClipLoader } from "react-spinners"; 



export const Absence = () => {
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
  const [students, setStudents] = useState([]); // New state for students
  const [filteredStudents, setFilteredStudents] = useState([]); 
  const [formValues, setFormValues] = useState({
    id: null,
    fullName: "",
    type: "",    
    date: new Date().toISOString().substring(0, 10),
  });


  const fetchAbsences = async () => {
    try {
      setLoading(true); 
      const response = await axios.get('http://localhost:4000/api/absences');
      console.log("Fetched absences:", response.data); // Log the fetched absences
      setData(response.data);
    } catch (error) {
      console.error("Error fetching absences:", error);
      setErrorMessage("Failed to load absences.");
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
    fetchAbsences();
    fetchStudents();
  }, []);


  const handleAdd = async () => {
    if (!formValues.fullName  || !formValues.type || !formValues.date) {
      setErrorMessage("All fields are required.");
      setTimeout(() => setErrorMessage(""), 5000);
      return;
    }
    if (!['Excused', 'Unexcused'].includes(formValues.type)) {
      setErrorMessage("Please Select the Absence Pattern."); 
      return;
    }

    try{
      const response = await axios.post('http://localhost:4000/api/absence', formValues);
      setData([...data, response.data.absence]);
      await fetchAbsences();
      setShowAddForm(false);
    setFormValues({
      id: null,
      fullName: "",
      type: "",    
      date: new Date().toISOString().substring(0, 10),
    }); 
    setMessage("Absence Added successfully!");
      setTimeout(() => setMessage(""), 5000);
    } catch (error) {
      console.error('Error adding Absence:', error);
    }
  };


  const handleEdit = (id) => {
    const absenceToEdit = data.find((item) => item._id === id);
  console.log(absenceToEdit); // Check the structure of the absence object

    if (absenceToEdit) {
      setFormValues({
        id: absenceToEdit._id,
        fullName: absenceToEdit.studentId.fullName,
        type: absenceToEdit.type,
        date: new Date(absenceToEdit.date).toISOString().substring(0, 10),
      });

      setEditItemId(id);
      setShowEditForm(true);
    }
  };

  const handleSaveEdit = async () => {
    if (!formValues.fullName  || !formValues.type || !formValues.date) {
      setErrorMessage("All fields are required.");
      setTimeout(() => setErrorMessage(""), 5000);
      return;
    }
    if (!['Excused', 'Unexcused'].includes(formValues.type)) {
      setErrorMessage("Please Select the Absence Pattern."); 
      return;
    }
    try{
      const response = await axios.patch(`http://localhost:4000/api/absence/${editItemId}`, formValues);
      setData((prevData) =>
        prevData.map((item) =>
          item._id === editItemId ? response.data.updatedAbcense : item
    )
      );
      await fetchAbsences();
      setFormValues({
       id: null,
      fullName: "",
      type: "",    
      date: new Date().toISOString().substring(0, 10),
      });
  
      setShowEditForm(false);
      setEditItemId(null);
      setMessage("Absence updated successfully!");
      setTimeout(() => setMessage(""), 5000);
    } catch (error) {
      console.error("Error updating Absence:", error);
      setErrorMessage("Failed to update Absence.");
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
      await Promise.all(selectedRows.map(id => axios.delete(`http://localhost:4000/api/absence/${id}`)));
      setData(data.filter(item => !selectedRows.includes(item._id)));
      setSelectedRows([]);
      setMessage("Absence(s) deleted successfully!");
    } catch (error) {
      console.error("Error deleting absences:", error);
      setErrorMessage("Failed to delete Absence(s).");
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
      type: "",    
      date: new Date().toISOString().substring(0, 10),
    });
  };
  useAuth();


  const filteredData = data.filter((item) =>
    item.studentId && item.studentId.fullName && 
    item.studentId.fullName.toLowerCase().includes(searchTerm.toLowerCase())
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
              value_1={formValues.type === "Excused"}
              value_2={formValues.type === "Unexcused"}
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
              students={filteredStudents}
              value_1={formValues.type === "Excused"}
              value_2={formValues.type === "Unexcused"}
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
              <th>Date</th>
              <th>Absence Pattern</th>
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
                  <button
                    className="btn-tbl"
                    onClick={() => {console.log("Editing ID:", row._id); handleEdit(row._id);}}
                  >
                    <FaRegEdit />
                  </button>
                </td>
                <td>{row.studentId ? row.studentId.fullName : 'Unknown Student'}</td> {/* Safeguard */}
                <td>{new Date(row.date).toLocaleDateString()}</td>
                <td>{row.type}</td>
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

const PopUp = ({
  fun,
  date,
  fullName,
  value_1,
  value_2,
  click_1,
  click_2,
  errorMessage
}) => {
  // const dataInput=[{id:1,name:'Full Name', nameInput:'fullName',type:'text',value:{value_1}},
  // {id:1,name:'Date', nameInput:'date',type:'date',value:{value_2}},
  // {id:1,name:'Absence Pattern', nameInput:'absencePattern',type:'radio',value:{value_3}}]
  return (
    <div className="popup-content">
      <form className="flex">
        <div className="group-input">
          <label htmlFor="fullName">Full Name</label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={fullName}
            onChange={fun}
            required
          />
        </div>
        <div className="group-input">
          <label htmlFor="date">Date</label>
          <input
            type="date"
            id="date"
            name="date"
            value={date}
            onChange={fun}
            required
          />
        </div>

        <div className="group-input">
          <label htmlFor="type">Absence Pattern</label>
          <label htmlFor="Excused">
            <input
              type="radio"
              id="Excused"
              name="type"
              value="Excused"
              checked= {value_1}
              onChange={fun}
            />
            Excused
          </label>

          <label htmlFor="Unexcused">
            <input
              type="radio"
              id="Unexcused"
              name="type"
              value="Unexcused"
              checked={value_2}
              onChange={fun}
            />
            Unexcused
          </label>
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
