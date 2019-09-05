import {
    AUTH_USER, 
    AUTH_PASSWORD, 
    AUTH_TOKEN,
    AUTH_AUTHENTICATED, 
    AUTH_ROLES,
    AUTH_OPEN_MODAL_LOGIN_ERROR,
    AUTH_LOG_OUT
} from '../constants/ActionTypes';

const initialState  = {
    userName:"",
    password:"",
    roles:[],
    isAuthenticated:false,
    open: false,
    token:""
  };
  
  function loginReducer(state = initialState , action) {

    switch (action.type) {
      case 'undefined':
        return initialState ;
        case AUTH_USER:
        return { 
          ...state, 
          userName: action.value
        };
        case AUTH_PASSWORD:
        return { 
          ...state, 
          password: action.value
        };
        case AUTH_TOKEN:
        return { 
          ...state, 
          token: action.token
        };
        case AUTH_AUTHENTICATED:
        return { 
          ...state, 
          isAuthenticated: action.isAuthenticated
        };
        case AUTH_ROLES:
        return { 
          ...state, 
          roles: state.roles.concat(action.value)
        };
        case AUTH_LOG_OUT:
        return { 
          ...state, 
          roles:[],
          isAuthenticated:false,
          open: false,
          token:""
        };
        case AUTH_OPEN_MODAL_LOGIN_ERROR:
        return { 
          ...state, 
          open: action.value
        };
        
      default:
        return state
      }
  }
  
  export default loginReducer;