import React, { Component } from 'react';
import { Text } from 'react-native';
import { connect } from 'react-redux';
import { Icon, Container, Button, Content, Form, Item, Input, Label } from 'native-base';
import { emailChanged, passwordChanged, loginUser, signupClicked } from '../actions';
import { Spinner } from './common';

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
    const { whiteText, button } = styles;

    return (
        <Button
          block
          success
          iconLeft
          onPress={this.onLoginPress.bind(this)}
          style={button}
        >
          <Icon name='person' />
          <Text style={whiteText} >Login</Text>
        </Button>
    );
  }

  render() {
    const { signUpStyle, errorTextStyle, container } = styles;

    return (
              <Container style={container}>
                    <Content>
                        <Text style={signUpStyle}>
                          Welcome to Cricket Players App
                        </Text>

                        <Form>
                            <Item fixedLabel>
                                <Label>Email</Label>
                                <Input
                                  label="Email"
                                  autoFocus
                                  autoCapitalize='none'
                                  keyboardType='email-address'
                                  placeholder="email@gmail.com"
                                  onChangeText={this.onEmailChange.bind(this)}
                                  value={this.props.email}
                                />
                            </Item>
                            <Item fixedLabel last>
                                <Label>Password</Label>
                                <Input
                                  secureTextEntry
                                  label="Password"
                                  placeholder="password"
                                  onChangeText={this.onPasswordChange.bind(this)}
                                  value={this.props.password}
                                />
                            </Item>
                            <Text style={errorTextStyle}>
                              {this.props.error}
                            </Text>
                        </Form>
                        {this.renderButton()}
                      <Button transparent block onPress={this.onSignupPress.bind(this)}>
                        <Text>Do not have an account? Sign Up</Text>
                      </Button>
                    </Content>
                </Container>
    );
  }
}

const styles = {
  button: {
    margin: 10,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  },
  signUpStyle: {
    fontSize: 20,
    textAlign: 'center',
    color: '#099b3e',
    marginTop: 50,
    marginBottom: 30,
    fontWeight: 'bold',
    alignSelf: 'center'
  },
  whiteText: {
    color: 'white'
  }
};

const mapStateToProps = ({ auth }) => {
  const { email, password, error, loading } = auth;

  return { email, password, error, loading };
};

export default connect(mapStateToProps, {
  emailChanged, passwordChanged, loginUser, signupClicked
})(LoginForm);
