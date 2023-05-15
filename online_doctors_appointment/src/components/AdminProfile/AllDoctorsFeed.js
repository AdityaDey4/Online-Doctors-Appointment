import { Link } from "react-router-dom"

const AllDoctorsFeed = ({doctor}) => {

  return (
    <div className='doctor-feed-admin'>
        <div className='doctor-info-admin'>
          <text>{`Name : ${doctor.name}`}</text> <br></br>
          <text>{`Degree : ${doctor.degree}`}</text> <br></br>
          <text>{`Year of Experience : ${doctor.yoe}`}</text> <br></br>
          <text>{`Specialist : ${doctor.specialist}`}</text> <br></br>
          <text>{`Number : ${doctor.mobile}`}</text> <br></br>
          <text>{`email : ${doctor.email}`}</text> <br></br>
        </div>
        <div className='button-info'>
            <Link 
              to={'/doctor-appointments'}
              state={{doctor : doctor}}
            ><button>Appointment</button></Link>
            <Link 
              to={'/add-doctor'}
              state={{doctor : doctor}}
            ><button>Update Schedule</button></Link>
        </div>
            
    </div>
  )
}

export default AllDoctorsFeed