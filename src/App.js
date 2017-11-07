import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import firebase from 'firebase';
import ReduxThunk from 'redux-thunk';
import reducers from './reducers';
import Router from './Router';
import Geocoder from './utils/GeocodingUtil';
import ChatBackend from './ChatBackend';

class App extends Component {

  componentWillMount() {
    //Set apikey for use with Google Location API
    Geocoder.setApiKey('AIzaSyAXblCv7CV5I3CyZme1JegeuAf76gU0Tys');

    //Set apikey for use with firebase
    firebase.initializeApp({
      apiKey: 'AIzaSyBIMcNMb29LqC3-CjxFg81tq6EG3ENyuWU',
      authDomain: 'cricket-bc128.firebaseapp.com',
      databaseURL: 'https://cricket-bc128.firebaseio.com',
      projectId: 'cricket-bc128',
      storageBucket: 'cricket-bc128.appspot.com',
      messagingSenderId: '497007993079'
    });
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        ChatBackend.setUid(user.uid);
        ChatBackend.setName(user.name);
      }
    });
  }

  render() {
      const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

      return (
        <Provider store={store}>
          <Router />
        </Provider>
    );
  }
}

export default App;
