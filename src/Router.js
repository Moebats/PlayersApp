import React from 'react';
import { Scene, Router } from 'react-native-router-flux';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import UserMain from './components/UserMain';
import UserEditProfile from './components/UserEditProfile';
import PlayerChat from './components/PlayerChat';

const RouterComponent = () => {
  return (
    <Router>
      <Scene key="auth">
        <Scene key="login" component={LoginForm} hideNavBar />
        <Scene
          key="signup"
          backTitle='Back'
          component={SignupForm}
          hideNavBar={false}
          title='Sign Up'
        />
      </Scene>

      <Scene key="main">
        <Scene
        hideNavBar
        key="UserMain" component={UserMain}
        title="Players list"
        initial
        />
        <Scene
          key="userEdit"
          backTitle='Back'
          hideNavBar={false}
          component={UserEditProfile}
          title='Edit Profile'
        />
        <Scene
          key="playerChat"
          backTitle='Back'
          hideNavBar={false}
          component={PlayerChat}
          title='Chat'
        />
      </Scene>
    </Router>
  );
};

export default RouterComponent;
