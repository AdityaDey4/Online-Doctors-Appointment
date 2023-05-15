import axios from "../../api/axios";
import useAuth from "../../hooks/useAuth";
import { useEffect, useState, useRef } from "react";
import Footer from "../Footer";

const AdminProfileDashboard = () => {
  const { auth } = useAuth();
  const [loading, setLoading] = useState(true);
  const [admin, setAdmin] = useState();
  const [app, setApp] = useState(0);
  const [patient, setPatient] = useState(0);
  const [doctor, setDoctor] = useState(0);
  const [message, setMessage] = useState(0);
  const [todayApp, setTodayApp] = useState(0);
  const effectRan = useRef(false);

  useEffect(() => {
    let isMounted = true;
    if (effectRan.current === true || process.env.NODE_ENV !== "development") {
      const getAdmin = async () => {
        try {
          const response = await axios.get(`/admin/${auth.email}`);

          const response1 = await axios.get("/doctors");
          const response2 = await axios.get("/patients");
          const response3 = await axios.get("/messages");
          const response4 = await axios.get("/appointments");

          if (response1.data) setDoctor(response1.data.length);

          if (response2.data) setPatient(response2.data.length);

          if (response3.data) setMessage(response3.data.length);

          if (response4.data) {
            setApp(response4.data.length);

            const today = new Date().toString().substring(4, 15);
            let count = 0;

            response4.data.map((app) => {
              if (app.fixing_date === today) count++;
            });

            setTodayApp(count);
          }

          isMounted && setAdmin(response.data);
          setLoading(false);
        } catch (err) {
          console.error(err);
        }
      };

      getAdmin();
    }

    return () => {
      isMounted = false;
      effectRan.current = true;
    };
  }, []);

  return (
    <div>
      {loading ? (
        <div className="loading">
          <p>Loading....</p>
        </div>
      ) : (
        <div className="dashboard">
          <div className="dashboard-info">
            <text>{`Name : ${admin.name}`}</text> <br></br>
            <text>{`Email : ${admin.email}`}</text> <br></br>
          </div>
          <div className="dashboard-boxes">
            <div className="dashboard-box">
              <h6>Total Patients</h6>
              <hr />
              <h1>{patient}</h1>
            </div>

            <div className="dashboard-box">
              <h6>Total Doctors</h6>
              <hr />
              <h1>{doctor}</h1>
            </div>

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
          <div style={{ marginTop: "5rem" }}>
            <Footer />
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProfileDashboard;
