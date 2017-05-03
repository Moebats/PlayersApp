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
  PLAYER_FETCH_SUCCESS
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

export const signupUser = ({ email, password, position }) => {
  return (dispatch) => {
    dispatch({ type: SIGNUP_USER });

    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(user => signupSuccess(dispatch, user))
      .catch((error) => signupFail(dispatch, error));

    firebase.database().ref('/users').push({ email, position });
  };
};

export const playerFetch = () => {
  return (dispatch) => {
    const playerRef = firebase.database().ref('/users');
    playerRef
      .on('value', snapshot => {
      dispatch({ type: PLAYER_FETCH_SUCCESS, payload: snapshot.val() });
      });
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
