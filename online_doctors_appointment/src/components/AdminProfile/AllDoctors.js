import { useState, useEffect, useRef } from "react";
import axios from "../../api/axios";
import AllDoctorsFeed from "./AllDoctorsFeed";
import { Link } from "react-router-dom";
import Footer from "../Footer";
import Popup from "reactjs-popup";
import AddDoctor from "./AddDoctor";
import DoctorsAppointment from './DoctorsAppointment';

const overlayStyle = { background: 'rgba(0,0,0,0.5)' };
const arrowStyle = { color: '#000' }; // style for an svg element

const AllDoctors = () => {
  const [doctors, setDoctors] = useState();
  const effectRan = useRef(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (effectRan.current === false || process.env.NODE_ENV !== "development") {
      const getDoctors = async () => {
        try {
          const response = await axios.get("/doctors");
          setDoctors(response.data);
        } catch (err) {
          console.error(err);
        }
      };

      getDoctors();
      setIsLoading(false);
    }

    return () => {
      effectRan.current = true;
    };
  }, []);

  return isLoading ? (
    <div className="loading">
      <p>Loading....</p>
    </div>
  ) : (
    <div className="all-doctor-list dashboard">
      <div className="doctor-header">
        <Popup trigger={<button>Add New Doctor</button>} 
        {...{  overlayStyle, arrowStyle }}
        position="bottom center" modal>
          {(close) => (
            <div className="scroll-component">
              <a className="close cross" onClick={close}>
                &times;
              </a>
              <AddDoctor />
            </div>
          )}
        </Popup>
      </div>
      <div>
        <div className="all-doctor-ul-list">
          {doctors?.length ? (
            <div>
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Pic</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Appointments</th>
                    <th>Schedule</th>
                  </tr>
                </thead>
                <tbody>
                  {doctors.map((bumba) => (
                    <tr key={bumba._id}>
                      <td>
                        <img
                          className="imgs"
                          src={"http://localhost:4500/d_img/" + bumba.image}
                        />
                      </td>
                      <td>{bumba.name}</td>
                      <td>{bumba.email}</td>
                      <td>
                        <Popup trigger={<button>Appointments</button>} 
                          {...{  overlayStyle }}
                          position="bottom center" modal>
                            {(close) => (
                              <div className="scroll-component">
                                <a className="close cross" onClick={close}>
                                  &times;
                                </a>
                                <DoctorsAppointment doctor={bumba} />
                              </div>
                            )}
                        </Popup>
                      </td>
                      <td>
                        <Popup trigger={<button>Schedule</button>} 
                          {...{  overlayStyle }}
                          position="bottom center" modal>
                            {(close) => (
                              <div className="scroll-component">
                                <a className="close cross" onClick={close}>
                                  &times;
                                </a>
                                <AddDoctor doctor={bumba} />
                              </div>
                            )}
                        </Popup>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p></p>
          )}
        </div>
      </div>
      <div style={{ marginTop: "5rem" }}>
        <Footer />
      </div>
    </div>
  );
};

export default AllDoctors;
