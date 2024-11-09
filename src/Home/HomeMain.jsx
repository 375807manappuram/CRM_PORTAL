import React from 'react'
import About from './About';
import Faq from './Faq';
import Features from './Features';
import Hero from './Hero';
//import Footer from './Footer';
//import CarsHome from './CarsHome';
//import Brandshome from './BrandsHome';

const HomeMain = () => {
    return (
        <>
            <Hero />
            <About />
            <Features />
            {/* <Brandshome /> */}
            {/* <CarsHome /> */}
            <Faq />
            {/* <Footer/> */}
        </>
    )
}

export default HomeMain