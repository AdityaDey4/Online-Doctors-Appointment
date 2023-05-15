import { useState, useEffect, useRef } from "react";
import axios from "../api/axios";
import DoctorFeed from "./DoctorFeed";

const DoctorsList = () => { // need to add css

    const [doctors, setDoctors] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const effectRan = useRef(false);

    useEffect(()=> {

        if(effectRan.current === true || process.env.NODE_ENV !== 'development') {
            
            const getDoctors = async ()=> {

                try {
                    const response = await axios.get('/doctors');
                    setDoctors(response.data);
                    setIsLoading(false);
                }catch(err) {
                    console.error(err);
                }
            }

            getDoctors();
        }

        return ()=> {
            effectRan.current = true;
        }
    }, [])
    
  return (
        <div className="doctor-list">

            <h1>Doctors List</h1>
            {
                isLoading 
                    ? <div className="loading">
                        <p>Loading....</p>
                    </div>
                    :
                    <div className="doctor-ul-list">
                        {doctors?.length
                            ?   (
                                    <ul>
                                        {doctors.map(doc=> 
                                            <li>{<DoctorFeed doctor={doc}/>}</li>
                                        )}
                                    </ul>
                                )
                            : <p>There is no doctor to display</p>
                        }
                    </div>
            }
        </div>
  )
}

export default DoctorsList