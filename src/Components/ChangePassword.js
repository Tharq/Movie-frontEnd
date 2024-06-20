import React, { useState } from 'react'
import axios from 'axios';
import { Navigate } from 'react-router-dom';

function ChangePassword({ email }) {
    const[password1,setPassword1] = useState("");

    const [password2,setPassword2] = useState("");
    const [alert, setAlert] = useState(false);
    const [navigate, setNavigate] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const user = {
            "password" : password1,
            "repeatPassword" : password2
        }
        try {
            const { data } = await axios.post(`http://localhost:8080/forgotPassword/updatePassword/${email}`,user);
            console.log(data);
            setNavigate(true);
        } catch (error) {
            console.error("Error verifying OTP:", error);
            setAlert(true);
        }
    };

    if (navigate) {
        return <Navigate to='/' />; 
    }

    return (
        <div className='d-flex justify-content-center mt-5'>
            <form className='w-50 mt-5 bg-dark p-5 rounded-5' onSubmit={handleSubmit}>
                {alert && 
                    <div className="alert alert-danger text-center" role="alert">
                        INVALID PASSWORD
                    </div>
                }
                <div className="mb-3">
                    <label htmlFor="otpInput" className="form-label text-white">Enter Password</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="otpInput" 
                        onChange={e => setPassword1(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="otpInput" className="form-label text-white">Re-Enter Password</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="otpInput" 
                        onChange={e => setPassword2(e.target.value)}
                        required
                    />
                </div>
                <div className='text-center'>
                    <button type="submit" className="btn btn-primary btn-lg mt-3">Change Password</button>
                </div>
            </form>
        </div>
    );
}

export default ChangePassword
