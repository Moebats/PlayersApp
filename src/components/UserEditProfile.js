import firebase from 'firebase';
import React, { Component } from 'react';
import { Text, View, StyleSheet, Picker, Modal } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';


import {
  signupEmailChanged,
  signupNameChanged,
  signupCityChanged,
  signupPositionChanged
 } from '../actions';

import { Card, CardSection, Input, Button, Spinner, Confirm } from './common';

class UserEditProfile extends Component {
  state = { showModal: false };

  componentWillMount() {
    const { currentUser } = firebase.auth();
    const id = currentUser.uid;
    console.log(id);
    console.log(this.props.usersObject[id]);
  }

  //calling action creators
  onEmailChange(text) {
    this.props.signupEmailChanged(text);
  }

  onNameChange(text) {
    this.props.signupNameChanged(text);
  }

  onCityChange(text) {
    this.props.signupCityChanged(text);
  }

  onPositionChange(text) {
    this.props.signupPositionChanged(text);
  }

  onSavePress() {
    const { email, name, city, position } = this.props;
    const usersRef = firebase.database().ref('/users');
    const userSave = firebase.auth().currentUser;

    usersRef.child(this.returnId()).set({
        email,
        name,
        city,
        position
      });

    userSave.updateEmail(email);
  }

  onDeletePress() {
    this.setState({ showModal: true });
  }

  returnId() {
    const { currentUser } = firebase.auth();
    const id = currentUser.uid;
    return id;
  }


  renderButton() {
    if (this.props.loading) {
      return <Spinner size="large" />;
    }

    return (
      <Button onPress={this.onSavePress.bind(this)} >
        Save changes
      </Button>
    );
  }

  renderButtonDelete() {
    if (this.props.loading) {
      return <Spinner size="large" />;
    }
    const { buttonStyle } = styles;

    return (
      <Button onPress={this.onDeletePress.bind(this)} style={buttonStyle} >
        Delete Account
      </Button>
    );
  }
  onAccept() {
    firebase.database().ref('/users').off();
    const usersRef = firebase.database().ref('/users');
    usersRef.child(this.returnId()).remove().then(() => {
      Actions.auth({ type: 'reset' });
    });

    const userDelete = firebase.auth().currentUser;
    userDelete.delete();
  }

  onDecline() {
    this.setState({ showModal: false });
  }

  render() {
    const { errorTextStyle, container } = styles;

    return (
        <View style={container}>
          <Card>
            <CardSection>
              <Input
                label="Email"
                placeholder={this.props.usersObject[this.returnId()].email}
                onChangeText={this.onEmailChange.bind(this)}
                value={this.props.email}
              />
            </CardSection>

            <CardSection>
              <Input
                label="Name"
                placeholder={this.props.usersObject[this.returnId()].name}
                onChangeText={this.onNameChange.bind(this)}
                value={this.props.name}
              />
            </CardSection>

            <CardSection>
              <Input
                label="City"
                placeholder={this.props.usersObject[this.returnId()].city}
                onChangeText={this.onCityChange.bind(this)}
                value={this.props.city}
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

            <CardSection>
              {this.renderButtonDelete()}
            </CardSection>

            <Confirm
             visible={this.state.showModal}
             onAccept={this.onAccept.bind(this)}
             onDecline={this.onDecline.bind(this)}
            >
              Are you sure you want to delete your account?
            </Confirm>
          </Card>

        </View>
    );
  }
}

const styles = StyleSheet.create({
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
});

const mapStateToProps = ({ signup, users }) => {
  const { email, name, city, position, error, loading } = signup;
  const usersObject = users;

  return { usersObject, email, name, city, position, error, loading };
};

export default connect(mapStateToProps,
  {
    signupEmailChanged,
    signupNameChanged,
    signupCityChanged,
    signupPositionChanged
})(UserEditProfile);
