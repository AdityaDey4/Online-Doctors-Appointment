import {Link} from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import ROLES from '../config/ROLES'
import DoctorFeedInfo from './DoctorFeedInfo'

// need to add css , after designing the schema I will cover it
const DoctorFeed = ({doctor}) => {
  const {auth} = useAuth();

  return (
    <div className='doctor-feed'>
        <DoctorFeedInfo doctor={doctor} />
        {
          auth?.role == ROLES.Patient
           && <Link
              to='/appointment'
              state={{
                doctor: doctor
              }}>
                <button>Book Appointment</button>
              </Link>
        }
    </div>
  )
}

export default DoctorFeed