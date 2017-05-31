import firebase from 'firebase';
import geofire from 'geofire';
//action types
import {
  PLAYER_FETCH_SUCCESS,
  GEO_SUCCESS
} from './types';

export const playerFetch = () => {
  return (dispatch) => {
    const playerRef = firebase.database().ref('/users');
    playerRef
      .on('value', snapshot => {
      dispatch({ type: PLAYER_FETCH_SUCCESS, payload: snapshot.val() });
      });
  };
};

export const showGeo = () => {
  return (dispatch) => {
    const firebaseRef = firebase.database().ref('/geofire');
    const geoFire = new geofire(firebaseRef);
    let users = {};
    const { currentUser } = firebase.auth();
    var l;

    firebase.database().ref('/geofire/' + currentUser.uid).once('value').then(function(snapshot) {
      console.log(snapshot.val());
      l = snapshot.val().l;

      const geoQuery = geoFire.query({
        center: l,
        radius: 10000 //kilometers
      });

      geoQuery.on('key_entered', function (key, location, distance) {
        firebase.database().ref('/users/' + key).once('value').then(function(snapshot) {
          let userObject = snapshot.val();
          // console.log(snapshot.val());
          users = { ...users, [key]: { ...userObject, uid: key, distance } };
          dispatch({ type: GEO_SUCCESS, payload: users });
          });
      });
      });
  };
};
