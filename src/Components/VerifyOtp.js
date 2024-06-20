import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import ChangePassword from './ChangePassword';  

function VerifyOtp({ mail }) {
    const [otp, setOtp] = useState("");
    const [alert, setAlert] = useState(false);
    const [navigate, setNavigate] = useState(false);
    const [showOtpComponent, setShowOtpComponent] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(`http://localhost:8080/forgotPassword/verifyOtp/${otp}/${mail}`);
            console.log(data);
            console.log(mail);
            setNavigate(true);
            setShowOtpComponent(true);
        } catch (error) {
            console.error("Error verifying OTP:", error);
            setAlert(true);
        }
    };

    if (navigate) {
        return <Navigate to='/password' />;
    }

    return (
        <div>
            {showOtpComponent ? (
                <ChangePassword email = { mail } />
            ) : (
                <div className='d-flex justify-content-center mt-5'>
                    <form className='w-50 mt-5 bg-dark p-5 rounded-5' onSubmit={handleSubmit}>
                        {alert && 
                            <div className="alert alert-danger text-center" role="alert">
                                INVALID OTP
                            </div>
                        }
                        <div className="mb-3">
                            <label htmlFor="otpInput" className="form-label text-white">Enter OTP</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                id="otpInput" 
                                onChange={e => setOtp(e.target.value)}
                                required
                            />
                        </div>
                        <div className='text-center'>
                            <button type="submit" className="btn btn-primary btn-lg mt-3">Verify OTP</button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
}

export default VerifyOtp;
