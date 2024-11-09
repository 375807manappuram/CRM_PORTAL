import React from 'react'
import '../styles/footer.css'
import { BsLinkedin, BsFacebook,BsInstagram,BsPhone,BsTwitter } from 'react-icons/bs'
import logo from '../images/logo.png'

const Footer = () => {
    return (
        <div>
            <footer id="footer">
            <section id="contact" className="footer_wrapper">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-5 footer_logo mb-4 mb-lg-0">
                            {/* <img decoding="async" src={logo} width={150} /> */}
                            <h3 style={{ color: 'blueviolet' }}>AutoConnect</h3>
                            <p className="footer_text" style={{ textAlign: 'justify' }}>At AutoConnect, we're dedicated to making your car buying experience as smooth as the road ahead. With a wide range of brands, expert guidance, secure transactions, and innovative features, we're your trusted partner on your journey to finding the perfect ride. Drive your dreams with AutoConnect, where your satisfaction is our ultimate destination.</p>
                        </div>
                        <div className="col-lg-4 px-lg-5 mb-4 mb-lg-0">
                            <h3 className="footer_title" style={{ color: 'blueviolet' }}>Contact</h3>
                            <p className="footer_text">
                                <a >autoconnectservice@gmail.com</a><br />
                                <a className="footer-address">K.T Nagar, Valappad, <br />Thrissur, Kerala, India</a>
                            </p>
                        </div>
                        <div className="col-lg-3 mb-4 mb-lg-0">
                            <h3 className="footer_title" style={{ color: 'blueviolet' }}>Social Media</h3>
                            <p>
                                <a href="https://www.linkedin.com/in/meetdodiya/" className="footer_social_media_icon" style={{ color: 'white' }}><BsLinkedin size={25} /></a>
                                <a href="https://www.facebook.com/YourPageName" className="footer_social_media_icon" style={{ color: 'white' }}><BsFacebook size={25}/></a>
                                <a href="https://www.instagram.com/YourPageName" className="footer_social_media_icon" style={{ color: 'white' }}><BsInstagram size={25}/></a>
                                <a href="tel:+9074716022" className="footer_social_media_icon" style={{ color: 'white' }}><BsPhone size={25}/></a>
                                {/* <a href="https://twitter.com/YourPageName" className="footer_social_media_icon" style={{ color: 'white' }}><BsTwitter size={25}/></a> */}

                            </p>
                        </div>
                        <div className="col-12 footer_credits text-center">
                            <span>© 2024 <a>AutoConnect</a>™. All Rights Reserved.</span>
                        </div>
                    </div>
                </div>
            </section >
            </footer>
        </div >
    )
}

export default Footer
