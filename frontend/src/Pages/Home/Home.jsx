import "../../index.css";
import NavBar from "../../Components/NavBar/NavBar";
import Hero from "../../Components/Sections/Hero/Hero";
import AboutUs from "../../Components/Sections/AboutUs/AboutUs";
import Faq from "../../Components/Sections/Faq/Faq";
import Media from "../../Components/Sections/Media/Media";
import JoinUs from "../../Components/Sections/JoinUs/JoinUs";
import { Footer } from "../../Components/Footer/Footer";

const Home = () => {
  return (
    <div>
      <NavBar />

      <Hero text="welcome to future typical school" />

      <AboutUs />
      <Faq />

      <Media />

      <JoinUs />

      <Footer />
    </div>
  );
};

export default Home;
