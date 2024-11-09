import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { ColorRing } from 'react-loader-spinner';
import { PiCurrencyInrFill } from 'react-icons/pi';
import AdminMenu from '../admin/AdminMenu'; // Corrected import statement

const CarView = () => {
    const params = useParams();
    const [car, setCar] = useState(null);
    const [loading, setLoading] = useState(true);

    const getCar = async () => {
        try {
            debugger;
            // Fetch the car details by id using query parameters
            const { data } = await axios.get(`https://localhost:7294/API/SearchCar?Id=${params.id}`); // Use query parameter
            setCar(data); // Assuming the response contains the car object directly
            setLoading(false);
        } catch (err) {
            console.error(err);
            setLoading(false);
        }
    };

    useEffect(() => {
        debugger;
        if (params.id) {
            getCar();
        } else {
            console.error('Car ID is missing');
        }
        window.scrollTo(0, 0);
    }, [params.id]);

    return (
        <div className='container marginStyle'>
            <div className='row'>
                <div className='col-md-3'>
                    {/* <AdminMenu /> Include AdminMenu here */}
                </div>
                <div className='col-md-9'>
                    {loading ? (
                        <div className="h-100 d-flex align-items-center justify-content-center">
                            <ColorRing
                                visible={true}
                                colors={['#000435', 'rgb(14 165 233)', 'rgb(243 244 246)', '#000435', 'rgb(14 165 233)']}
                            />
                        </div>
                    ) : car ? (
                        <div className="row">
                            <div className="col-md-6 text-center">
                                {car.pic ? (
                                    <img src={car.pic} alt={car.carName} style={{ maxWidth: '100%', maxHeight: '300px', objectFit: 'contain' }} />
                                ) : (
                                    <p>No image available</p>
                                )}
                            </div>
                            <div className="col-md-6">
                                <h3 className="mb-3">{car.brandName} {car.carName}</h3>
                                <h4>Price: <PiCurrencyInrFill /> {car.price} Lakhs</h4>
                                <h5>Country: {car.country}</h5>
                                <h5>Year: {car.year}</h5>
                                <h5>Warranty: {car.warranty}</h5>
                                <h5>Description: {car.description}</h5>
                            </div>
                        </div>
                    ) : (
                        <p>Car not found.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CarView;
