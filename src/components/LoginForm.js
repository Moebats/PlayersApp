import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
import { connect } from 'react-redux';
import { emailChanged, passwordChanged, loginUser, signupClicked } from '../actions';
import { Card, CardSection, Input, Button, Spinner } from './common';

const splash = require('../images/splash.jpg');

class LoginForm extends Component {
  onEmailChange(text) {
    this.props.emailChanged(text);
  }

  onPasswordChange(text) {
    this.props.passwordChanged(text);
  }

  onLoginPress() {
    const { email, password } = this.props;

    this.props.loginUser({ email, password });
  }

  onSignupPress() {
    this.props.signupClicked();
  }

  renderButton() {
    if (this.props.loading) {
      return <Spinner size="large" />;
    }

    return (
      <Button onPress={this.onLoginPress.bind(this)}>
        Login
      </Button>
    );
  }

  render() {
    const { signUpStyle, errorTextStyle, container, image } = styles;

    return (
      <Image style={image} source={splash}>
        <View style={container}>
          <Card>
            <CardSection>
              <Input
                label="Email"
                placeholder="email@gmail.com"
                onChangeText={this.onEmailChange.bind(this)}
                value={this.props.email}
              />
            </CardSection>

            <CardSection>
              <Input
                secureTextEntry
                label="Password"
                placeholder="password"
                onChangeText={this.onPasswordChange.bind(this)}
                value={this.props.password}
              />
            </CardSection>

            <Text style={errorTextStyle}>
              {this.props.error}
            </Text>

            <CardSection>
              {this.renderButton()}
            </CardSection>
          </Card>

          <TouchableOpacity onPress={this.onSignupPress.bind(this)}>
            <Text style={signUpStyle}>
              Sign Up
            </Text>
          </TouchableOpacity>

        </View>
      </Image>
    );
  }
}

const styles = {
  image: {
    flex: 1,
    width: undefined,
    height: undefined,
    backgroundColor: 'transparent',
    resizeMode: 'cover'
  },
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  },
  signUpStyle: {
    color: '#007aff',
    marginTop: 100,
    fontWeight: 'bold',
    alignSelf: 'center'
  }
};

const mapStateToProps = ({ auth }) => {
  const { email, password, error, loading } = auth;

  return { email, password, error, loading };
};

export default connect(mapStateToProps, {
  emailChanged, passwordChanged, loginUser, signupClicked
})(LoginForm);
