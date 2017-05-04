import React from 'react';
import { Scene, Router } from 'react-native-router-flux';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import UserMain from './components/UserMain';

const RouterComponent = () => {
  return (
    <Router>
      <Scene key="auth">
        <Scene key="login" component={LoginForm} hideNavBar />
        <Scene key="signup" component={SignupForm} hideNavBar={false} title='Sign Up' />
        
      </Scene>
      <Scene key="main">
        <Scene
        key="UserMain" component={UserMain}
        title="Players list"
        rightTitle="My Profile" initial
        />
      </Scene>
    </Router>
  );
};

export default RouterComponent;
