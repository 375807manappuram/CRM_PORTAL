import React,{ useEffect } from 'react';
import AOS from 'aos';
import '../styles/analysechart.css'; 
import 'aos/dist/aos.css';

import {
    BsFillArchiveFill,
    BsFillGrid3X3GapFill,
    BsPeopleFill,
    BsFillBellFill
} from 'react-icons/bs';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer
} from 'recharts';

//import './dashboard.css';

function AnalyseChart() {
    useEffect(() => {                                   
        AOS.init({
          duration: 3000,
        });
      }, []);
    const data = [
        { name: 'Incident Ticket', car: 2000 },
        { name: 'Sales', car: 3000 },
        { name: 'Test Drive', car: 2000 },
        { name: 'Resolved Ticket', car: 1800 },
    ];
   // const imageUrl = 'https://media.istockphoto.com/id/528729752/vector/mobile-banking-concept-flat-stylish-icon-design.jpg?s=612x612&w=0&k=20&c=mkSv3DEwHbq6CuqddHV2tWtO0wDrJYw2Ch_mw_T7NHI='; 
    const imageUrl='https://img.freepik.com/free-vector/mobile-expense-management-abstract-concept-vector-illustration-charges-control-system-satelite-devices-checking-mobile-network-enterprise-economy-manage-telephony-costs-abstract-metaphor_335657-2906.jpg';
    return (
        <main className='main-container'>
            <div className='main-title' data-aos="zoom-out-down">
                <h2 style={{color:'#b30292'}}>ANAYLSE CHART</h2>
            </div>

            <div className='main-cards'>
                <div className='card card-food'>
                    <div className='card-inner'>
                        <h3>INCIDENT TICKET</h3>
                        <BsFillArchiveFill className='card_icon' />
                    </div>
                    <h1>{data[0].car}</h1>
                </div>
                <div className='card card-entertainment'>
                    <div className='card-inner'>
                        <h3>SALES</h3>
                        <BsFillGrid3X3GapFill className='card_icon' />
                    </div>
                    <h1>{data[1].car}</h1>
                </div>
                <div className='card card-utilities'>
                    <div className='card-inner'>
                        <h3>TEST DRIVE</h3>
                        <BsPeopleFill className='card_icon' />
                    </div>
                    <h1>{data[2].car}</h1>
                </div>
                <div className='card card-others'>
                    <div className='card-inner'>
                        <h3>RESOLVED TICKETS</h3>
                        <BsFillBellFill className='card_icon' />
                    </div>
                    <h1>{data[3].car}</h1>
                </div>
            </div>          

            <div className='charts'>
                <ResponsiveContainer width="70%" height={500}>
                    <BarChart 
                        data={data}
                        margin={{
                            top: 30,
                            right: 30,
                            left: 50,
                            bottom: 10,
                        }}
                    >
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="car" fill="#0d5dde" />
                    </BarChart>
                </ResponsiveContainer>
                <div className='image-container' data-aos="fade-up">
                        <img src={imageUrl} alt="Analyse Illustration" />
                    </div>
            </div>
        </main>
    );   
}

export default AnalyseChart;