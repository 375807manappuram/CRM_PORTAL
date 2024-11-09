import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/auth';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import login from '../images/login.png';
import '../styles/hero.css';
import '../styles/auth.css';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [userType, setUserType] = useState("admin"); // Default userType
    const [, setAuth] = useAuth(); // Only destructure setAuth
    const navigate = useNavigate();
    const location = useLocation();

    const validateEmail = (email) => {
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return emailPattern.test(email);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email.trim()) {
            toast.error('Email is required');
            return false;
        }
        if (!validateEmail(email)) {
            toast.error('Invalid Email Format');
            return false;
        }
        try {
            const url = 'https://localhost:7294/API/Login';
            const data = {              
                email: email,
                password: password,
                userType: userType, // Include userType in the request body
            };
            const result = await axios.post(url, data);

            // Accessing the user data and status message from the response
            const user = {
                id: result.data.id,
                name: result.data.name,
                email: result.data.email,
                phno: result.data.phno,
                address: result.data.address,
                userType: result.data.userType, // Ensure this is set correctly
                empcode: result.data.empcode,
            };
            const message = result.data.status.message;

            toast.success(message);
            setAuth({ user }); // Set the user in auth context
            localStorage.setItem('auth', JSON.stringify({ user }));

            // Redirect to the Admin Dashboard if the user is an admin
            if (user.userType === "admin") {
                navigate('/dashboard/admin');
            } else {
                navigate(location.state || '/'); // Redirect to the previous location or home
            }

        } catch (err) {
            console.log(err);
            toast.error('Login failed. Please try again.');
        }
    }

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <div className='marginStyle'>
                <div class="container d-flex justify-content-center align-items-center">
                    <div class="row border rounded-5 p-3 bg-white shadow box-area reverseCol">
                        <div class="col-md-6 rounded-4 d-flex justify-content-center align-items-center flex-column left-box">
                            <div class="featured-image mb-3 animateImg">
                                <img src={login} class="img-fluid" width={500} />
                            </div>
                        </div>
                        <form class="col-md-6 right-box">
                            <div class="row align-items-center">
                                <div class="header-text mb-4">
                                    <h2>Welcome</h2>
                                    <p>We are happy to have you back !</p>
                                </div>
                                <div class="input-group d-flex  align-items-center mb-3">
                                    <div class="form-outline flex-fill mb-0">
                                        <input value={email} onChange={(e) => setEmail(e.target.value)} required type="email" placeholder='Enter Your email ID' class="form-control" />
                                    </div>
                                </div>
                                <div class="input-group d-flex flex-row align-items-center mb-3">
                                    <div class="form-outline flex-fill mb-0">
                                        <input value={password} onChange={(e) => setPassword(e.target.value)} required type="password" placeholder='Enter Your password' class="form-control" />
                                    </div>
                                </div>
                                <div class="d-flex flex-row align-items-center mt-4 ">
                                    <div class="form-outline flex-fill mb-0">
                                        <button class="btn btn-lg  text-white" type="button" onClick={handleSubmit} style={{ backgroundColor: 'blueviolet', width: '100%' }} >Login</button>
                                    </div>
                                </div>
                                <div class="d-flex flex-row align-items-center my-3 ">
                                    <div class="form-outline flex-fill mb-0 " >
                                        <Link to='/register' class="btn btn-outline-dark btn-lg btn-block" style={{ width: '100%' }} type="button">Register</Link>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div >
            </div >
        </>
    )
}

export default Login
