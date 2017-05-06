import { Actions } from 'react-native-router-flux';
import firebase from 'firebase';
import {
  SIGNUP_CLICKED,
  SIGNUP_EMAIL_CHANGED,
  SIGNUP_PASSWORD1_CHANGED,
  SIGNUP_PASSWORD2_CHANGED,
  SIGNUP_POSITION_CHANGED,
  SIGNUP_USER,
  SIGNUP_USER_FAIL,
  SIGNUP_USER_SUCCESS,
  SIGNUP_LOCATION_CHANGED,
  SIGNUP_CITY_CHANGED,
  SIGNUP_SHOW_MODAL,
  SIGNUP_MODAL_LIST
} from './types';

export const signupClicked = () => {
  return (dispatch) => {
    dispatch({ type: SIGNUP_CLICKED });
    Actions.signup();
  };
};

export const signupEmailChanged = (text) => {
  return {
    type: SIGNUP_EMAIL_CHANGED,
    payload: text
  };
};

export const signupPassword1Changed = (text) => {
  return {
    type: SIGNUP_PASSWORD1_CHANGED,
    payload: text
  };
};

export const signupPassword2Changed = (text) => {
  return {
    type: SIGNUP_PASSWORD2_CHANGED,
    payload: text
  };
};

export const signupPositionChanged = (text) => {
  return {
    type: SIGNUP_POSITION_CHANGED,
    payload: text
  };
};

export const signupGeoLocationChanged = (text) => {
  return {
    type: SIGNUP_LOCATION_CHANGED,
    payload: text
  };
};

export const signupCityChanged = (text) => {
  return {
    type: SIGNUP_CITY_CHANGED,
    payload: text
  };
};

export const signupShowModal = (text) => {
  return {
    type: SIGNUP_SHOW_MODAL,
    payload: text
  };
};

export const signupModalList = (text) => {
  return {
    type: SIGNUP_MODAL_LIST,
    payload: text
  };
};

export const signupUser = ({ email, password, position }) => {
  return (dispatch) => {
    dispatch({ type: SIGNUP_USER });

    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(user => signupSuccess(dispatch, user))
      .catch((error) => signupFail(dispatch, error));
  };
};

const signupFail = (dispatch, error) => {
  dispatch({ type: SIGNUP_USER_FAIL, payload: error.code });
};

const signupSuccess = (dispatch, user) => {
  dispatch({
    type: SIGNUP_USER_SUCCESS,
    payload: user
  });

  Actions.main();
};
