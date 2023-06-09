import axios from 'axios';

const route = "http://localhost:4000/api/"

const usersActions = {

    signUpUser: (userData) => {
        return async (dispatch, getState) => {
            try {
                const res = await axios.post( route + 'auth/signup', { userData })
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
              const res = await axios.post(route + 'auth/login', {
                logedUser,
              });
      
              if (res.data.success) {
                localStorage.setItem("token", res.data.response.token);
                dispatch({
                  type: "user",
                  payload: {
                    user: res.data.response.userData,
                    success: res.data.success,
                  },
                });
              }
      
              return res;
            } catch (error) {
              console.log(error);
            }
          };
        },
      
    verifyToken: (token) => {
        return async (dispatch, getState) => {
            try {
                const res = await axios.get(route + 'verifytoken', { headers: { 'Authorization': 'Bearer ' + token } })
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

    //   getAllUsers: () =>{
    //     return(dispatch, getState) =>{
    //         dipatch({
    //             type: "GET_ALL_USERS", payload: res.data.response
    //         })
    //     }
    //   }

}

export default usersActions;