import { useNavigate, useLocation } from "react-router-dom";
import PatientInfo from "./PatientInfo";
import Schedule from "./Schedule";
import DoctorFeedInfo from "./DoctorFeedInfo";

const Appointment = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const doctor = location.state?.doctor;

  const handleSelectDoctor = () => {
    navigate("/doctors", { replace: true });
  };

  return (
    <div className="dashboard">
      <h3 style={{ display: "flex", justifyContent: "center" }}>
        Book Appointment
      </h3>
      <hr />
      <div className="dashboard-infos">
        <div
          className="dashboard-box center-flex"
        >
          <h4 style={{ display: "flex", justifyContent: "center" }}>Patient</h4>
          <div className="dashboard-info" style={{ paddingRight: "10vw" }}>
            <PatientInfo />
          </div>
        </div>

        <div
          className="dashboard-box center-flex"
        >
          <h4 style={{ display: "flex", justifyContent: "center" }}>Doctor</h4>
          <div className="dashboard-info" style={{ paddingRight: "10vw" }}>
            {doctor ? (
              <DoctorFeedInfo doctor={doctor} />
            ) : (
              <p>You have not pick any doctor yet.</p>
            )}
          </div>
        </div>
      </div>
      <div>
        {doctor ? (
          <div>
            <Schedule doctor={doctor} />
          </div>
        ) : (
          <button id='select-doctor' style={{ display: "flex", justifyContent: "center", marginTop : '2rem' }} onClick={handleSelectDoctor}>Select Doctor</button>
        )}
      </div>
    </div>
  );
};

export default Appointment;
