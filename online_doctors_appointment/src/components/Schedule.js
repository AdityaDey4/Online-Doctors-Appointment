import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import axios from "../api/axios";
import useAuth from "../hooks/useAuth";

const Schedule = ({ doctor }) => {
  const effectRan = useRef(false);

  const { auth } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.from?.pathname || "/";

  const [date, setDate] = useState(new Date());
  const [schedule, setSchedule] = useState();
  const [day, setDay] = useState();
  const [slot, setSlot] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (effectRan.current === true || process.env.NODE_ENV !== "development") {
      const getSchedule = async () => {
        try {
          const response = await axios.get(`/schedule/${doctor.email}`);
          console.log(response.data);
          setSchedule(response.data);
        } catch (err) {
          console.error(err);
        }
      };

      getSchedule();
      console.log(doctor);
      console.log(schedule);

      const dateArr = date.toString().split(" ");
      setDay(dateArr[0]);
      setIsLoading(false);
    }

    return () => {
      effectRan.current = true;
    };
  }, []);

  useEffect(() => {
    setSlot("");
  }, [day]);

  const onSlotChanged = (e) => setSlot(e.target.value);

  const handleOnChange = (value) => {
    setDate(value);

    const dateArr = value.toString().split(" ");
    setDay(dateArr[0]);
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "/appointments",
        JSON.stringify({
          patient_email: auth.email,
          doctor_email: doctor.email,
          curr_date: new Date().toString().substring(4, 15),
          fixing_date: date.toString().substring(4, 15),
          slot: slot,
        }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      navigate(from, { replace: true });
    } catch (err) {}
  };

  return schedule ? (
    isLoading ? (
      <div className="loading">
        <p>Loading....</p>
      </div>
    ) : (
      <div className="schedule-container">
        <h4 style={{alignSelf: "center"}}>Select Date & Slot</h4>
        <div className="schedule">
          <Calendar onChange={handleOnChange} value={date} />

          <div className="schedule-info">
            {schedule.days[day] ? (
              <select id="slot" value={slot} onChange={onSlotChanged}>
                <option value={""}></option>
                {Object.keys(schedule.slots).map(
                  (key) =>
                    schedule.slots[key] && (
                      <option key={key} value={key}>
                        {key}
                      </option>
                    )
                )}
              </select>
            ) : (
              <p>Doctor is not available on that day</p>
            )}
            <button onClick={handleSubmit} disabled={!slot || !date}>
              Book Appointment
            </button>
          </div>
        </div>
      </div>
    )
  ) : (
    <div className="loading">
      <p>Loading....</p>
    </div>
  );
};

export default Schedule;
