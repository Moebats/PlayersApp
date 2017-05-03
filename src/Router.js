import React from 'react';
import { Scene, Router } from 'react-native-router-flux';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import PlayerList from './components/PlayerList';

const RouterComponent = () => {
  return (
    <Router>
      <Scene key="auth">
        <Scene key="login" component={LoginForm} hideNavBar />
        <Scene key="signup" component={SignupForm} hideNavBar={false} title='Sign Up' />
        <Scene
        key="playerList" component={PlayerList}
        title="Players list"
        rightTitle="My Profile" initial
        />
      </Scene>
    </Router>
  );
};

export default RouterComponent;
