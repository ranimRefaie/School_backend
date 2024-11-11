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



export const Behavioral = () => {
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
        type: "",
        note: "",
        date: new Date().toISOString().substring(0, 10),
    });


    const fetchBnotes = async () => {
        try {
          setLoading(true); 
          const response = await axios.get('http://localhost:4000/api/notes');
          console.log("Fetched behavioral notes:", response.data); 
          setData(response.data);
        } catch (error) {
          console.error("Error fetching behavioral notes:", error);
          setErrorMessage("Failed to load behavioral notes.");
        }
        finally {
          setLoading(false);
        }
      };
    
      const fetchStudents = async () => {
        try {
          const response = await axios.get('http://localhost:4000/api/students'); 
          setStudents(response.data);
        } catch (error) {
          console.error("Error fetching students:", error);
        }
      };
    
      useEffect(() => {
        fetchBnotes();
        fetchStudents();
      }, []);

    
  const handleAdd = async () => {
    if (!formValues.fullName  || !formValues.type || !formValues.type || !formValues.date) {
      setErrorMessage("All fields are required.");
      setTimeout(() => setErrorMessage(""), 5000);
      return;
    }
    if (!['Positive', 'Negative'].includes(formValues.type)) {
      setErrorMessage("Please Select the Behavioral Note Type."); 
      return;
    }

    try{
      const response = await axios.post('http://localhost:4000/api/note', formValues);
      setData([...data, response.data.Behavioralnote]);
      await fetchBnotes();
      setShowAddForm(false);
    setFormValues({
        id: null,
        fullName: "",
        type: "",
        note: "",
        date: new Date().toISOString().substring(0, 10),
    }); 
    setMessage("Behavioral Note Added successfully!");
      setTimeout(() => setMessage(""), 5000);
    } catch (error) {
      console.error('Error adding Behavioral Note:', error);
    }
  };


  const handleEdit = (id) => {
    const noteToEdit = data.find((item) => item._id === id);

    if (noteToEdit) {
      setFormValues({
        id: noteToEdit._id,
        fullName: noteToEdit.studentId.fullName,
        type: noteToEdit.type,
        note: noteToEdit.note,
        date: new Date(noteToEdit.date).toISOString().substring(0, 10),
      });

      setEditItemId(id);
      setShowEditForm(true);
    }
  };

  const handleSaveEdit = async () => {
    if (!formValues.fullName  || !formValues.type || !formValues.type || !formValues.date) {
        setErrorMessage("All fields are required.");
        setTimeout(() => setErrorMessage(""), 5000);
        return;
      }
      if (!['Positive', 'Negative'].includes(formValues.type)) {
        setErrorMessage("Please Select the Behavioral Note Type."); 
        return;
      }
  
    try{
      const response = await axios.patch(`http://localhost:4000/api/note/${editItemId}`, formValues);
      setData((prevData) =>
        prevData.map((item) =>
          item._id === editItemId ? response.data.updatedNote : item
    )
      );
      await fetchBnotes();
      setFormValues({
       id: null,
      fullName: "",
      type: "",    
      note: "",
      date: new Date().toISOString().substring(0, 10),
      });
  
      setShowEditForm(false);
      setEditItemId(null);
      setMessage("Behavioral Note updated successfully!");
      setTimeout(() => setMessage(""), 5000);
    } catch (error) {
      console.error("Error updating Behavioral Note:", error);
      setErrorMessage("Failed to update Behavioral Note.");
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
          await Promise.all(selectedRows.map(id => axios.delete(`http://localhost:4000/api/note/${id}`)));
          setData(data.filter(item => !selectedRows.includes(item._id)));
          setSelectedRows([]);
          setMessage("Behavioral Note(s) deleted successfully!");
        } catch (error) {
          console.error("Error deleting Behavioral Note:", error);
          setErrorMessage("Failed to delete Behavioral Note(s).");
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
          note: "",
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
                            students={filteredStudents}
                            value_1={formValues.type === "Negative"}
                            value_2={formValues.type === "Positive"}
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
                           value_1={formValues.type === "Negative"}
                           value_2={formValues.type === "Positive"}
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
                            <th>Type</th>
                            <th>Note</th>
                            <th>Date</th>

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
                                        onClick={() => handleEdit(row._id)}
                                    >
                                        <FaRegEdit />
                                    </button>
                                </td>
                                <td>{row.studentId.fullName}</td>
                                <td>{row.type}</td>
                                <td>{row.note}</td>
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

const PopUp = ({
    fun,
    date,
    fullName,
    note,
    value_1,
    value_2,
    click_1,
    click_2,
    errorMessage
}) => {


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
                    />
                </div>
                <div className="group-input">
                    <label htmlFor="note">Note</label>
                    <input
                        type="text"
                        id="note"
                        name="note"
                        value={note}
                        onChange={fun}
                    />
                </div>

                <div className="group-input">
                    <label htmlFor="type">Type</label>
                    <label htmlFor="Negative">
                        <input
                            type="radio"
                            id="Negative"
                            name="type"
                            value="Negative"
                            checked={value_1}
                            onChange={fun}
                        />
                        Negative
                    </label>

                    <label htmlFor="Positive">
                        <input
                            type="radio"
                            id="Positive"
                            name="type"
                            value="Positive"
                            checked={value_2}
                            onChange={fun}
                        />
                        Positive
                    </label>
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
