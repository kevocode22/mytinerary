import React from 'react'
import { useState, useEffect } from 'react'
import userActions from '../redux/actions/userActions'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import GoogleSignUp from '../components/GoogleSignUp'
import '../styles/login.css'
import { Link as LinkRouter } from "react-router-dom";

export default function SignUp() {

    const dispatch = useDispatch()
    const [country, setCountry] = useState([])

    useEffect(() => {
        axios.get('https://restcountries.com/v2/all?fields=name')
            .then(response => {
                const apiResponse = response.data;
                setCountry(apiResponse);
            }).catch(error => {
                console.log(error);
            });
    }, []);


    const handleSubmit = async (event) => {
        event.preventDefault()
        const userData = {
            firstName: event.target[0].value,
            lastName: event.target[1].value,
            photoUser: event.target[2].value,
            country: event.target[4].value,
            email: event.target[3].value,
            password: event.target[5].value,
            from: "form-Signup"
        }
        let res = await dispatch(userActions.signUpUser(userData))
        let errorSignUp = res.data.message
        if (res.data.from === "validator") {
            errorSignUp.forEach(e => {
                toast.error(e.message)
            })

        }
        if (res.data.from === "form-Signup") {
            if (res.data.success) {
                toast.success(res.data.message)
            } else {
                toast.error(res.data.message)
            }
        }
        console.log(res)
    }


    return (

        <>
     <section className="sectionLogin relative w-full flex flex-wrap lg:h-screen lg:items-center">
  <div className="w-full px-4 py-12 lg:w-1/2 sm:px-6 lg:px-8 sm:py-16 lg:py-24">
    <div className="max-w-lg mx-auto text-center">
      <h1 className="text-2xl font-bold sm:text-3xl">REGISTRATION</h1>

      <p className="mt-4 text-gray-500">
        Fill the form and find your perfect destination
      </p>
    </div>

    <form action="" className="max-w-md mx-auto mt-8 mb-0 space-y-4" onSubmit={handleSubmit}>
    <div>
        <label htmlFor="name" className="sr-only">First Name</label>

        <div className="relative">
          <input
            type="text"
            className="inputForm w-full p-4 pr-12 text-sm border-gray-200 rounded-lg shadow-sm"
            placeholder="First Name"
          />
        </div>
        <div>
        <label htmlFor="name" className="sr-only">Last Name</label>
        <div className="relative">
          <input
            type="text"
            className="inputForm w-full p-4 pr-12 text-sm border-gray-200 rounded-lg shadow-sm"
            placeholder="Last Name"
          />
        </div>
      </div>
      <div>
        <label htmlFor="Photo User" className="sr-only">Photo User</label>
        <div className="relative">
          <input
            type="url"
            className="inputForm w-full p-4 pr-12 text-sm border-gray-200 rounded-lg shadow-sm"
            placeholder="Url Photo"
          />
        </div>
      </div>
      <div>
        <label htmlFor="email" className="sr-only">Email</label>

        <div className="relative">
          <input
            type="email"
            className="inputForm w-full p-4 pr-12 text-sm border-gray-200 rounded-lg shadow-sm"
            placeholder="Enter email"
          />
        </div>
      </div>
      <div>
        <label htmlFor="password" className="">Country:</label>
      
          <select className="inputForm w-full p-4 pr-12 text-sm border-gray-200 rounded-lg shadow-sm" placeholder="Select your country" >
         {country.map(country=> <option placeholder="Select your country">{country.name}</option>)}
          </select>
      </div>
      <div>
        <label htmlFor="password" className="sr-only">Password</label>
        <div className="relative">
          <input
            type="password"
            className="inputForm w-full p-4 pr-12 text-sm border-gray-200 rounded-lg shadow-sm"
            placeholder="Enter password"
          />
        </div>
      </div>
      

      <div className="divButtons flex items-center justify-center">
              <button
          type="submit"
          className="buttonLogin rounded-lg"
        >
          Sign Up
        </button> 
      </div>
      <div className="divButtons flex items-center justify-center">
      OR:
      </div>
      <GoogleSignUp/>
      <div><p className="textSignUp text-sm text-gray-500">
        Already registered?
        <LinkRouter to="/login" className="underline" >Login</LinkRouter>
        </p></div>
        </div>
    </form>
   
  </div>
  <div className="relative w-full h-64 sm:h-96 lg:w-1/2 lg:h-full">
    <img
      className="imgContainer absolute inset-0 object-cover w-full h-full"
      src="https://cdn.dribbble.com/users/2113838/screenshots/6193085/travel_illustration_4x.png"
      alt=""
    />
  </div>

  
</section>
    </>

    )
}
