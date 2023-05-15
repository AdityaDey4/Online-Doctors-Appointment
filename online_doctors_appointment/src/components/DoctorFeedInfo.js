import React from "react";

const DoctorFeedInfo = ({ doctor }) => {
  return (
    <div className="doctor-feed-info">
      <img
        style={{ alignSelf: "center", marginRight : '10px'}}
        className="imgs"
        src={"http://localhost:4500/d_img/" + doctor.image}
      />
      <div className="doctor-info">
        <text>{`Name : ${doctor.name}`}</text> <br></br>
        <text>{`Degree : ${doctor.degree}`}</text> <br></br>
        <text>{`Year of Experience : ${doctor.yoe}`}</text> <br></br>
        <text>{`Specialist : ${doctor.specialist}`}</text> <br></br>
        <text>{`Number : ${doctor.mobile}`}</text> <br></br>
        <text>{`email : ${doctor.email}`}</text> <br></br>
      </div>
    </div>
  );
};

export default DoctorFeedInfo;
