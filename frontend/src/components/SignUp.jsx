import React from 'react'
import { useState, useEffect } from 'react'
import userActions from '../redux/actions/userActions'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import GoogleSignUp from '../components/GoogleSignUp'


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
        let res= await dispatch(userActions.signUpUser(userData))
        let errorSignUp = res.data.message
        if(res.data.from === "validator"){
            errorSignUp.forEach(e =>{
                toast.error(e.message)
            })
            
        }
        if(res.data.from === "form-Signup"){
            if(res.data.success){
                toast.success(res.data.message)
            }else{
                toast.error(res.data.message)
            }
        }
        console.log(res)
    }



    return (

        
        <form id="login" onSubmit={handleSubmit}>
            <div className="FormSignUp bg-white dark:bg-gray-800">
                <div className="container mx-auto bg-white dark:bg-gray-800 rounded">

                    <div className="mx-auto">
                        <div className="xl:w-9/12 w-11/12 mx-auto xl:mx-0">


                        </div>
                    </div>
                </div>
                <div className="container mx-auto bg-white dark:bg-gray-800 mt-10 rounded px-4">
                    <div className="xl:w-full border-b border-gray-300 dark:border-gray-700 py-5">
                        <div className="flex w-11/12 mx-auto xl:w-full xl:mx-0 items-center">
                            <p className="text-lg text-gray-800 dark:text-gray-100 font-bold">Personal Information</p>
                            <div className="ml-2 cursor-pointer text-gray-600 dark:text-gray-400">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={16} height={16}>
                                    <path className="heroicon-ui" d="M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm0-9a1 1 0 0 1 1 1v4a1 1 0 0 1-2 0v-4a1 1 0 0 1 1-1zm0-4a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" fill="currentColor" />
                                </svg>
                            </div>
                        </div>
                    </div>
                    <div className="mx-auto pt-4">
                        <div className="container mx-auto">
                            <div className="xl:w-1/4 lg:w-1/2 md:w-1/2 flex flex-col mb-6">
                                <label htmlFor="FirstName" className="pb-2 text-sm font-bold text-gray-800 dark:text-gray-100">
                                    First Name
                                </label>
                                <input type="text" id="FirstName" name="firstName" required className="border border-gray-300 dark:border-gray-700 pl-3 py-3 shadow-sm bg-transparent rounded text-sm focus:outline-none focus:border-indigo-700 placeholder-gray-500 text-gray-500 dark:text-gray-400" placeholder="First Name" />
                            </div>
                            <div className="xl:w-1/4 lg:w-1/2 md:w-1/2 flex flex-col mb-6">
                                <label htmlFor="LastName" className="pb-2 text-sm font-bold text-gray-800 dark:text-gray-100">
                                    Last Name
                                </label>
                                <input type="text" id="LastName" name="firstName" required className="border border-gray-300 dark:border-gray-700 pl-3 py-3 shadow-sm bg-transparent rounded text-sm focus:outline-none focus:border-indigo-700 placeholder-gray-500 text-gray-500 dark:text-gray-400" placeholder="Last Name" />
                            </div>
                            <div className="xl:w-1/4 lg:w-1/2 md:w-1/2 flex flex-col mb-6">
                                <label htmlFor="LastName" className="pb-2 text-sm font-bold text-gray-800 dark:text-gray-100">
                                    User Photography
                                </label>
                                <input type="text" id="Photography" name="firstName" required className="border border-gray-300 dark:border-gray-700 pl-3 py-3 shadow-sm bg-transparent rounded text-sm focus:outline-none focus:border-indigo-700 placeholder-gray-500 text-gray-500 dark:text-gray-400" placeholder="Last Name" />
                            </div>
                            <div className="xl:w-1/4 lg:w-1/2 md:w-1/2 flex flex-col mb-6">
                                <label htmlFor="Email" className="pb-2 text-sm font-bold text-gray-800 dark:text-gray-100">
                                    Email
                                </label>
                                <div className="border border-gray-300 shadow-sm rounded flex">
                                    <div className="px-4 py-3 dark:text-gray-100 flex items-center border-r border-gray-300">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-mail" width={20} height={20} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                            <path stroke="none" d="M0 0h24v24H0z" />
                                            <rect x={3} y={5} width={18} height={14} rx={2} />
                                            <polyline points="3 7 12 13 21 7" />
                                        </svg>
                                    </div>
                                    <input type="text" id="E-mail" name="email" required className="pl-3 py-3 w-full text-sm focus:outline-none placeholder-gray-500 rounded bg-transparent text-gray-500 dark:text-gray-400" placeholder="example@gmail.com" />
                                </div>
                                <div className="flex justify-between items-center pt-1">

                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={16} height={16}>

                                    </svg>
                                </div>
                            </div>

                            <div className="xl:w-1/4 lg:w-1/2 md:w-1/2 flex flex-col mb-6">
                                <label htmlFor="Country" className="pb-2 text-sm font-bold text-gray-800 dark:text-gray-100">
                                    Country
                                </label>
                                <select type="select" id="Country" className="selectSignUp border bg-transparent border-gray-300 dark:border-gray-700 pl-3 py-3 shadow-sm rounded text-sm focus:outline-none focus:border-indigo-700 placeholder-gray-500 text-gray-500 dark:text-gray-400" placeholder="Select your country..." >
                                    {country.map((everyCountry, index) =>
                                        <option key={index}> {everyCountry.name}  </option>)}
                                </select>
                            </div>
                            <div className="xl:w-1/4 lg:w-1/2 md:w-1/2 flex flex-col mb-6">
                                <label htmlFor="Password" className="pb-2 text-sm font-bold text-gray-800 dark:text-gray-100">
                                    Password
                                </label>
                                <input className="selectSignUp border bg-transparent border-gray-300 dark:border-gray-700 pl-3 py-3 shadow-sm rounded text-sm focus:outline-none focus:border-indigo-700 placeholder-gray-500 text-gray-500 dark:text-gray-400" type='password' name='pass' id='passw' placeholder='Min 6 characters/Max 20' autoComplete="on" />
                                <button className="buttonSubmit" type="submit">
                                    Submit
                                </button>
                                <div className="Or">
                                    <p> Or signup with:  </p>
                                </div>
                                <GoogleSignUp className="googleButton"/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="Container-buttons">
                    <div className=" w-full py-4 p-5 sm:px-0 bg-white dark:bg-gray-800 flex justify-start">
                    </div>
                    
                </div>
            </div>
        </form>
    )
}
