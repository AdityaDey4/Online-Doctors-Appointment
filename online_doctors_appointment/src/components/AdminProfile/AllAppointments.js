import { useEffect, useState } from "react";
import PatientAppointmentFeed from "../PatientAppointmentFeed";
import axios from "../../api/axios";
import Footer from "../Footer";

const AllAppointments = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [appointments, setAppointments] = useState();

  useEffect(() => {
    const getAllAppointments = async () => {
      try {
        console.log("All Appointments1");
        const response = await axios.get("/appointments");
        console.log("All Appointments2");
        setAppointments(response.data);
        setIsLoading(false);
      } catch (err) {
        console.error(err);
      }
    };

    getAllAppointments();
  }, []);
  return (
    <div className="dashboard">
      {isLoading ? (
        <div className="loading">
          <p>Loading....</p>
      </div>
      ) : appointments ? (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Doctor Email</th>
              <th>Patient Email</th>
              <th>Booking Date</th>
              <th>Appointment Date</th>
              <th>Slot</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((bumba) => (
              <tr key={bumba._id}>
                <td>{bumba.doctor_email}</td>
                <td>{bumba.patient_email}</td>
                <td>{bumba.curr_date}</td>
                <td>{bumba.fixing_date}</td>
                <td>{bumba.slot}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No Appointments to show</p>
      )}
      <div style={{marginTop : '10rem'}}>
          <Footer />
      </div>
    </div>
  );
};

export default AllAppointments;
