import React, { Component } from 'react';
import { Text, View, Picker } from 'react-native';
import { connect } from 'react-redux';
import {
  signupEmailChanged,
  signupPassword1Changed,
  signupPassword2Changed,
  signupPositionChanged,
  signupUser
 } from '../actions';
import { Card, CardSection, Input, Button, Spinner } from './common';

class SignupForm extends Component {
  onEmailChange(text) {
    this.props.signupEmailChanged(text);
  }

  onPassword1Change(text) {
    this.props.signupPassword1Changed(text);
  }

  onPassword2Change(text) {
    this.props.signupPassword2Changed(text);
  }

  onPositionChange(text) {
    this.props.signupPositionChanged(text);
  }

  onSignupPress() {
    const { email, password1, position } = this.props;
    this.props.signupUser({ email, password: password1, position });
  }

  renderButton() {
    if (this.props.loading) {
      return <Spinner size="large" />;
    }

    return (
      <Button onPress={this.onSignupPress.bind(this)} >
        Sign Up
      </Button>
    );
  }

  render() {
    const { errorTextStyle, container } = styles;

    return (
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
                onChangeText={this.onPassword1Change.bind(this)}
                value={this.props.password1}
              />
            </CardSection>

            <CardSection>
              <Input
                secureTextEntry
                label="Confirm Password"
                placeholder="password"
                onChangeText={this.onPassword2Change.bind(this)}
                value={this.props.password2}
              />
            </CardSection>

            <CardSection style={{ flexDirection: 'row' }}>
              <Text style={styles.pickerTextStyle}>Position</Text>
              <Picker
                style={{ flex: 1 }}
                selectedValue={this.props.position}
                onValueChange={this.onPositionChange.bind(this)}
              >
                  <Picker.Item label="Batsman" value="batsman" />
                  <Picker.Item label="Bowler" value="bowler" />
                  <Picker.Item label="Wicket Keeper" value="wicketkeeper" />
                  <Picker.Item label="All Rounder" value="allrounder" />
              </Picker>
            </CardSection>

            <Text style={errorTextStyle}>
              {this.props.error}
            </Text>

            <CardSection>
              {this.renderButton()}
            </CardSection>
          </Card>

        </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  pickerTextStyle: {
    fontSize: 18,
    paddingLeft: 20,
    alignSelf: 'center',
    flex: 1
  },
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  }
};

const mapStateToProps = ({ signup }) => {
  const { email, password1, password2, position, error, loading } = signup;

  return { email, password1, password2, position, error, loading };
};

export default connect(mapStateToProps,
  {
    signupEmailChanged,
    signupPassword1Changed,
    signupPassword2Changed,
    signupPositionChanged,
    signupUser
})(SignupForm);
