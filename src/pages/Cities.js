import React from 'react'
import IMG from '../assets/CS.png'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box';


export default function cities() {
    return (
        <>
            <Container maxWidth="xl" sx={{ backgroundColor: "white", display: 'flex', justifyContent: 'center', 'alignItems': 'center' }}>
                <Box sx={{ maxWidth: 410 }}><img src={IMG} alt="ComingSoon"></img></Box>
            </Container>
        </>
    )
}
