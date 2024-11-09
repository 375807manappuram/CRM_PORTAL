import React, { useEffect, useState } from 'react';
import AdminMenu from './AdminMenu';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Loading from './Loading';
import toast from 'react-hot-toast';

const CreateCar = () => {
    const [brand, setBrand] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [productPictures, setProductPictures] = useState([]);
    const [price, setPrice] = useState('');
    const [warranty, setWarranty] = useState('');
    const [loading, setLoading] = useState(false);
    const [country, setCountry] = useState('');
    const [year, setYear] = useState('');

    const navigate = useNavigate();

    const validateForm = () => {
        if (!brand.trim()) {
            toast.error('Car Brand is required');
            return false;
        }
        if (productPictures.length === 0) {
            toast.error('Please Provide at least one Image');
            return false;
        }
        if (!name.trim()) {
            toast.error('Car name is required');
            return false;
        }
        if (!price.trim() || isNaN(price)) {
            toast.error('Valid Price is required');
            return false;
        }
        if (!warranty.trim()) {
            toast.error('Warranty is required');
            return false;
        }
        if (!description.trim()) {
            toast.error('Description is required');
            return false;
        }
        if (!country.trim()) {
            toast.error('Country is required');
            return false;
        }
        if (!year.trim() || isNaN(year)) {
            toast.error('Valid Year is required');
            return false;
        }
        return true;
    };
    debugger;
    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setProductPictures(files);
    };

    const convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                resolve(reader.result); // This will be the base64 string
            };
            reader.onerror = (error) => {
                reject(error);
            };
        });
    };
    const clear = () => {
        setName('');
        setBrand('');
        setDescription('');
        setPrice('');
        setWarranty('');
      //  setLoading('');
        setCountry('');
        setYear('');
        setProductPictures(''); 
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) {
            return;
        }
        try {
            setLoading(true);
            const carData = {
                carName: name,
                price: parseFloat(price),
                country: country,
                year: parseInt(year),
                description: description,
                warranty: warranty,
                brandName: brand,
                pic: productPictures.length > 0 ? await convertToBase64(productPictures[0]) : '' // Assuming you want the first image as 'pic'
            };

            const { data } = await axios.post('https://localhost:7294/API/AddCars', carData);

            if (data.status.code === 1) {
                toast.success('Car Created Successfully');
                clear();
                // navigate('/dashboard/admin/cars');
            } else {
                toast.error('Error in Car creation: ' + data.status.message);
            }
        } catch (err) {
            console.log(err);
            toast.error('An error occurred while creating the car.'); // General error message
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className='container marginStyle' style={{ marginTop: '40px' }}>
            {!loading ? (
                <div className='container-fluid'>
                    <div className='row'>
                        <div className='col-md-3'>
                            <AdminMenu />
                        </div>
                        <div className='col-md-9 my-3'>
                            <form method='post' encType="multipart/form-data" onSubmit={handleSubmit}>
                                <h1 className='text-center'>Create Car</h1>
                                <div className='m-1'>
                                    <div className='mb-3'>
                                        <input
                                            type='text'
                                            value={brand}
                                            placeholder='Enter Car Brand'
                                            className='form-control'
                                            onChange={(e) => setBrand(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className='mb-3'>
                                        <input
                                            type='text'
                                            value={name}
                                            placeholder='Write a car name'
                                            className='form-control'
                                            onChange={(e) => setName(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className='mb-3'>
                                        <input
                                            type='text'
                                            value={price}
                                            placeholder='Write only car amount price not include Lakhs, Cr, Rupees etc...'
                                            className='form-control'
                                            onChange={(e) => setPrice(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className='mb-3'>
                                        <input
                                            type='text'
                                            value={country}
                                            placeholder='Write the country of origin'
                                            className='form-control'
                                            onChange={(e) => setCountry(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className='mb-3'>
                                        <input
                                            type='text'
                                            value={year}
                                            placeholder='Write the year of manufacture'
                                            className='form-control'
                                            onChange={(e) => setYear(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className='mb-3'>
                                        <input
                                            type='text'
                                            value={warranty}
                                            placeholder='Write a car warranty'
                                            className='form-control'
                                            onChange={(e) => setWarranty(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className='mb-3'>
                                        <textarea
                                            rows={3}
                                            value={description}
                                            placeholder='Write a car description'
                                            className='form-control'
                                            onChange={(e) => setDescription(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className='mb-3'>
                                        <label className='btn btn-outline-primary col-md-12'>
                                            Upload Images
                                            <input
                                                type='file'
                                                name='productPictures'
                                                accept='image/*'
                                                multiple
                                                onChange={handleImageChange}
                                                hidden
                                            />
                                        </label>
                                    </div>
                                    <div className='mb-3'>
                                        {productPictures.length > 0 && (
                                            <div className='text-center'>
                                                <h5>Uploaded Images:</h5>
                                                {productPictures.map((image, index) => (
                                                    <img
                                                        key={index}
                                                        src={URL.createObjectURL(image)}
                                                        alt={`car_image_${index}`}
                                                        className='img img-fluid'
                                                        style={{ width: '100px', margin: '5px' }}
                                                    />
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                    <div className='mb-3 d-flex justify-content-center'>
                                        <button type='submit' className='btn btn-success'>
                                            Create Car
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            ) : <Loading />}
        </div>
    );
};

export default CreateCar;

