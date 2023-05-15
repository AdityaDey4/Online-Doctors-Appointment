import { useState, useEffect, useRef } from "react"
import useAuth from "../hooks/useAuth";
import axios from "../api/axios";
import { useNavigate, useLocation } from "react-router-dom"

const ContactUs = () => {

    const messageRef = useRef();
    const errRef = useRef();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location?.state?.from?.pathname || '/';

    const {auth} = useAuth();

    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [errMsg, setErrMsg] = useState('');

    useEffect(()=> {

       const getPatient = async ()=> {
            try {
                const response = await axios.get(`patients/${auth.email}`);

                setFullName(response.data.name);
                setEmail(response.data.email);
            }catch(err) {
                setErrMsg(err.message);
            }
       }

       getPatient();
    }, [])

    useEffect(()=> {
        setErrMsg('');
    }, [fullName, email, message])

    // need to modify
    const handleSubmit = async (e)=> {

        e.preventDefault();
        try {

            const response = await axios.post(
                '/messages',
                JSON.stringify({
                    name : fullName,
                    email, 
                    message
                }),
                {
                    headers : {"Content-Type" : "application/json"},
                    withCredentials : true
                }
            )

            navigate(from, {replace : true});
        }catch(err) {
            setErrMsg(err.message);
        }
    }
  return (
    <div className="contact-page">
        <section className="mid-window">
            <p
                ref={errRef}
                className={errMsg ? "errMsg" : "offscreen"}
                aria-live="assertive"
            >
             {errMsg}
            </p>
            <h3>Your Message</h3>
            <h1>Always Connect With Us</h1>
            <form className="contact-form" onSubmit={handleSubmit}>
                <label htmlFor="fullname">Full Name :</label>
                <input
                    type="text"
                    id="fullname"
                    autoComplete="off"
                    onChange={(e) => setFullName(e.target.value)}
                    value={fullName}
                    disabled={true}
                    required
                />

                <label htmlFor="email">Email :</label>
                <input 
                    type="email"
                    id="email"
                    disabled={true}
                    onChange={(e)=> setEmail(e.target.value)}
                    value={email}
                    required
                />

                <label htmlFor="message">Message to us :</label>
                <textarea
                    type="text"
                    id="message"
                    ref={messageRef}
                    rows={5}
                    onChange={(e) => setMessage(e.target.value)}
                    value={message}
                    required
                />

                <button 
                    id="contact-bt"
                    disabled={!fullName || !email || !message}
                >Submit</button>
            </form>
        </section>
    </div>
  )
}

export default ContactUs