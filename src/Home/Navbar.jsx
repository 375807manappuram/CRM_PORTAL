import React, { useEffect, useState } from 'react';
import { BiMenuAltRight } from 'react-icons/bi';
import '../styles/navbar.css';
import logo from '../images/logo.png';
import logo2 from '../images/image.png';
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from '../context/auth';
import toast from 'react-hot-toast';

const Navbar = () => {
    const [auth, setAuth] = useAuth();
    const [color, setColor] = useState(false);
    const navigate = useNavigate();

    const changeColor = () => {
        if (window.scrollY >= 90) {
            setColor(true);
        } else {
            setColor(false);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', changeColor);
        return () => {
            window.removeEventListener('scroll', changeColor);
        };
    }, []);
    const handleSubmit = () => {
        setAuth({ user: null });
        localStorage.removeItem('auth');
        toast.success('Logged Out Successfully');
        navigate('/login'); // Redirect to login after logout
    };
    
    return (
        <header className={color ? 'header_wrapper header-scrolled' : 'header_wrapper'}>
            <nav className="navbar navbar-expand-lg fixed-top">
                <div className="container-fluid mx-3">
                    <Link to='/'>
                        <img src={logo2} style={{ width: '300px' }} alt="Logo" />
                    </Link>
                    <button className="navbar-toggler pe-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <BiMenuAltRight size={35} />
                    </button>
                    <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                        <ul className="navbar-nav menu-navbar-nav">
                            <Link to='/' style={{ textDecoration: 'none' }}>
                                <li className="nav-item">
                                    <a className="nav-link" aria-current="page">Home</a>
                                </li>
                            </Link>
                            <Link to='/about' style={{ textDecoration: 'none' }}>
                                <li className="nav-item">
                                    <a className="nav-link" aria-current="page">About</a>
                                </li>
                            </Link>
                            <Link to='/#footer' style={{ textDecoration: 'none' }}>
                                <li className="nav-item">
                                    <a className="nav-link" aria-current="page">Contact Us</a>
                                </li>
                            </Link>
                            
                            {/* <Link to='/customer' style={{ textDecoration: 'none' }}>
                                <li className="nav-item">
                                    <a className="nav-link" aria-current="page">Services</a>
                                </li>
                            </Link> */}
                        </ul>
    
                        {!auth.user ? (
                            <ul className='mt-2 text-center'>
                                <Link to='/login' style={{ textDecoration: 'none' }} className="nav-item text-center">
                                    <a className="nav-link learn-more-btn btn-extra-header" aria-current="page">Login</a>
                                </Link>
                                <Link to='/register' style={{ textDecoration: 'none' }} className="nav-item text-center">
                                    <a className="nav-link learn-more-btn" aria-current="page">Register</a>
                                </Link>
                            </ul>
                        ) : (
                            <ul className='mt-2 text-center'>
                                <Link to={`/dashboard/${auth.user.userType === "admin" ? "admin" : "user"}`} style={{ textDecoration: 'none' }} className="nav-item text-center">
                                    <a className="nav-link learn-more-btn" aria-current="page">Dashboard</a>
                                </Link>
                                
                                <Link onClick={handleSubmit} to='/login' style={{ textDecoration: 'none' }} className="nav-item text-center">
                                    <a className="nav-link learn-more-btn-logout" aria-current="page">Logout</a>
                                </Link>
                            </ul>
                        )}
                    </div>
                </div>
            </nav>
        </header>
    );
}    
export default Navbar
