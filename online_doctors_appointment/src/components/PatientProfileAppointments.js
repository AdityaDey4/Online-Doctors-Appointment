import axios from "../api/axios"
import useAuth from "../hooks/useAuth"
import { useEffect, useState } from "react";
import PatientAppointmentFeed from "./PatientAppointmentFeed";
import Footer from "./Footer";
const PatientProfileAppointments = () => {

    const {auth} = useAuth();
    const [appointments, setAppointments] = useState();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(()=> {

        const getAppointments = async ()=> {
            
            try {
                const response = await axios.get(`/patientAppointments/${auth.email}`);

                setAppointments(response.data);

                setIsLoading(false);
            }catch(err) {
                console.error(err);
            }
        }

        getAppointments();
    }, []);

  return (
    <div className="patient-appointments dashboard">
        {
            isLoading
                ? <div className="loading">
                    <p>Loading....</p>
                </div>
                : <div className="patient-ul=list">
                    {appointments?.length
                        ? (
                            <table className="table table-striped">
                            <thead>
                              <tr>
                                <th>Doctor Email</th>
                                <th>Booking Date</th>
                                <th>Appointment Date</th>
                                <th>Slot</th>
                              </tr>
                            </thead>
                            <tbody>
                              {appointments.map((bumba) => (
                                <tr key={bumba._id}>
                                  <td>{bumba.doctor_email}</td>
                                  <td>{bumba.curr_date}</td>
                                  <td>{bumba.fixing_date}</td>
                                  <td>{bumba.slot}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        )
                        : <p>You have not booked any appointment yet.</p>
                    }
                </div>
        }
        <div style={{marginTop : '5rem'}}>
          <Footer />
      </div>
    </div>
  )
}

export default PatientProfileAppointments