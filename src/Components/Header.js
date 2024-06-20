import React, { useState } from 'react';
import axios from 'axios';
import { Link, Navigate } from 'react-router-dom';
import AddMovie from './AddMovie'; // Import the AddMovie component

function Header() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [navigate, setNavigate] = useState(false);
    const [alert, setAlert] = useState(false);
    const [token, setToken] = useState(null); // State to store token

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (username === '' || password === '') {
            setAlert(true);
            return;
        }
        const user = {
            "userName": username,
            "password": password
        };
        try {
            const { data } = await axios.post("http://localhost:8080/api/v1/auth/login", user, { withCredentials: true });

            console.log(data);

            // Store token in local storage
            localStorage.setItem('token', data['accessToken']);
            localStorage.setItem('role', data['role']);

            setToken(data['accessToken']); // Set token in state
            setNavigate(true);
        } catch (error) {
            setAlert(true);
        }
    }

    if (navigate) {
        return <Navigate to='/home' />;
    }

    return (
        <div>
            <div className='d-flex justify-content-center mt-5 '>
                <form className='w-50 mt-5 bg-dark p-5 rounded-5' onSubmit={handleSubmit}>
                    {alert &&
                        <div className="alert alert-danger text-danger" role="alert">
                            Please Enter the Details
                        </div>
                    }
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label text-white">Username</label>
                        <input className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={e => setUsername(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label text-white">Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" onChange={e => setPassword(e.target.value)} />
                    </div>
                    <div className='text-center'>
                        <button type="submit" className="btn btn-primary btn-lg mt-3">Login</button>
                    </div>
                    <p className='text-white mt-3 text-center'>Don't have an account? <Link to='/register' className='text-primary'>Sign up</Link></p>
                    <div className='text-center'>
                        <Link className='text-white mt-3 text-center' to="/verification">Forget password</Link>
                    </div>
                </form>
            </div>
            {token && <AddMovie token={token} />} 
        </div>
    );
}

export default Header;
