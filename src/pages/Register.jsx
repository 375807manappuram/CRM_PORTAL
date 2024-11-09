import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import register from '../images/register.png';
import toast from 'react-hot-toast';
import '../styles/hero.css';

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phno, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [userType, setUserType] = useState("customer"); // New state for user type
    const [empCode, setEmpCode] = useState(""); // New state for employee code
    const navigate = useNavigate();

    const validateEmail = (email) => {
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return emailPattern.test(email);
    };

    const clear = () => {
        setName('');
        setEmail('');
        setPassword('');
        setAddress('');
        setPhone('');
        setEmpCode(''); // Clear employee code
        setUserType('customer'); // Reset user type to default
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateEmail(email)) {
            toast.error('Invalid Email Format');
            return false;
        }
        if (!name.trim()) {
            toast.error('Name is required');
            return false;
        }
        if (!email.trim()) {
            toast.error('Email is required');
            return false;
        }
        if (!password.trim()) {
            toast.error('Password is required');
            return false;
        }
        if (!phno.trim()) {
            toast.error('Phone Number is required');
            return false;
        }
        if (!address.trim()) {
            toast.error('Address is required');
            return false;
        }
        if (userType !== 'customer' && !empCode.trim()) {
            toast.error('Employee Code is required for Admin/Employee');
            return false;
        }

        try {
            debugger;
            const url = 'https://localhost:7294/API/CreateCustomer';
            const data = {
                "name": name,
                "email": email,
                "password": password,
                "phno": phno,
                "address": address,
                "userType": userType, // Include user type in the data
                "empcode": userType === 'customer' ? 0 : empCode // Include empCode only if not customer
            };
            console.log(JSON.stringify(data));
            const result = await axios.post(url, data);
            console.log(JSON.stringify(result));
            toast.success(result.data.message);
            clear();
            navigate('/login');
        } catch (err) {
            // console.error(err.response ? err.response.data : err.message);
            toast.error('Server Error');
            // toast.error('Server Error');
        }
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);


    return (
        <div>
            <div className='marginStyle'>
                <div className="container d-flex justify-content-center align-items-center">
                    <div className="row border rounded-5 p-3 bg-white shadow box-area reverseCol">
                        <div className="col-md-6 rounded-4 d-flex justify-content-center align-items-center flex-column left-box">
                            <div className="featured-image mb-3 animateImg">
                                <img src={register} className="img-fluid" width={500} />
                            </div>
                        </div>
                        <div className="col-md-6 right-box">
                            <div className="row align-items-center">
                                <div className="header-text mb-4">
                                    <h2>Welcome</h2>
                                    <p>Register Here!</p>
                                </div>
                                 <div className="input-group d-flex flex-row align-items-center mb-3">
                                    <div className="form-outline flex-fill mb-0">
                                        <select value={userType} onChange={(e) => setUserType(e.target.value)} className="form-control">
                                            <option value="customer">Customer</option>
                                            <option value="admin">Admin</option>
                                            <option value="employee">Employee</option>
                                        </select>
                                    </div>
                                </div>
                                {userType !== 'customer' && (
                                    <div className="input-group d-flex flex-row align-items-center mb-3">
                                        <div className="form-outline flex-fill mb-0">
                                            <input value={empCode} onChange={(e) => setEmpCode(e.target.value)} type="text" placeholder='Enter Your Employee Code' className="form-control" />
                                        </div>
                                    </div>
                                )}
                                <div className="input-group d-flex align-items-center mb-3">
                                    <div className="form-outline flex-fill mb-0">
                                        <input value={name} onChange={(e) => setName(e.target.value)} placeholder='Enter Your name' required type="text" className="form-control" />
                                    </div>
                                </div>
                                <div className="input-group d-flex flex-row align-items-center mb-3">
                                    <div className="form-outline flex-fill mb-0">
                                        <input value={email} onChange={(e) => setEmail(e.target.value)} required type="email" placeholder='Enter Your email ID' className="form-control" autoComplete="true"/>
                                    </div>
                                </div>
                                <div className="input-group d-flex flex-row align-items-center mb-3">
                                    <div className="form-outline flex-fill mb-0">
                                        <input value={password} onChange={(e) => setPassword(e.target.value)} required type="password" placeholder='Enter Your password' className="form-control" />
                                    </div>
                                </div>
                                <div className="input-group d-flex flex-row align-items-center mb-3">
                                    <div className="form-outline flex-fill mb-0">
                                        <input value={phno} onChange={(e) => setPhone(e.target.value)} type="number" required placeholder='Enter Your phone no' className="form-control" />
                                    </div>
                                </div>
                                <div className="input-group d-flex flex-row align-items-center mb-3">
                                    <div className="form-outline flex-fill mb-0">
                                        <input value={address} onChange={(e) => setAddress(e.target.value)} type="text" required placeholder='Enter Your address' className="form-control" />
                                    </div>
                                </div>
                               
                                <div className="d-flex flex-row align-items-center mt-4">
                                    <div className="form-outline flex-fill mb-0">
                                        <button className="btn btn-lg text-white" type="button" onClick={handleSubmit} style={{ backgroundColor: 'blueviolet', width: '100%' }}>Register</button>
                                    </div>
                                </div>
                                <div className="d-flex flex-row align-items-center my-3">
                                    <div className="form-outline flex-fill mb-0">
                                        <Link to='/login' className="btn btn-outline-dark btn-lg btn-block" style={{ width: '100%' }} type="button">Login</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Register
