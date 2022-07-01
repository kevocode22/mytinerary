import React from "react";
import NavBar from "./components/NavBar";
import './styles/styles.css'
import {Route, Routes} from 'react-router-dom'
import Home from './pages/Home.js'
import Cities from './pages/Cities.js'
import Footer from './components/Footer'
import Error from './pages/Error'
import ScrollToTop from "react-scroll-to-top"
import Details from './components/Details'
import {useEffect} from 'react'
import citiesActions from './redux/actions/citiesActions'
import { useDispatch } from "react-redux";
import Login from "./pages/Login";
import SignUp from "./components/SignUp";
import { ToastContainer } from 'react-toastify';



function App(){

  const dispatch = useDispatch()
  useEffect(() => {
  dispatch(citiesActions.getCities())
  //eslint-disable-next-line
}, [])

      return (
      <>
      <ToastContainer
position="bottom-center"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
/>
  <NavBar key={NavBar.id}/>
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/cities" element={<Cities/>} />
      <Route path="/*" element={<Error/>} />
      <Route path="/cities/:id" element={<Details/>} />
      <Route path="/login" element={<Login/>}/>
      <Route path="/signup" element={<SignUp/>} />
  </Routes>
  <Footer/>
  <ScrollToTop smooth color="#e01313"/>
  </>
  );
}

export default App