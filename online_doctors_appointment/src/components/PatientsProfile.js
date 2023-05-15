import React from "react";
import { useNavigate, Outlet, Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useLogout from "../hooks/useLogout";
const doctor = require("../images/examination.png");
const PatientProfile = () => {
  const { auth } = useAuth();
  const logout = useLogout();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/", { replace: true });
  };

  return (
    <div className="patient-profile-page">
      <nav className="menu" tabindex="0">
        <header className="avatar">
          <img src={doctor} />
          <h6 style={{ paddingTop: "1rem" }}>{auth.email}</h6>
        </header>

        <div style={{display : "flex", flexDirection : "column", justifyContent : "space-between"}}>
          <div>
            <ul>
              <Link to={"/patient-dashboard"}>
                <li tabindex="0" className="icon-dashboard">
                  <span>Dashboard</span>
                </li>
              </Link>

              <Link to={"/patient-appointments"}>
                <li tabindex="0" className="icon-appointment">
                  <span>Appointments</span>
                </li>
              </Link>
            </ul>
          </div>

          <div>
            <ul>
              <Link to={"/"}>
                <li tabindex="0" className="icon-appointment">
                  <span>Go to home...</span>
                </li>
              </Link>

              <li tabindex="0" className="icon-logout" onClick={handleLogout}>
                <span>Log out</span>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="outlet">
        <Outlet />
      </div>
    </div>
  );
};

export default PatientProfile;
