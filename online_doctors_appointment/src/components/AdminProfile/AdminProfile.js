import React from "react";
import { useNavigate, Outlet, Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useLogout from "../../hooks/useLogout";

const doctor = require("../../images/admin.png");

const AdminProfile = () => {
  const { auth } = useAuth();
  const logout = useLogout();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/", { replace: true });
  };

  return (
    <div className="doctor-profile-page">
      <nav className="menu" tabindex="0">
        <header className="avatar">
          <img src={doctor} />
          <h6 style={{ paddingTop: "1rem" }}>{auth.email}</h6>
        </header>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div>
            <ul>
              <Link to={"/admin-dashboard"}>
                <li className="icon-dashboard">
                  <span>Dashboard</span>
                </li>
              </Link>

              <Link to={"/all-appointments"}>
                <li className="icon-appointment">
                  <span>Appointments</span>
                </li>
              </Link>

              <Link to={"/all-doctors"}>
                <li className="icon-doctors">
                  <span>Doctors</span>
                </li>
              </Link>

              <Link to={"/all-messages"}>
                <li className="icon-messages">
                  <span>Messages</span>
                </li>
              </Link>
            </ul>
          </div>
          <div>
            <ul>
              <Link to={"/"}>
                <li className="icon-doctors">
                  <span>Go to Home...</span>
                </li>
              </Link>

              <li className="icon-logout" onClick={handleLogout}>
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

export default AdminProfile;
