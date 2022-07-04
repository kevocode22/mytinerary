const initialState = {
    user: {},
    snackbar: {
        view: false,
        message: '',
        success:false
    }
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'user':
            return {
                ...state,
                user: action.payload,
            }
        case 'message':
            return {
                ...state,
                snackbar: action.payload,
            }
            case 'SIGN_OUT':
      localStorage.removeItem("token");
      return {
        user: {
          token: null,
          success: null,
          firstName: null,
          userPhoto: null,
          _id: null,
        }
      };
        default:
            return state
    }
}
export default userReducer