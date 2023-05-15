
const image = require("../../images/doctor3.jpg");

const Component3 = () => {
  return (
    <div className="component3">

        <img className="doctor" src={image} alt="Doctor3" />
        <div className="info">
            <span className="infoTitle">Who we are</span>
            <p className="infoSummary">We are XYZ Health Care, provide online Doctors Appointment with experienced doctors at any day any time. We provide this service in lowest fees.
                We have doctors from foreign countries as well. So far, we are able to provide this service to 1500+ patients & they also get proper treatment from our doctors.
                There are more than 200 employees working in this company & 25+ doctors already involved with us.
            </p>
        </div>
    </div>
  )
}

export default Component3