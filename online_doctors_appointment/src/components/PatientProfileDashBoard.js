import React from "react";
import { useState, useEffect } from "react";
import PatientInfo from "./PatientInfo";
import axios from "../api/axios";
import useAuth from "../hooks/useAuth";
import Footer from "./Footer";

const PatientProfileDashBoard = () => {

  const {auth} = useAuth();
  const [app, setApp] = useState(0);
  const [todayApp, setTodayApp] = useState(0);
  const [message, setMessage] = useState(0);

  useEffect(() => {
    const getResponses = async () => {
      const response1 = await axios.get(`/patientAppointments/${auth.email}`);

      const response2 = await axios.get("/messages");

      if (response1.data) {
        setApp(response1.data.length);
        const today = new Date().toString().substring(4, 15);

        let count = 0;

        response1.data.map((app) => {
          if (app.fixing_date === today) count++;
        });

        setTodayApp(count);
      }

      if (response2.data) {

        let count = 0;
        response2.data.map((msg)=> {
          if(msg.email === auth.email) count++;
        })

        setMessage(count);
      }
    };

    getResponses();
  }, []);
  return (
    <div className="dashboard">
      <div className="dashboard-info">
        <PatientInfo />
      </div>
      <div className="dashboard-boxes">
          <div className="dashboard-box">
            <h6>Total Appointments</h6>
            <hr />
            <h1>{app}</h1>
          </div>

          <div className="dashboard-box">
            <h6>Today Appointments</h6>
            <hr />
            <h1>{todayApp}</h1>
          </div>

          <div className="dashboard-box">
            <h6>Total Messages</h6>
            <hr />
            <h1>{message}</h1>
          </div>
      </div>
      <div style={{marginTop : '5rem'}}>
          <Footer />
      </div>
    </div>
  );
};

export default PatientProfileDashBoard;
