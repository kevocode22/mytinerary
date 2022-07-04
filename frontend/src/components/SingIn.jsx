import React from 'react'
import '../styles/login.css'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import userActions from '../redux/actions/userActions'
import LoginGoogle from '../components/LoginGoogle'
import { Link as LinkRouter } from "react-router-dom";
import '../styles/login.css'



export default function Login() {

  const dispatch = useDispatch()
  const handleSubmit = async (event) => {
    event.preventDefault()
    const logedUser = {
      email: event.target[0].value,
      password: event.target[1].value,
      from: "form-Signup"
    }


    let res = await dispatch(userActions.signInUser(logedUser))
    let errorSignUp = res.data.message
    console.log(errorSignUp)
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
     <section className="singInContainer relative flex flex-wrap lg:h-screen lg:items-center">
  <div className="w-full px-4 py-12 lg:w-1/2 sm:px-6 lg:px-8 sm:py-16 lg:py-24">
    <div className="max-w-lg mx-auto text-center">
      <h1 className="text-2xl font-bold sm:text-3xl">LOGIN</h1>

      <p className="mt-4 text-gray-500">
        Login and find your perfect trip!
      </p>
    </div>

    <form action="" className="max-w-md mx-auto mt-8 mb-0 space-y-4" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email" className="sr-only">Email</label>

        <div className="relative">
          <input
            type="email"
            className="w-full p-4 pr-12 text-sm border-gray-200 rounded-lg shadow-sm"
            placeholder="Enter email"
          />
        </div>
      </div>

      <div>
        <label htmlFor="password" className="sr-only">Password</label>
        <div className="relative">
          <input
            type="password"
            className="w-full p-4 pr-12 text-sm border-gray-200 rounded-lg shadow-sm"
            placeholder="Enter password"
          />
        </div>
      </div>

      <div className="divButtons flex items-center justify-between">
              <button
          type="submit"
          className="buttonLogin rounded-lg"
        >
          Sign in
        </button> OR:
      </div>
      <LoginGoogle/>
      <div><p className="textSignIn text-sm text-gray-500">
        Not account yet?
        <LinkRouter to="/signup" className="underline" >Sign up</LinkRouter>
        </p></div>
    </form>
  </div>
 

  <div className="relative w-full h-64 sm:h-96 lg:w-1/2 lg:h-full">
    <img
      className="absolute inset-0 object-cover w-full h-full"
      src="https://thehoneymoonist.com/wp-content/uploads/2017/03/CaribbeachAnton-Gvozdikov.jpg"
      alt="ImageLogin"
    />
  </div>
</section>
    </>
    

  )
}
