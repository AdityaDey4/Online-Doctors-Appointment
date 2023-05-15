import React from 'react'
import { useState, useRef, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import ageList from '../../config/AgeList';
import { DayObject } from '../../config/DayList';
import { SlotObject } from '../../config/SlotList';
import Select from 'react-select';
import axios from '../../api/axios';

const AddDoctor = ({doctor}) => {

    const userRef = useRef();
    const effectRan = useRef(false);
    let [dimg,setDimg]=useState(null);
    const [name, setName] = useState("");
    const [validName, setValidName] = useState(false);

    const [email, setEmail] = useState();
    const [validEmail, setValidEmail] = useState(false);

    const [mobile, setMobile] = useState();
    const [validMobile, setValidMobile] = useState(false);

    const [degree, setDegree] = useState();
    const [yoe, setYoe] = useState();
    const [specialist, setSpecialist] = useState();

    const [errMsg, setErrMsg] = useState('');

    const days = DayObject;
    const [selectedDays, setSelectedDays] = useState([]);
    
    const slots = SlotObject;
    const [selectedSlots, setSelectedSlots] = useState([]);

    const EMAIL_REGEX = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;
    const FULLNAME_REGEX = /^[a-z A-Z.]*$/;
    const MOBILE_REGEX = /^\+?[1-9][0-9]{7,14}$/;

    const location = useLocation();
    const navigate = useNavigate();
    const from = location?.state?.from?.pathname || '/';

    const [schedule, setSchedule] = useState();

    useEffect(()=> {

        const getSchedule = async ()=> {

            try {
              const response = await axios.get(
                `/schedule/${doctor.email}`
              );
              console.log(response.data);
              setSchedule(response.data); 
            }catch(err) {
              console.error(err); 
            }
          } 
      
          if(doctor) {
            getSchedule();

            setName(doctor.name);
            setEmail(doctor.email);
            setMobile(doctor.mobile);
            setYoe(doctor.yoe);
            setDegree(doctor.degree);
            setSpecialist(doctor.specialist);
            
          };
    }, []);

    useEffect(()=> {
        
        if(effectRan.current === true || process.env.NODE_ENV !=='development') {
            if(schedule?.slots) {
                Object.keys(schedule.slots).map((key)=> {
                    if(schedule.slots[key] && !selectedSlots.includes(key)) selectedSlots.push(key);              
                })
            }
            if(schedule?.days) {
                Object.keys(schedule.days).map((key)=> {
                    if(schedule.days[key] && !selectedDays.includes(key)) selectedDays.push(key);              
                })
            }
            if(schedule?.doctor_email) {
                console.log(schedule.doctor_email);
            }
        }

        return ()=> {
            effectRan.current = true;
        }
    }, [schedule])

    useEffect(()=> {
        userRef.current.focus();
    }, []);

    useEffect(()=> {
        setErrMsg('');
    }, [name, email, mobile, specialist, degree, yoe, selectedDays, selectedSlots]);

    useEffect(()=> {
        const result = EMAIL_REGEX.test(email);
        setValidEmail(result);
    }, [email]);

    useEffect(()=> {
        const result = FULLNAME_REGEX.test(name);
        if(name.length !==0  && result) setValidName(true);
        else setValidName(false);
    }, [name]);

    useEffect(()=> {
        const result = MOBILE_REGEX.test(mobile);
        setValidMobile(result);
    }, [mobile]);

    const ageOptions = ageList.map((yoe) => (
        <option key={yoe} value={yoe}>
            {yoe}
        </option>
    ));

    const onYoeChanged = (e) => setYoe(e.target.value);

    const handleDayChange = (e)=> {
        setSelectedDays(Array.isArray(e) ? e.map(x=> x.value) : []);
    }

    const handleSlotChange = (e)=> {
        setSelectedSlots(Array.isArray(e) ? e.map(x=> x.value) : []);
    }

    const handleSubmit = async (e)=> {
        e.preventDefault();
        try {
            if(!doctor) {
                var fd=new FormData();
                fd.append("email",email);
                fd.append("name",name);
                fd.append("mobile", mobile);
                fd.append("yoe", yoe);
                fd.append("specialist", specialist);
                fd.append('degree', degree);
                fd.append('dimg',dimg);
                console.log(dimg.name);

                const response1 = await axios.post(
                    '/doctors', fd
                );
            }

            const max_patient = selectedSlots.length;
            const dayOb = {
                "Sun" : selectedDays.includes("Sun"),
                "Mon" : selectedDays.includes("Mon"),
                "Tue" : selectedDays.includes("Tue"),
                "Wed" : selectedDays.includes("Wed"),
                "Thu" : selectedDays.includes("Thu"),
                "Fri" : selectedDays.includes("Fri"),
                "Sat" : selectedDays.includes("Sat")
            }
            const slotOb = {
                "10 AM to 11 AM" : selectedSlots.includes("10 AM to 11 AM"),
                "11 AM to 12 PM" : selectedSlots.includes("11 AM to 12 PM"),
                "12 PM to 1 PM" : selectedSlots.includes("12 PM to 1 PM"),
                "1 PM to 2 PM" : selectedSlots.includes("1 PM to 2 PM"),
                "2 PM to 3 PM" : selectedSlots.includes("2 PM to 3 PM"),
                "3 PM to 4 PM" : selectedSlots.includes("3 PM to 4 PM"),
                "4 PM to 5 PM" : selectedSlots.includes("4 PM to 5 PM"),
                "5 PM to 6 PM" : selectedSlots.includes("5 PM to 6 PM")
            }
            const response2 = await axios.post(
                '/schedule',
                JSON.stringify({
                    email,
                    max_patient,
                    "slots" : slotOb,
                    "days" : dayOb
                }),
                {
                    headers : {"Content-Type" : "application/json"},
                    withCredentials : true
                }
            )

            setName('');
            setValidName(false);
            setEmail('');
            setValidEmail(false);
            setMobile('');
            setValidMobile(false);

            setYoe('');
            setDegree("");
            setSpecialist("");
            
            setSelectedDays([]);
            setSelectedSlots([]);

            navigate('/admin-dashboard', {replace : true});
        }catch(err) {
            if (!err?.response) {
                setErrMsg("No Server Responce");
            }  else {
                setErrMsg(err.message);
            }
        }
    }

  return (

    <div className='add-doctor-form'>
        <div className='doctor-mid-window'>
            <p
                className={errMsg ? "errMsg" : "offscreen"}
                aria-live="assertive"
            >
                {errMsg}
            </p>
            <form className='add-doctor-info'>

                {
                    doctor
                        ?<img style={{alignSelf : 'center'}}
                        className="imgs"
                        src={"http://localhost:4500/d_img/" + doctor.image}
                      />
                        : <div>
                            <label>Image : *</label>
                        <p><input onChange={(ev)=>{
                            setDimg(ev.target.files[0]);
                        }} type="file" className="form-control" /></p>
                        </div>
                }
                <label htmlFor='email'>Email : *</label>
                <input
                    type="text"
                    id="email"
                    ref={userRef}
                    autoComplete="off"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    required
                    disabled={doctor ? true : false}
                />

                <label htmlFor='name'>Name : *</label>
                <input
                    type="text"
                    id="name"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    required
                    disabled={doctor ? true : false}
                />

                <label htmlFor='mobile'>Mobile : *</label>
                <input
                    type="number"
                    id="mobile"
                    onChange={(e) => setMobile(e.target.value)}
                    value={mobile}
                    required
                    disabled={doctor ? true : false}
                />

                <label htmlFor='degree'>Degree : *</label>
                <input
                    type="text"
                    id="degree"
                    onChange={(e) => setDegree(e.target.value)}
                    value={degree}
                    required
                    disabled={doctor ? true : false}
                />

                <div className='yoe'>
                    <label htmlFor="yoe">Year of Experience : * </label>
                    <select 
                        id="yoe" 
                        value={yoe} 
                        onChange={onYoeChanged} 
                        disabled={doctor ? true : false}
                    >
                        <option value={""}></option>
                        {ageOptions}
                    </select>
                </div>

                <label htmlFor='specialist'>Specialist : *</label>
                <input
                    type="text"
                    id="specialist"
                    onChange={(e) => setSpecialist(e.target.value)}
                    value={specialist}
                    required
                    disabled={doctor ? true : false}
                />
            </form>
        </div>

        <div className='doctor-low-window'>
            <label htmlFor="days">Available Days : * </label>
            <Select
                id='days'
                isMulti
                placeholder="Select Days"
                isClearable
                options={days}
                value={days.filter(day => selectedDays.includes(day.value))}
                onChange={handleDayChange}
            />

            <label htmlFor="slots">Available Slots : * </label>
            <Select
                id='slots'
                isMulti
                placeholder="Select Slots"
                isClearable
                options={slots}
                value={slots.filter(slot => selectedSlots.includes(slot.value))}
                onChange={handleSlotChange}
            />
        </div>

        
        <button 
            id='add-doctor-bt'
            onClick={handleSubmit}
            disabled={
                !validEmail || !validName || !validMobile || !degree || !specialist || !yoe || selectedDays.length === 0 || selectedSlots.length === 0 ? true : false
            }
        >Add</button>
    </div>
  )
}

export default AddDoctor