import useAuth from "../hooks/useAuth";
import ROLES from "../config/ROLES";

const PatientAppointmentFeed = ({appointment}) => {

    const {auth} = useAuth();

  return (
    <div className='appointment-feed'>
        <div className='appointment-info'>
          
            <label>{`Patient email : ${appointment.patient_email}`}</label>
            <label>{`Doctor email : ${appointment.doctor_email}`}</label>
            <label>{`Booking Date : ${appointment.curr_date}`}</label>
            <label>{`Appointment Date : ${appointment.fixing_date}`}</label>
            <label>{`Slot : ${appointment.slot}`}</label>
            <label>{`Status : ${appointment.status}`}</label>
        </div>
        {
            auth.role === ROLES.Admin && 
                <button>Update</button>
        }
    </div>
  )
}

export default PatientAppointmentFeed