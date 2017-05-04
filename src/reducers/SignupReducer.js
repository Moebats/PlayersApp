import {
  SIGNUP_CLICKED,
  SIGNUP_EMAIL_CHANGED,
  SIGNUP_NAME_CHANGED,
  SIGNUP_LOCATION_CHANGED,
  SIGNUP_PASSWORD1_CHANGED,
  SIGNUP_PASSWORD2_CHANGED,
  SIGNUP_POSITION_CHANGED,
  SIGNUP_USER,
  SIGNUP_USER_FAIL,
  SIGNUP_USER_SUCCESS
} from '../actions/types';

const INITIAL_STATE = {
  email: '',
  name: '',
  location: '',
  password1: '',
  password2: '',
  position: 'batsman',
  user: null,
  error: '',
  loading: false
};

const EmailValidator = require('email-validator');

const validate = (state) => {
  //validate email
  if (state.email.length > 0 && !EmailValidator.validate(state.email)) {
    return { ...state, error: 'Email format incorrect.' };
  }

  //validate password equality
  if ((state.password1.length > 0 || state.password2.length) > 0
                && (state.password1 !== state.password2)) {
    return { ...state, error: 'Passwords don\'t match' };
  }

  return { ...state, error: '' };
};

const SignupReducer = (state = INITIAL_STATE, action) => {
  let newStateObj;
  switch (action.type) {
      case SIGNUP_CLICKED: {
        newStateObj = { ...state, ...INITIAL_STATE };
        break;
      }
      case SIGNUP_EMAIL_CHANGED: {
        newStateObj = { ...state, email: action.payload };
        break;
      }
      case SIGNUP_NAME_CHANGED: {
        newStateObj = { ...state, name: action.payload };
        break;
      }
      case SIGNUP_LOCATION_CHANGED: {
        newStateObj = { ...state, location: action.payload };
        break;
      }
      case SIGNUP_PASSWORD1_CHANGED: {
        newStateObj = { ...state, password1: action.payload };
        break;
      }
      case SIGNUP_PASSWORD2_CHANGED: {
        newStateObj = { ...state, password2: action.payload };
        break;
      }
      case SIGNUP_POSITION_CHANGED: {
        newStateObj = { ...state, position: action.payload };
        break;
      }
      case SIGNUP_USER: {
        newStateObj = { ...state, loading: true };
        break;
      }
      case SIGNUP_USER_FAIL: {
        //We return immediately because we know there's an error response already.
        return { ...state, error: action.payload, loading: false };
      }
      case SIGNUP_USER_SUCCESS: {
        return { ...state, ...INITIAL_STATE, user: action.payload };
      }
      default:
        return state;
    }
    newStateObj = validate(newStateObj);
    return newStateObj;
  };

  export default SignupReducer;
