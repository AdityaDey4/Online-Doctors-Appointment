
import { faEnvelope, faLocationDot, faPhone } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const Footer = () => {
  return (
    <footer className="footer">

        <div className="footer-wrapper">
        
            <div className="footer-wrapper-binding">

                <div className="footer-wrapper-binding-Item">
                    <span id="company-name">XYZ Health Care</span>
                </div>

                <div className="footer-wrapper-binding-Item">
                    <FontAwesomeIcon icon={faEnvelope} />
                    <span>abc@gmail.com</span>
                </div>
    
                <div className="footer-wrapper-binding-Item">
                    <FontAwesomeIcon icon={faLocationDot} />
                    <span>Kolkata, India</span>
                </div>
    
                <div className="footer-wrapper-binding-Item">
                    <FontAwesomeIcon icon={faPhone} />
                    <span>+91 9876543210</span>
                </div>

            </div>

            <div className="footer-wrapper-link">

                <div className="footer-wrapper-link-list">

                    <li><span>Company</span></li>
                    <li></li>
                    <li>About Us</li>
                    <li>Career</li>
                    <li>Privacy Policy</li>
                    <li>Terms of Services</li>
                </div>

                <div className="footer-wrapper-link-list">

                    <li><span>Services</span></li>
                    <li></li>
                    <li>Tooth Check up</li>
                    <li>Tooth Extraction</li>
                    <li>Fever</li>
                    <li>Disease</li>
                    <li>Mental Check Up</li>
                </div>

                <div className="footer-wrapper-link-list">

                    <li><span>Contribute</span></li>
                    <li></li>
                    <li>Net Banking</li>
                    <li>BHIM UPI</li>
                    <li>Patrion</li>
                </div>
            </div>

        </div>

        <div className="footer-strip">
            <span>Copyright 2023 &copy; All Rihgts Reserved</span>
        </div>
    </footer>
  )
}

export default Footer