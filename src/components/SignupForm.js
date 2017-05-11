import React, { Component } from 'react';
import { Text, View, Picker } from 'react-native';
import { connect } from 'react-redux';

import {
  signupEmailChanged,
  signupNameChanged,
  signupLocationChanged,
  signupPassword1Changed,
  signupPassword2Changed,
  signupPositionChanged,
  signupGeoLocationChanged,
  signupCityChanged,
  signupUser,
  signupShowModal
 } from '../actions';

import LocationModal from './LocationModal';
import LocationButton from './LocationButton';
import { Card, CardSection, Input, Button, Spinner } from './common';

class SignupForm extends Component {

  /**
    Constructor used to bind the methods with this component. Apparently
    this is best practice for binding for ES6.
  */
  constructor(props) {
    super(props);
    //SignupForm method binds
    this.onEmailChange = this.onEmailChange.bind(this);
    this.onPassword1Change = this.onPassword1Change.bind(this);
    this.onPassword2Change = this.onPassword2Change.bind(this);
    this.onPositionChange = this.onPositionChange.bind(this);
    this.onSignupPress = this.onSignupPress.bind(this);
    //LocationButton method binds
    this.onManuallyEnterLocation = this.onManuallyEnterLocation.bind(this);
    this.onGeoLocationSuccess = this.onGeoLocationSuccess.bind(this);
    this.onLocationSuccess = this.onLocationSuccess.bind(this);
    this.onCancelPressed = this.onCancelPressed.bind(this);
  }

  onGeoLocationSuccess(geolocation) {
    this.props.signupShowModal(false);
    this.props.signupGeoLocationChanged(geolocation);
  }

  onLocationSuccess(location) {
    this.props.signupShowModal(false);
    this.props.signupCityChanged(location);
  }

  onCancelPressed() {
    // Do nothing and return to the form
  }

  onManuallyEnterLocation() {
    this.props.signupShowModal(true);
  }

  onEmailChange(text) {
    this.props.signupEmailChanged(text);
  }

  onNameChange(text) {
    this.props.signupNameChanged(text);
  }

  onLocationChange(text) {
    this.props.signupLocationChanged(text);
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
    const { name, email, password1, position, location, city } = this.props;
    this.props.signupUser({ name, email, password: password1, position, location, city });
  }

  renderButton() {
    if (this.props.loading) {
      return <Spinner size="large" />;
    }

    return (
      <Button
        onPress={this.onSignupPress}
        disabled={this.props.error !== ''}
      >
        Sign Up
      </Button>
    );
  }

  render() {
    const { errorTextStyle, container } = styles;

    return (
        <View style={container}>
          <LocationModal
            visible={this.props.showModal}
            onLocationSuccess={this.onLocationSuccess}
            onGeoLocationSuccess={this.onGeoLocationSuccess}
          />
          <Card>
            <CardSection>
              <Input
                editable
                label="Email"
                placeholder="email@gmail.com"
                onChangeText={this.onEmailChange}
                value={this.props.email}
              />
            </CardSection>

            <CardSection>
              <Input
                label="Name"
                placeholder="Brian Lara"
                onChangeText={this.onNameChange.bind(this)}
                value={this.props.name}
              />
            </CardSection>

            <CardSection>
              <Input
                secureTextEntry
                editable
                label="Password"
                placeholder="password"
                onChangeText={this.onPassword1Change}
                value={this.props.password1}
              />
            </CardSection>

            <CardSection>
              <Input
                secureTextEntry
                editable
                label="Confirm Password"
                placeholder="password"
                onChangeText={this.onPassword2Change}
                value={this.props.password2}
              />
            </CardSection>

            <LocationButton
              onCancelPressed={this.onCancelPressed}
              onGeoLocationSuccess={this.onGeoLocationSuccess}
              onLocationSuccess={this.onLocationSuccess}
              onManuallyEnterLocation={this.onManuallyEnterLocation}
            >
              <CardSection>
                  <Input
                    label="Location"
                    placeholder="Toronto"
                    editable={false}
                    value={this.props.city}
                  />
              </CardSection>
            </LocationButton>
            <CardSection style={{ flexDirection: 'row' }}>
              <Text style={styles.pickerTextStyle}>Position</Text>
              <Picker
                style={{ flex: 1 }}
                selectedValue={this.props.position}
                onValueChange={this.onPositionChange}
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
  const { name, email, password1, password2, position,
    city, error, loading, showModal, location } = signup;

  return { name, email, password1, password2, position, city, error, loading, showModal, location };
};

export default connect(mapStateToProps,
  {
    signupEmailChanged,
    signupNameChanged,
    signupLocationChanged,
    signupPassword1Changed,
    signupPassword2Changed,
    signupPositionChanged,
    signupGeoLocationChanged,
    signupCityChanged,
    signupUser,
    signupShowModal
})(SignupForm);
