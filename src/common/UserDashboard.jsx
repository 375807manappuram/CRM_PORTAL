import { useAuth } from '../context/auth'
import UserMenu from './UserMenu'
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Spinner from '../admin/Spinner';

const UserDashboard = () => {
    const [auth] = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
        debugger;
        if (!auth.user || auth.user.userType !== 'customer') {
            navigate('/login');
        }
    }, [auth, navigate]);

    if (!auth.user) {
        return <Spinner />;
    }
    return (
        <div className='container marginStyle'>
            <div className='container-fluid'>
                <div className='row'>
                    <div className='col-md-3'>
                        <UserMenu />
                    </div>
                    <div className='col-md-9 mt-4'>
                        <h3>hai ,</h3>
                        <h4 className='text-center'>Welcome, {auth?.user?.name}.Here you can explore your favourite brands and register your complaints..</h4>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserDashboard
