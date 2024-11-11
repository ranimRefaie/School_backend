import img_about from "../../../assets/about.png";
import "./AboutUs.css";
const AboutUs = () => {
  return (
    <div className="about-us">
      <div className="container-about">
        <p>
          We are an educational institution striving to provide an inspiring and motivating learning environment that combines innovation and modern technology.
           Our goal is to develop students' academic and social skills through a comprehensive and effective curriculum that focuses on critical thinking and creativity. Join us on our journey toward building a bright future
        </p>
      </div>
      <div className="container-about">
        <img src={img_about} alt="" />
      </div>
    </div>
  );
};

export default AboutUs;
