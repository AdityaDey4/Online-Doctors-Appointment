import {Link} from 'react-router-dom'
const image = require("../../images/doctor1.jpg");

const Component1 = () => {
  return (
    <div className="component1">

        <div className="info">

            <p className="infoTitle">Your New Smile Starts Here</p>
            <p className="infoSummary">Our Doctors is here to solve your problems. Their experience will definetly help you. Please click the below button to book an appointment.</p>
            <Link to={'/appointment'}><button 
              id="book-appointment-bt"
            >BOOK APPOINTMENT</button></Link>
        </div>
        
        <img className="doctor" src={image} alt="Doctor1" />
    </div>
  )
}

export default Component1