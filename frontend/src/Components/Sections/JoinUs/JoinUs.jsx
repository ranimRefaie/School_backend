import "./JoinUs.css";
import join from "../../../assets/join-us-2.jpg";
import { Link } from "react-router-dom";
const JoinUs = () => {
  return (
    <div className="sec-join-us container flex  item-center">
      <img src={join} alt="" />
      <div className="join-us flex flex-column gap-5">
      <h3>Are you Interested in Joining our school! </h3>
        <div className="flex flex-column gap-3">
          <p>
          If you are looking for a job opportunity to be part of the Future Model School family,
           please send your CV and fill out your details by clicking on the Apply button below.</p>
          <Link to="/Job-Application"> Apply</Link>
        </div>
      </div>
    </div>
  );
};

export default JoinUs;
