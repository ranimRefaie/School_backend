
import NavBar from "../../Components/NavBar/NavBar";
import { Footer } from "../../Components/Footer/Footer";
import { useState } from "react";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import ClipLoader from "react-spinners/ClipLoader"; 

export const JobApplication = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        mobile: "",
        positionType: "",

    });
    const [file, setFile] = useState(null); 

    const [loading, setLoading] = useState(false); 

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]); // Update file state
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Set loading to true
        const form = new FormData();
        form.append("name", formData.name);
        form.append("email", formData.email);
        form.append("mobile", formData.mobile);
        form.append("positionType", formData.positionType); 
        form.append("file", file); // Add the file to FormData

        try {
            const response = await fetch("http://localhost:4000/api/cv-email", {
                method: "POST",
                body: form,
            });

            setLoading(false); // Set loading to false

            if (response.ok) {
                toast.success("Job Application sent successfully!");
            } else {
                toast.error("Failed to send Job Application. Please try again.");
            }
        } catch (error) {
            setLoading(false); // Set loading to false
            toast.error("Error sending Job Application.");
        }
    };

    return (
        <div>
            <NavBar />
            <div className="contact-us container">
                
                <form className="form-contact" onSubmit={handleSubmit}>
                   
                        <input
                            type="text"
                            name="name"
                            placeholder="Name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    
                    <input
                        type="text"
                        name="mobile"
                        placeholder="Mobile Number"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                    />
                    <select
                        name="positionType"
                        value={formData.positionType}
                        onChange={handleChange}
                        required
                    >
                        <option value="" disabled selected hidden>Select Position Type</option>
                        <option value="Teaching">Teaching</option>
                        <option value="Administrative">Administrative</option>
                    </select>
                    <div className="file-upload-container">
                    <span className="file-upload-placeholder">
                        {file ? file.name : "Upload CV"}
                    </span>
                    <input
                        id="file-upload"
                        type="file"
                        onChange={handleFileChange}
                        className="file-input" // Style this to look nice alongside the placeholder
                        required
                    />
                </div>
                    
                    <button type="submit" disabled={loading}>Send</button>
                    {loading && (
                        <div className="spinner-container">
                            <ClipLoader color="#010133cc" loading={loading} size={30} />
                        </div>
                    )}
                </form>
            </div>
            <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} closeOnClick draggable pauseOnHover />
            <Footer />
        </div>
    );
};
