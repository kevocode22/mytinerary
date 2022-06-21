import React from 'react'
import video from "../assets/VideoHome.webm"
import '../styles/styles.css'
import { Box } from '@mui/system'
import { Link as LinkRouter } from "react-router-dom"

const Hero = () => {
    return (
        <div className='vid'>
            <video loop autoPlay muted>
                <source src={video} /></video>
            <Box sx={{ display: { display: 'flex', flexDirection: 'column',  alignItems: 'center' } }}>
                <h2 style={{ fontSize: "4.5rem", fontFamily:"Bayon", fontWeight: 'bold' }}>MyTinerary</h2>
                <p style={{ fontSize: "1.8rem" }}>Find your perfect trip, designed by insiders who know and love their cities!</p>
                <LinkRouter to='/cities'><h3 className='textFindHero' >FIND YOUR NEXT EXPERIENCE</h3></LinkRouter>
                <LinkRouter to='/cities'><div className='scrolldown mt-3'>
                    <div className='chevrons'>
                        <div className='chevrondown'></div>
                        <div className='chevrondrown'></div>
                    </div>
                </div></LinkRouter>
            </Box>
        </div>
    )
}

export default Hero