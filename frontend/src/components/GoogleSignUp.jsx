import React, { useEffect } from 'react';
import jwt_decode from 'jwt-decode';
import { useDispatch } from 'react-redux';
import userActions from '../redux/actions/userActions'


export default function GoogleSignUp() {
    const dispatch = useDispatch();


    async function handleCallbackResponse(response) {
        let userObject = jwt_decode(response.credential);
        console.log(userObject);
        dispatch(userActions.signUpUser({
            firstName: userObject.given_name,
            lastName: userObject.family_name, 
            photoUser: userObject.picture, 
            email: userObject.email, 
            password: userObject.sub, 
            country: userObject.getCountry,
            from: 'google'
        }))
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
            { theme: "outline", size: "medium",  locale: "en-IN",   }
        )
    });

    return (
    
            <div id='buttonDiv'></div>
        
    )
}