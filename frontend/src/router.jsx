import { createBrowserRouter } from "react-router-dom";
import Home_1 from "./Pages/Home/Home";
import Sign from "./Pages/Sign/Sign";
import { About } from "./Pages/AboutUs/About";
import { ContactUs } from "./Pages/ContactUs/ContactUs";
import { JobApplication } from "./Pages/JobApplication/JobApplication";
import { Timetable } from "./Pages/Timetable/Timetable";
import { Home } from "./Dashboard/Pages/Home/Home";
import Students from "./Dashboard/Pages/Students/Students";
import { Absence } from "./Dashboard/Pages/Absence/Absence";
import { Quizzes } from "./Dashboard/Pages/Quizzes/Quizzes";
import { Tests } from "./Dashboard/Pages/Tests/Tests";
import { LatestNews } from "./Dashboard/Pages/LatestNews/LatestNews";
import { Behavioral } from "./Dashboard/Pages/Behavioral/Behavioral";
import { StudentDash } from "./DashboardStd/Pages/Home/Home";
import { Attendance } from "./DashboardStd/Pages/Attendance/Attendance";
import { TestStd } from "./DashboardStd/Pages/Tests/Tests";
import { QuizzStd } from "./DashboardStd/Pages/Quizzes/Quizzes";
import { BehavioralNote } from "./DashboardStd/Pages/Behavioral/Behavioral";
import { LatestNewStd } from "./DashboardStd/Pages/LatestNew/LatestNew";
import  Profile  from "./DashboardStd/Pages/Profile/Profile";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Home_1 />,
  },

  {
    path: "/signIn",
    element: <Sign />,
  },
  {
    path: "/about-us",
    element: <About />,
  },
  {
    path: "/contact-us",
    element: <ContactUs />,
  },
  {
    path: "/Job-Application",
    element: <JobApplication />,
  },
  {
    path: "/Timetable",
    element: <Timetable />,
  },
  {
    path: "/dashboard",
    element: <Home />
    
  },

  {
    path: "/students",
    element: <Students />,
  },
  {
    path: "/absence",
    element: <Absence />,
  },
  {
    path: "/quizzes",
    element: <Quizzes />,
  },
  {
    path: "/tests",
    element: <Tests/>
  },
  {
    path: "/latest-news",
    element: <LatestNews/>
  },
  {
    path: "/behavioral",
    element: <Behavioral/>
  },
  {
    path: "/student-dash",
    element: <StudentDash />,
  },
  {
    path: "/attendance",
    element: <Attendance />,
  },
  {
    path: "/test-student",
    element: <TestStd />,
  },
  {
    path: "/quizzes-student",
    element: <QuizzStd />,
  },
  {
    path: "/behavioral-observations",
    element: <BehavioralNote />,
  },
  {
    path: "/latest-name-student",
    element: <LatestNewStd />,
  },

  {
    path: "/student-profile",
    element: <Profile />,
  },
]);

export default router;
