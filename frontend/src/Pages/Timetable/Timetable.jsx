import NavBar from "../../Components/NavBar/NavBar";
import { Footer } from "../../Components/Footer/Footer";
import React from 'react';
import './Timetable.css';

export const Timetable = () => {
    // Sample data for activities
    const activities = [
        { id: 1, name: "Student Registration", date: "Mid November", description: "Open for all new students." },
        { id: 2, name: "Parent-Teacher Meeting", date: "November 20th", description: "Scheduled for all grades." },
        { id: 3, name: "Winter Break", date: "December 20 - January 5", description: "School closed for winter break." },
        { id: 4, name: "Midterm Exams", date: "January 10 - January 20", description: "Exam period for all grades." },
        { id: 5, name: "Final Exams", date: "March 1 - March 15", description: "Exam period for all grades." },
        { id: 6, name: "Project Presentations", date: "April 2nd ", description: "Scheduled for 12th graders." },

    ];

    return (
    <div>
          <NavBar />

        <div className="timetable-container">
            <h1>School Activity Timetable</h1>
            <table className="timetable">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Activity</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    {activities.map((activity) => (
                        <tr key={activity.id}>
                            <td>{activity.date}</td>
                            <td>{activity.name}</td>
                            <td>{activity.description}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
         </div>   
         <Footer />
    </div>

    );
};