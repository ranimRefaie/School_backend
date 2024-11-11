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



export const LatestNews = () => {
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
        id: null,
        title: "",
        description: "",
        date: new Date().toISOString().substring(0, 10), // Default to today's date    
    });

    const fetchAnnouncements = async () => {
      try {
        setLoading(true); 
        const response = await axios.get('http://localhost:4000/api/announcements'); // Ensure the URL is correct
        setData(response.data);
      } catch (error) {
        console.error('Error fetching Announcements:', error);
      }
      finally {
        setLoading(false);
      }
    };

    useEffect(() => {
      fetchAnnouncements();
    }, []);


    const handleAdd = async () => {
      if (!formValues.title || !formValues.description || !formValues.date) {
        setErrorMessage("All fields are required.");
        setTimeout(() => setErrorMessage(""), 5000);
        return;
      }

      try {
        const response = await axios.post('http://localhost:4000/api/announcement', formValues);
        setData([...data, response.data.announcement]);
        await fetchAnnouncements();
        setShowAddForm(false);
        setFormValues({
          id: null,
          title: "",
          description: "",
          date: new Date().toISOString().substring(0, 10),
        });
        setMessage("Announcement Added successfully!");
        setTimeout(() => setMessage(""), 5000);
      } catch (error) {
        console.error('Error adding Announcement:', error);
      }
    };


    const handleEdit = (id) => {
      const announcementToEdit = data.find((item) => item._id === id);
      if (announcementToEdit) {
        setFormValues({
          title: announcementToEdit.title,
          description: announcementToEdit.description,
          date: new Date(announcementToEdit.date).toISOString().substring(0, 10),
        });
        setEditItemId(id);
        setShowEditForm(true);
      }
    };
  
    const handleSaveEdit = async () => {
      if (!formValues.title || !formValues.description || !formValues.date) {
        setErrorMessage("All fields are required.");
        setTimeout(() => setErrorMessage(""), 5000);
        return;
      }
  
      try {
        const response = await axios.patch(`http://localhost:4000/api/announcement/${editItemId}`, formValues);
        setData((prevData) =>
          prevData.map((item) =>
            item._id === editItemId ? response.data.updatedannouncemnt : item
          )
        );
        await fetchAnnouncements();
        setFormValues({
          id: null,
          title: "",
          description: "",
          date: new Date().toISOString().substring(0, 10),
        });
        setShowEditForm(false);
        setEditItemId(null);
        setMessage("Announcement updated successfully!");
        setTimeout(() => setMessage(""), 5000);
      } catch (error) {
        console.error("Error updating Announcement:", error);
        setErrorMessage("Failed to update Announcement.");
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
        await Promise.all(selectedRows.map(id => axios.delete(`http://localhost:4000/api/announcement/${id}`)));
        setData(data.filter(item => !selectedRows.includes(item._id)));
        setSelectedRows([]);
        setMessage("Announcement(s) deleted successfully!");
      } catch (error) {
        console.error("Error deleting announcements:", error);
        setErrorMessage("Failed to delete announcement(s).");
      }
    };
  
    const handleSearch = (e) => {
      setSearchTerm(e.target.value);
      setCurrentPage(1);
    };

    const handleAddFormOpen = () => {
      setShowAddForm(true);
      setShowEditForm(false);
      setFormValues({
        id: null,
        title: "",
        description: "",
        date: new Date().toISOString().substring(0, 10),
      });
    };
    useAuth();

  
    const filteredData = data.filter((item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase())
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
                <th>Title</th>
                <th>Description</th>
                <th>date</th>
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
                  <td>{row.title}</td>
                  <td>{row.description}</td>
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
    title,
    description,
    date,
    click_1,
    click_2,
    errorMessage
  }) => {
    
    
    return (
      <div className="popup-content">
        <form className="flex">
          <div className="group-input">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={title}
              onChange={fun}
              required
            />
          </div>
          <div className="group-input">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              id="description"
              name="description"
              value={description}
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
  