import React, { useEffect, useState } from 'react';
import AdminMenu from './AdminMenu';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import Spinner from '../admin/Spinner'; // Import the Spinner component
import { FaEdit, FaTrash } from 'react-icons/fa'; // Import icons for edit and delete
import '../styles/cars.css';
import axios from 'axios';

const UpdateCar = () => {
    const params = useParams();
    const [brandName, setBrand] = useState('');
    const [carName, setName] = useState('');
    const [price, setPrice] = useState('');
    const [country, setCountry] = useState('');
    const [year, setYear] = useState('');
    const [description, setDescription] = useState('');
    const [warranty, setWarranty] = useState('');
    const [id, setId] = useState(params.id);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false); // State to toggle edit mode
    const navigate = useNavigate();

    const getCars = async () => {
        setLoading(true);
        try {
            const response = await fetch(`https://localhost:7294/API/SearchCar?Id=${params.id}`, {
                method: "GET",
                headers: { "Content-type": "application/json" }
            });
            const data = await response.json();
            console.log(data);
            if (data && data.status.code === 1) {
                setBrand(data.brandName || '');
                setName(data.carName || '');
                setPrice(data.price || '');
                setCountry(data.country || '');
                setYear(data.year || '');
                setDescription(data.description || '');
                setWarranty(data.warranty || '');
            } else {
                toast.error(data.status.message || 'Error fetching car details');
            }
        } catch (error) {
            console.log(error);
            toast.error('Error fetching car details');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getCars();
        window.scrollTo(0, 0);
    }, [id]);

    const updateCarDetails = async () => {
        debugger;
        setLoading(true);
        try {
            const response = await fetch(`https://localhost:7294/API/UpdateCarDetails?Id=${params.id}&CarName=${carName}&price=${price}&country=${country}&Year=${year}&Warranty=${warranty}&Description=${description}`, {
                method: "PUT", // Use PUT method for updating
                headers: { "Content-type": "application/json" }
            });
            const data = await response.json();
            if (data && data.status.code === 1) {
                toast.success(data.status.message);
              //  navigate('/cars'); // Redirect to the cars list or another page after successful update
            } else {
                toast.error(data.status.message || 'Error updating car details');
            }
        } catch (error) {
            console.log(error);
            toast.error('Error updating car details');
        } finally {
            setLoading(false);
        }
    };

    const handleEditToggle = () => {
        console.log("Toggling edit mode. Current state:", isEditing); // Debugging log
        setIsEditing(prev => !prev); // Toggle edit mode
    };

    const handleSaveChanges = async () => {
        console.log("Saving changes..."); // Debugging log
        await updateCarDetails(); // Call the update function
        setIsEditing(false); // Exit edit mode after saving
    };

    const handleDelete = async (id) => {
            debugger;
            try {
                const { data } = await axios.delete("https://localhost:7294/API/DeleteCar", {
                    data: { id } // Sending the ID in the request body
                });
        
                // Check the response status
                if (data?.status?.code === 1) { // Assuming code 1 indicates success
                    toast.success('Car Deleted !!');
                } else {
                    toast.error('Error in Deleting car: ' + (data?.status?.message || 'Unknown error'));
                }
            } catch (err) {
                console.error(err);
                toast.error('An error occurred while deleting the car.');
            }
    };

    if (loading) {
        return <Spinner />;
    }

    return (
        <div className='container marginStyle' style={{ marginTop: '40px' }}>
            <div className='container-fluid'>
                <div className='row'>
                    <div className='col-md-3'>
                        <AdminMenu />
                    </div>
                    <div className='col-md-9 my-3 d-flex justify-content-center'> {/* Added Flexbox for centering */}
                        <div className='card shadow' style={{ width: '100%', maxWidth: '800px' }}> {/* Set width and max width */}
                            <div className='card-body'>
                                <h1 className='text-center text-primary' style={{ fontWeight: 'bold', fontSize: '2.5rem', textTransform:                                    'uppercase' }}>
                                    Update Car
                                </h1>
                                <div className='m-1'>
                                    <div className='mb-3 text-center text-black'>
                                        <strong>Brand Name:</strong> {brandName}
                                        <FaEdit onClick={handleEditToggle} style={{ cursor: 'pointer', marginLeft: '10px' }} />
                                        <FaTrash onClick={handleDelete} style={{ cursor: 'pointer', marginLeft: '10px', color: 'red' }} />
                                    </div>
                                    <div className='mb-3 text-center text-black'>
                                        <strong>Car Name:</strong> {carName}
                                    </div>
                                    <div className='mb-3 text-center text-black'>
                                        <strong>Car Price:</strong> {price}
                                    </div>
                                    <div className='mb-3 text-center text-black'>
                                        <strong>Originated Country:</strong> {country}
                                    </div>
                                    <div className='mb-3 text-center text-black'>
                                        <strong>Launched Year:</strong> {year}
                                    </div>
                                    <div className='mb-3 text-center text-black'>
                                        <strong>Car Warranty:</strong> {warranty}
                                    </div>
                                    <div className='mb-3 text-center text-black'>
                                        <strong>Description:</strong> {description}
                                    </div>

                                    {isEditing && (
                                        <div>
                                            <h3 className='text-center'>Edit Car Details</h3>
                                            <div className='mb-3'>
                                                <input
                                                    type='text'
                                                    value={brandName}
                                                    placeholder='Brand Name'
                                                    className='form-control'
                                                    onChange={(e) => setBrand(e.target.value)}
                                                />
                                            </div>
                                            <div className='mb-3'>
                                                <input
                                                    type='text'
                                                    value={carName}
                                                    placeholder='Car Name'
                                                    className='form-control'
                                                    onChange={(e) => setName(e.target.value)}
                                                />
                                            </div>
                                            <div className='mb-3'>
                                                <input
                                                    type='number'
                                                    value={price}
                                                    placeholder='Car Price'
                                                    className='form-control'
                                                    onChange={(e) => setPrice(e.target.value)}
                                                />
                                            </div>
                                            <div className='mb-3'>
                                                <input
                                                    type='text'
                                                    value={country}
                                                    placeholder='Originated Country'
                                                    className='form-control'
                                                    onChange={(e) => setCountry(e.target.value)}
                                                />
                                            </div>
                                            <div className='mb-3'>
                                                <input
                                                    type='number'
                                                    value={year}
                                                    placeholder='Launched Year'
                                                    className='form-control'
                                                    onChange={(e) => setYear(e.target.value)}
                                                />
                                            </div>
                                            <div className='mb-3'>
                                                <input
                                                    type='text'
                                                    value={warranty}
                                                    placeholder='Car Warranty'
                                                    className='form-control'
                                                    onChange={(e) => setWarranty(e.target.value)}
                                                />
                                            </div>
                                            <div className='mb-3'>
                                                <textarea
                                                    rows={3}
                                                    value={description}
                                                    placeholder='Description'
                                                    className='form-control'
                                                    onChange={(e) => setDescription(e.target.value)}
                                                />
                                            </div>
                                            <div className='mb-3 text-center'>
                                                <button className='btn btn-success mx-2' onClick={handleSaveChanges}>Save Changes</button>
                                                <button className='btn btn-danger' onClick={handleEditToggle}>Cancel</button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UpdateCar;

