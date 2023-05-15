import { Link } from "react-router-dom"
import useAuth from "../hooks/useAuth"
import ROLES from "../config/ROLES"

const Header = () => { 

  const {auth} = useAuth();
  return (
    <header className="header">
        <div className="webName">
            <h1>Online Doctors Appointment</h1>
        </div>
        <div className="header-list">
            <ul>
                <Link to={'/'}><li>Home</li></Link>
                <Link to={'/doctors'}><li>Doctors</li></Link>
                <Link to={'/appointment'}><li>Book Appointment</li></Link>
                <Link to={'/contact'}><li>Contact Us</li></Link>
                {
                  auth?.role
                    ? auth.role==ROLES.Patient
                      ? <Link to={'/patient-dashboard'}       ><li>Profile</li></Link>
                      : <Link to={'/admin-dashboard'}><li>Profile</li></Link>
                    : <Link to={'/login'}><li>Sign In</li></Link>
                }
            </ul>
        </div>
    </header>
  )
}

export default Header