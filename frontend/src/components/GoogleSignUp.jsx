import React, { useEffect } from 'react';
import jwt_decode from 'jwt-decode';
import { useDispatch } from 'react-redux';
import userActions from '../redux/actions/userActions'
import axios from 'axios'
import { useState } from 'react'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useNavigate} from 'react-router-dom'


export default function GoogleSignUp() {
    const dispatch = useDispatch();
    const [country, setCountry] = useState({})
    const navigate = useNavigate()


    useEffect(() => {
        axios.get("https://geolocation-db.com/json/")
            .then(response => {
                const apiResponse = response;
                setCountry(apiResponse)
            })
    }, []);

    async function handleCallbackResponse(response) {
        let userObject = jwt_decode(response.credential);
        let res = await dispatch(userActions.signUpUser({
            firstName: userObject.given_name,
            lastName: userObject.family_name,
            photoUser: userObject.picture,
            email: userObject.email,
            country: country.data.country_name,
            password: userObject.sub,
            from: 'google'
        }))

        if (res.data.success) {
            toast.success(res.data.message)
            navigate('/login')
        } else {
            toast.error(res.data.message);
        }
    }

    useEffect(() => {
        /* global google */
        google.accounts.id.initialize({
            client_id: "984763759-vgi43vnicvkn5aeqqgfi7123q5sqho5v.apps.googleusercontent.com",
            context: "signup",
            callback: handleCallbackResponse
        });

        google.accounts.id.renderButton(
            document.getElementById('buttonDiv'),
            { theme: "outline", size: "medium", locale: "en-IN", text: "signup_with" }
        )
    });

    return (
        <>
            <div id='buttonDiv'></div>
        </>
    )
}