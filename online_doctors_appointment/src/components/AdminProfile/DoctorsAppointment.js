import React from "react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "../../api/axios";

const DoctorsAppointment = ({doctor}) => {
  const location = useLocation();
  const [appointment, setAppointment] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getAppointment = async () => {
      try {
        const response = await axios.get(`/doctorAppointments/${doctor.email}`);

        setAppointment(response.data);
        setIsLoading(false);
      } catch (err) {}
    };

    getAppointment();
  }, []);
  return (
    <div>
      { isLoading
        ?<div className="loading">
            <p>Loading....</p>
        </div>
        : appointment.length != 0 ? (
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Patient Email</th>
                <th>Booking Date</th>
                <th>Appointment Date</th>
                <th>Slot</th>
              </tr>
            </thead>
            <tbody>
              {appointment.map((bumba) => (
                <tr key={bumba._id}>
                  <td>{bumba.patient_email}</td>
                  <td>{bumba.curr_date}</td>
                  <td>{bumba.fixing_date}</td>
                  <td>{bumba.slot}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p style={{}}>Doctor have no appointment so far.</p>
        )
      }
    </div>
  );
};

export default DoctorsAppointment;
