import { Actions } from 'react-native-router-flux';
import firebase from 'firebase';
import geofire from 'geofire';
//action types
import {
  SIGNUP_CLICKED,
  SIGNUP_EMAIL_CHANGED,
  SIGNUP_NAME_CHANGED,
  SIGNUP_PASSWORD1_CHANGED,
  SIGNUP_PASSWORD2_CHANGED,
  SIGNUP_POSITION_CHANGED,
  SIGNUP_USER,
  SIGNUP_USER_FAIL,
  SIGNUP_USER_SUCCESS,
  SIGNUP_LOCATION_CHANGED,
  SIGNUP_CITY_CHANGED,
  SIGNUP_SHOW_MODAL,
  USER_DATA_FETCH_SUCCESS
} from './types';

//action generators
//routes the user to sign up page
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

export const signupNameChanged = (text) => {
  return {
    type: SIGNUP_NAME_CHANGED,
    payload: text
  };
};

export const signupLocationChanged = (text) => {
  return {
    type: SIGNUP_LOCATION_CHANGED,
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

//Add other user sign up feild actions below

export const signupUser = ({ email, name, location, city, password, position, region }) => {
  return (dispatch) => {
    dispatch({ type: SIGNUP_USER });

    firebase.auth().createUserWithEmailAndPassword(email, password)
    //After succesful user creation, .set creates a new entry
    //in the database using authentication uid instead of .push new unique ID
      .then(function(user){
         signupSuccess(dispatch, user);
         const { currentUser } = firebase.auth();
         const usersRef = firebase.database().ref('/users');
         currentUser.updateProfile({ displayName: name });
         usersRef.child(currentUser.uid).set({
             email,
             name,
             location,
             city,
             region,
             position
           });
           //GeoFire call to store new user location into geoFire ref,
           //Will refactor this into a seperate promise later.
           const firebaseRef = firebase.database().ref('/geofire');
           const geoFire = new geofire(firebaseRef);
           geoFire.set(currentUser.uid, [location.lat, location.lng]).then(function(){
             console.log('Provided key has been added to GeoFire');
           }, function(error){
             console.log('Error: ' + error);
           });
      })
      .catch((error) => signupFail(dispatch, error));
    };
};

export const userDataFetchSuccess = (text) => {
  return {
    type: USER_DATA_FETCH_SUCCESS,
    payload: text
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
