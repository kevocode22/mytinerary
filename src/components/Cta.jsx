import React from 'react'
import Video from "../assets/VideoHome.webm"
import '../styles/styles.css'
import { Box } from '@mui/system';
import { Link as LinkRouter } from "react-router-dom"

const Cta = () => {
    return (
        <div className='vid'>
            <video Video loop autoPlay muted>
                <source src={Video} /></video>
            <Box sx={{ display: { "fontFamily": 'Cairo', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' } }}>
                <h2 style={{ fontSize: "9vw", fontWeight: 'bold' }}>MyTinerary</h2>
                <p style={{ fontSize: "2vw" }}>Find your perfect trip, designed by insiders who know and love their cities!</p>
                <h3 className='h3cta'>FIND YOUR NEXT EXPERIENCE</h3>
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

export default Cta