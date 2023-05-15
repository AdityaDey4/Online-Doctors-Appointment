import axios from "../api/axios"
import useAuth from "../hooks/useAuth"
import { useEffect, useState } from "react";

const PatientInfo = () => {

  const {auth} = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [patient, setPatient] = useState();
  
  useEffect(()=> {
    
    const getPatient = async ()=> {
      
      try {
        const response = await axios.get(
          `/patients/${auth.email}`
        );
        setPatient(response.data);
        setIsLoading(false);
      }catch(err) {
        console.error(err);
      }
    }

    getPatient();
  }, [])

  return (
    isLoading
      ? <div className="loading">
          <p>Loading....</p>
      </div>
      : (
        !patient
          ? <p>Unable to fetch</p>
          : <div className='patient-info-feed'>
              <text>{`Name : ${patient.name}`}</text> <br></br>
              <text>{`Age : ${patient.age}`}</text> <br></br>
              <text>{`Gender : ${patient.gender}`}</text> <br></br>
              <text>{`Mobile : ${patient.mobile}`}</text> <br></br>
              <text>{`Address : ${patient.address}`}</text> <br></br>
              <text>{`Email : ${patient.email}`}</text> <br></br>
            </div>
      )
  )
}

export default PatientInfo