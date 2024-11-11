import Accordionfaq from "../../Accordionfaq/AccordionFaq";
import "./Faq.css";
import faq_img from "../../../assets/search.png";

const Faq = () => {
  return (
    <div className="faq">
      <div className="contain-faq">
        <img src={faq_img} />
      </div>
      <div className="container">
        <Accordionfaq />
      </div>
    </div>
  );
};

export default Faq;
