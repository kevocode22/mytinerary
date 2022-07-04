import axios from 'axios';


const usersActions = {

    signUpUser: (userData) => {
        return async (dispatch, getState) => {
            try {
                const res = await axios.post('http://localhost:4000/api/auth/signup', { userData })
                console.log(res)
                dispatch({
                    type: 'message',
                    payload: {
                        view: true,
                        message: res.data.message,
                        success: res.data.success
                    }
                })
                return res
            } catch (error) {
                console.log(error);
            }
        }
    },

    signInUser: (logedUser) => {
        return async (dispatch, getState) => {
            try {
                const res = await axios.post('http://localhost:4000/api/auth/login', { logedUser })
                console.log(res)
                if (res.data.success) {
                    localStorage.setItem('token', res.data.response.token)
                    dispatch({
                        type: 'user',
                        payload: res.data.response.userData
                    })
                }
                return res
            } catch (error) {
                console.log(error);
            }

        }
    },
    verifyToken: (token) => {
        console.log(token)
        return async (dispatch, getState) => {
            try {
                const res = await axios.get('http://localhost:4000/api/verifytoken', { headers: { 'Authorization': 'Bearer ' + token } })
                console.log(res)
                if (res.data.success) {
                    dispatch({ type: 'user', payload: { user: res.data.response, success: res.data.success } });
                    dispatch({
                        type: 'message',
                        payload: { view: true, message: res.data.message, success: res.data.success }
                    });
                } else { localStorage.removeItem('token') }
                return res
            } catch (err) {
                console.log(err)
            }
        }
    },

    SignOutUser: () => {
        return (dispatch, getState) => {
          dispatch({
            type: "SIGN_OUT",
            payload: { message: "Thanks for your visit" }
          });
        };
      },

}

export default usersActions;