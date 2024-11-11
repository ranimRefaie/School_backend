
import NavBar from "../../Components/NavBar/NavBar";
import { Footer } from "../../Components/Footer/Footer";
import "./ContactUs.css";
import { FaLocationDot } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { useState } from "react";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import toast styles
import ClipLoader from "react-spinners/ClipLoader"; // Importing spinner

export const ContactUs = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: ""
    });
    const [loading, setLoading] = useState(false); // Loading state

    const info = [
        {
            id: 1,
            title: "Location",
            icon_1: <FaLocationDot size={25} />,
            des_1: "Syria - Damascus",
            des_2: "",
        },
        {
            id: 2,
            title: "Email",
            icon_1: <MdEmail size={25} />,
            des_1: "futuretypicalschool123@gmail.com",
            des_2: "",
        },
        {
            id: 3,
            title: "Phone Number",
            icon_1: <FaPhoneAlt size={25} />,
            icon_2: <FaPhoneAlt size={25} />,
            des_1: "011-6335944",
            des_2: "+96395656448",
        },
    ];

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Set loading to true
        try {
            const response = await fetch("http://localhost:4000/api/send-email", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            setLoading(false); // Set loading to false

            if (response.ok) {
                toast.success("Email sent successfully!");
            } else {
                toast.error("Failed to send email. Please try again.");
            }
        } catch (error) {
            setLoading(false); // Set loading to false
            toast.error("Error sending email.");
        }
    };

    return (
        <div>
            <NavBar />
            <div className="contact-us container">
                <div className="info-contact flex">
                    {info.map((item) => (
                        <div className="card-info" key={item.id}>
                            <span className="icon-card ">{item.icon_1}</span>
                            <div className="desc-contact">
                                <p>{item.des_1}</p>
                                <p>{item.des_2}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <form className="form-contact" onSubmit={handleSubmit}>
                    <div className="group-input flex">
                        <input
                            type="text"
                            name="name"
                            placeholder="Name"
                            value={formData.name}
                            onChange={handleChange}
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>
                    <input
                        type="text"
                        name="subject"
                        placeholder="Subject"
                        value={formData.subject}
                        onChange={handleChange}
                    />
                    <textarea
                        name="message"
                        placeholder="Message"
                        rows="8"
                        value={formData.message}
                        onChange={handleChange}
                    ></textarea>
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
