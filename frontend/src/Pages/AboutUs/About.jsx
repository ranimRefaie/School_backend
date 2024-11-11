import "./About.css";
import NavBar from "../../Components/NavBar/NavBar";
import AboutUs from "../../Components/Sections/AboutUs/AboutUs";
import JoinUs from "../../Components/Sections/JoinUs/JoinUs";
import { Footer } from "../../Components/Footer/Footer";
import vision from "../../assets/vision.png";
import message from "../../assets/email.png";
export const About = () => {
  return (
    <div>
      <NavBar />
      <AboutUs />
      <div className="vision sec-about flex container between">
        <div className="">
          <img src={vision} alt="" />
        </div>

        <div className="content-vision">
          <h3>Our Vision </h3>
          <p>
          Our school strives to achieve an inclusive educational environment that supports the development of students' life skills and academic abilities.
           We believe that education is not limited to the transfer of knowledge;
            it also involves promoting human and social values
          </p>
        </div>
      </div>

      <div className="sec-about flex container between">
        <div className="content-message">
          <h3>Our Mission </h3>
          <ul>
        <li>Developing the fundamental skills of students</li>
        <li>Providing programs to nurture talent and using modern technology methods</li>
        <li>Continuous professional development for teachers and staff</li>
        <li>Instilling sound values and ethics in the students</li>
          </ul>
        </div>

        <div className="">
          <img src={message} alt="" />
        </div>
      </div>
      <JoinUs />
      <Footer />
    </div>
  );
};
