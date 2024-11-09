import React, { useEffect, useState } from 'react';
import AdminMenu from './AdminMenu';
import axios from 'axios';
import { PiCurrencyInrFill } from 'react-icons/pi';
import toast from 'react-hot-toast';
import { ColorRing } from 'react-loader-spinner';
import { Link } from 'react-router-dom';

const Cars = () => {
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);

    const getAllCars = async () => {
        try {
            const response = await fetch("https://localhost:7294/API/AllCars", {
                method: "GET",
                headers: { "Content-type": "application/json" }
            });
            const data = await response.json();
            setCars(data.cars.reverse());
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(true);
        }
    };

    const handleDelete = async (id) => {
        debugger;
        try {
            // Send the DELETE request with the car ID in the request body
            const { data } = await axios.delete("https://localhost:7294/API/DeleteCar", {
                data: { id } // Sending the ID in the request body
            });
    
            // Check the response status
            if (data?.status?.code === 1) { // Assuming code 1 indicates success
                toast.success('Car Deleted !!');
                getAllCars(); // Refresh the car list
            } else {
                toast.error('Error in Deleting car: ' + (data?.status?.message || 'Unknown error'));
            }
        } catch (err) {
            console.error(err);
            toast.error('An error occurred while deleting the car.');
        }
    };
    

    useEffect(() => {
        getAllCars();
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className='container marginStyle' style={{ marginTop: '40px' }}>
            <div className='container-fluid'>
                <div className='row'>
                    <div className='col-md-3'>
                        <AdminMenu />
                    </div>
                    <div className="col-md-9">
                        <h1 className="text-center my-3">All Cars List</h1>
                        {loading ?
                            <div className="h-100 d-flex align-items-center justify-content-center">
                                <ColorRing
                                    visible={true}
                                    colors={['#000435', 'rgb(14 165 233)', 'rgb(243 244 246)', '#000435', 'rgb(14 165 233)']}
                                />
                            </div>
                            :
                            <div className="row" style={{ marginTop: '0px' }}>
                                {cars.map((car) => (
                                    <div className="col-md-12 col-lg-4 mb-lg-0 my-3" key={car.id}>
                                        <div className="card d-flex flex-column" style={{ height: '100%' }}>
                                            <div className="card-body text-center d-flex flex-column justify-content-between">
                                                <h3 className="mb-3">{car.brandName}</h3>
                                                <img src={car.pic} alt={car.brandName} style={{ maxWidth: '100%', maxHeight: '300px', objectFit: 'contain' }} />
                                                <h5 className="mb-4 mt-3" style={{ color: 'black', fontWeight: 'bold' }}>{car.carName}</h5>
                                                <h5 style={{ color: 'black', fontWeight: 'bold' }}><PiCurrencyInrFill /> : {car.price} Lakhs</h5>
                                                <div className='my-2'>
                                                    <Link className='btn mt-2 text-white' to={`/car/${car.id}`} style={{ backgroundColor: 'blueviolet' }}>View</Link>
                                                    <Link to={`/dashboard/admin/car/${car.id}`} className='btn btn-primary mt-2 mx-2'>Update</Link>
                                                    <button onClick={() => handleDelete(car.id)} className='btn btn-danger mt-2'>Delete</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Cars;
