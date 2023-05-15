import { useEffect, useState } from "react"
import axios from "../../api/axios";
import { Link } from "react-router-dom";

const Component2 = () => {

    const [message, setMessage] = useState();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(()=> {

        const getMessage = async ()=> {
            const response = await axios.get('/messages');
            setMessage([response.data[0], response.data[1], response.data[2]]);
            setIsLoading(false);
        }

        getMessage();
    }, []);
  return !isLoading
        ? (
    <div className="component2">

        <div className="component2-info">
            <p className="reviewTitle">What Our Patient's Says</p>
            <Link to={'/all-messages-patient'}><p style={{marginBottom : '20px', alignSelf : 'center'}}>View all</p></Link>
        </div>
        <div className="component2-data">

            <div className="reviewItemInfo">
                <p id="userReview">{message[0].message}</p>
                <span id="reviewUserName">- {message[0].name}</span>
            </div>

            <div className="reviewItemInfo">
                <p id="userReview">{message[1].message}</p>
                <span id="reviewUserName">- {message[1].name}</span>
            </div>

            <div className="reviewItemInfo">
                <p id="userReview">{message[2].message}</p>
                <span id="reviewUserName">- {message[2].name}</span>
            </div>
            
        </div>
    </div>

  )
  :(
    <div className="loading" style={{display : "flex", justifyContent : 'center'}}>
          <p>Loading....</p>
        </div>
  )
}

export default Component2