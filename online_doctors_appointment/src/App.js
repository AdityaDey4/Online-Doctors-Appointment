import Home from "./components/Home";
import Layout from "./components/Layout";
import DoctorsList from "./components/DoctorsList";
import Missing from "./components/Missing";
import Register from "./components/Register";
import Login from "./components/Login";
import ContactUs from "./components/ContactUs";
import Unauthorized from "./components/Unauthorized";
import RequireAuth from "./components/RequireAuth";
import Appointment from "./components/Appointment";
import PatientsProfile from "./components/PatientsProfile";
import PatientProfileDashBoard from "./components/PatientProfileDashBoard";
import PatientProfileAppointments from "./components/PatientProfileAppointments";
import AdminProfile from "./components/AdminProfile/AdminProfile";
import AdminProfileDashboard from "./components/AdminProfile/AdminProfileDashboard";
import AllAppointments from "./components/AdminProfile/AllAppointments";
import AllDoctors from "./components/AdminProfile/AllDoctors";
import AllMessages from "./components/AdminProfile/AllMessages";
import AllMessageForPatient from "./components/AllMessageForPatient";

import ROLES from "./config/ROLES";
import {Routes, Route} from 'react-router-dom'

function App() {
  return (

    <Routes>

        <Route element={<RequireAuth allowedRoles={[ROLES.Patient]} />}>
          <Route path="/patient-dashboard" element={<PatientsProfile />}>
            <Route index element={<PatientProfileDashBoard />} />
          </Route>

          <Route path="/patient-appointments" element={<PatientsProfile />}>
            <Route index element={<PatientProfileAppointments />} />
          </Route>
        </Route>

        <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
          <Route path="/admin-dashboard" element={<AdminProfile />}>
            <Route index element={<AdminProfileDashboard />} />
          </Route>

          <Route path="/all-appointments" element={<AdminProfile />}>
            <Route index element={<AllAppointments />} />
          </Route>

          <Route path="/all-doctors" element={<AdminProfile />}>
            <Route index element={<AllDoctors />} />
          </Route>

          <Route path="/all-messages" element={<AdminProfile />}>
            <Route index element={<AllMessages />} />
          </Route>
        </Route>

        <Route path="/" element={<Layout />}>

            <Route index element={<Home />} />
            <Route path="register" element={<Register />} />
            <Route path="login" element={<Login />} />
            <Route path="doctors" element={<DoctorsList />} />
            <Route path="unauthorized" element={<Unauthorized />} />
            <Route path="all-messages-patient" element={<AllMessageForPatient />} />

            {/* protected routes will be book_appointment, admin, patient */}

            <Route element={<RequireAuth allowedRoles=    {[ROLES.Patient]} />}>
              <Route path="appointment" element={<Appointment />} />
            </Route>

            <Route element={<RequireAuth allowedRoles=    {[ROLES.Patient]} />}>
              <Route path="contact" element={<ContactUs />} />
            </Route>
 
            {/* catch all */}
            <Route path="*" element={<Missing />} />
        </Route>
    </Routes>
  );
}

export default App;
