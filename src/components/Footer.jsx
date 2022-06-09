import React from 'react'
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import Logo from '../assets/LogoMy.png'
import { Link as LinkRouter } from "react-router-dom"
import '../styles/footer.css'



const Footer = () => {
  return (
    <>
    <div className="containerFooter">
      <div className='containlogo'> <img className='logo' src={Logo} alt="Logo" />
        <p>MyTinerary</p></div>
      <div className="Nav">  <LinkRouter to='/'>Home</LinkRouter> <LinkRouter to='/cities'>Cities</LinkRouter></div>
      <div> <h3>Follow Us:</h3><FacebookIcon></FacebookIcon>
        <InstagramIcon></InstagramIcon>
        <WhatsAppIcon></WhatsAppIcon></div>
    </div>
    <div className="copyright"> <p>© 2022 Copyright - All rights reserved | Designed by KeV</p></div></>)
}
export default Footer