import React, { useEffect } from 'react';
import jwt_decode from 'jwt-decode';
import { useDispatch } from 'react-redux';
import userActions from '../redux/actions/userActions'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function GoogleSignUp() {
    const dispatch = useDispatch();


    async function handleCallbackResponse(response) {
        let userObject = jwt_decode(response.credential);
        console.log(userObject);
        let res = await dispatch(userActions.signInUser({
            firstName: userObject.given_name,
            lastName: userObject.family_name,
            photoUser: userObject.picture,
            email: userObject.email,
            password: userObject.sub,
            from: 'google'
        }))
        
        if (res.data.success) {
            toast.success(res.data.message)
        } else {
            toast.error(res.data.message);
        }
    }
        
    

    useEffect(() => {
        /* global google */
        google.accounts.id.initialize({
            client_id: "984763759-vgi43vnicvkn5aeqqgfi7123q5sqho5v.apps.googleusercontent.com",
            context: "login",
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