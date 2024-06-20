import React, { useState } from 'react';
import axios from 'axios';
import VerifyOtp from './VerifyOtp';
import { Navigate } from 'react-router-dom';

function EmailVerification() {
    const [email, setEmail] = useState("");
    const [alert, setAlert] = useState(false);
    const [showOtpComponent, setShowOtpComponent] = useState(false);
    const [navigate,setNavigate] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(`http://localhost:8080/forgotPassword/verifyEmail/${email}`);
            console.log(data);
            setShowOtpComponent(true);
            setNavigate(true);
        } catch (error) {
            console.error("Error sending email:", error);
            setAlert(true);
        }
    };

    if(navigate){
        <Navigate to="verifyOtp"/>
    }

    return (
        <div>
            {showOtpComponent ? (
                <VerifyOtp mail={email} />
            ) : (
                <div className='d-flex justify-content-center mt-5'>
                    <form className='w-50 mt-5 bg-dark p-5 rounded-5' onSubmit={handleSubmit}>
                        {alert && 
                            <div className="alert alert-success text-danger" role="alert">
                                Invalid Email 
                            </div>
                        }
                        <div className="mb-3">
                            <label htmlFor="emailInput" className="form-label text-white">Email</label>
                            <input 
                                type="email" 
                                className="form-control" 
                                id="emailInput" 
                                onChange={e => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className='text-center'>
                            <button type="submit" className="btn btn-primary btn-lg mt-3">Send OTP</button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
}

export default EmailVerification;
