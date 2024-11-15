import React from 'react'
import '../styles/faq.css'
import faq from '../images/search.png'

const Faq = () => {
    return (
        <div>
            <section id="faqs" className="faq_wrapper mb-5">
                <div className="container">
                    <div className="row">
                        <div className="col-12 text-center mb-5">
                            <p className="faq_subtitle">We're here to help</p>
                            <h2 className="faq_title">Frequently asked questions</h2>
                        </div>
                    </div>
                    <div className="row align-items-center">
                        <div className="col-sm-12 col-lg-7 mb-5 mb-lg-0">
                            <div className="accordion accordion-flush" id="accordionExample">
                                <div className="accordion-item">
                                    <h2 className="accordion-header" id="headingOne">
                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                                            1. Do You Offer A Warranty ?
                                        </button>
                                    </h2>
                                    <div id="collapseOne" className="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                        <div className="accordion-body">
                                            Yes, we  offers warranty. Depending on the auto repair shop, you may receive a warranty or a guarantee for the work performed..                                        </div>
                                    </div>
                                </div>
                                <div className="accordion-item">
                                    <h2 className="accordion-header" id="headingTwo">
                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                            2. Do You Provide A Maintenance Plan ?
                                        </button>
                                    </h2>
                                    <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                                        <div className="accordion-body">
                                            Yes, A reputed mechanic will want to give your vehicle back in good condition.................                                        </div>
                                    </div>
                                </div>
                                <div className="accordion-item">
                                    <h2 className="accordion-header" id="headingThree">
                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                            3. How many cars are currently available at carwale?
                                        </button>
                                    </h2>
                                    <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                                        <div className="accordion-body">
                                            We offer an extensive selection of top-tier car brands available in bulk quantities. You can effortlessly find the car you desire by either using the search bar or by navigating to the 'Cars' section in our menu.                                        </div>
                                    </div>
                                </div>
                                <div className="accordion-item">
                                    <h2 className="accordion-header" id="headingFour">
                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                                            4. Do you offer express service?
                                        </button>
                                    </h2>
                                    <div id="collapseFour" className="accordion-collapse collapse" aria-labelledby="headingFour" data-bs-parent="#accordionExample">
                                        <div className="accordion-body">
                                            Yes. If you're in need of a quick check or procedure, we encourage you to take advantage of our express  we can take care of it for you quickly and accurately.
                                        </div>
                                    </div>
                                </div>
                                <div className="accordion-item">
                                    <h2 className="accordion-header" id="headingFive">
                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFive" aria-expanded="false" aria-controls="collapseFive">
                                            5. How many brands are available at carwale?
                                        </button>
                                    </h2>
                                    <div id="collapseFive" className="accordion-collapse collapse" aria-labelledby="headingFive" data-bs-parent="#accordionExample">
                                        <div className="accordion-body">
                                            We offer a wide array of premium car brands and accessories for your exploration. You can access these options by navigating to the 'Brands' section.
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-12 col-lg-4">
                            <img decoding="async" src={faq} className="img-fluid hideOnMob" alt='Faq pic'/>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Faq
