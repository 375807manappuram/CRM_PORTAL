import React, { useEffect, useState } from 'react';
import '../styles/hero.css';
//import axios from 'axios';
//import { Link } from 'react-router-dom';
import { ColorRing } from 'react-loader-spinner';

const Customer = () => {
   
    return (
        <div>
            <section id="brands" className="brand_wrapper">
                <div className="container">
                    <div className="row">
                        <div className="col-12 text-center mb-5">
                            <p className="brand_subtitle">Complaint State here!</p>
                            <h3 className="brand_title">We’re Here to Help: Submit a Complaint</h3>
                        </div>
                    </div>
                    {/* {loading ?
                        <div className="h-100 d-flex align-items-center justify-content-center">
                            <ColorRing
                                visible={true}
                                colors={['#000435', 'rgb(14 165 233)', 'rgb(243 244 246)', '#000435', 'rgb(14 165 233)']}
                            />
                        </div>
                        :
                        <div className="row justify-content-center">
                            {brands?.map((c, index) => (
                                <div key={index} className="col-lg-3 col-md-4 col-sm-6 mb-4 showcase_card">
                                    <Link to={`/brand/${c.slug}`}>
                                        <img
                                            src={c.brandPictures}
                                            className="mb-4 img-fluid"
                                            style={{ maxWidth: '100%', maxHeight: '190px', objectFit: 'contain' }}
                                            title={c.name}
                                        />
                                    </Link>
                                </div>
                            ))}
                        </div>
                    } */}
                </div>
            </section>
        </div>
    );
};

export default Customer;
