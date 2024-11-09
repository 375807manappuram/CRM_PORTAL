import React, { useEffect } from 'react';
import AdminMenu from './AdminMenu';
import { useAuth } from '../context/auth';
import { useNavigate } from 'react-router-dom';
import Spinner from '../admin/Spinner';

const AdminDashboard = () => {
    const [auth] = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
        debugger;
        if (!auth.user || auth.user.userType !== 'admin') {
            navigate('/login');
        }
    }, [auth, navigate]);

    if (!auth.user) {
        return <Spinner />;
    }

    return (
        // <div className='container marginStyle'>
        <div className='container' style={{ marginTop: '40px' }}>
            <div className='container-fluid'>
                <div className='row'>
                    <div className='col-md-3'>
                        <AdminMenu />
                    </div>
                    <div className='col-md-9 mt-4'>
                        <h3 className='text-center'>Welcome, {auth.user.name}</h3>
                        <p className='text-center'>You are logged in as an Admin.</p>
                        <div className='admin-content'>
                            <h4>Admin Dashboard</h4>
                            <p>Here you can manage users, view reports, and perform administrative tasks.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminDashboard;
