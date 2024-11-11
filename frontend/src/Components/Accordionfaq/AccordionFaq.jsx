import Accordion from "react-bootstrap/Accordion";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Accordionfaq.css";

function Accordionfaq() {
  const FaqData = [
    {
      id: 0,
      question: " How can I contact the school?",
      answer:
      "You can reach us by phone at 011-6335944 or email us at futuretypicalschool123@gmail.com Our office hours are 8:00 AM to 3:00 PM.",
    },
    {
      id: 1,
      question: "Does the school offer extracurricular activities?",
      answer:
       "Yes, we offer a variety of extracurricular activities, including sports, arts, and cultural activities. These activities aim to enhance social skills and foster teamwork among students.",    },
    {
      id: 2,
      question: " How can I access my child's grades online?",
      answer:
        "Parents can access their child's grades and assignments through our online portal. Login details will be provided at the start of the school year.",
    },
    {
      id: 3,
      question: " Are there parent-teacher conferences?",
      answer:
        "Yes, we hold parent-teacher conferences once a year. Specific dates will be on the Timetable in our website.",
    },
  ];
  return (
    <Accordion defaultActiveKey="0">
      {FaqData.map((item) => (
        <Accordion.Item eventKey={item.id} key={item.id}>
          <Accordion.Header>{item.question}</Accordion.Header>
          <Accordion.Body>{item.answer}</Accordion.Body>
        </Accordion.Item>
      ))}
    </Accordion>
  );
}

export default Accordionfaq;
