import firebase from 'firebase';
import React, { Component } from 'react';
import { Text, View, StyleSheet, Picker, Modal } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { Icon, Container, Button, Content, Form, Item, Input, Label} from 'native-base';

import {
  signupEmailChanged,
  signupNameChanged,
  signupCityChanged,
  signupPositionChanged
 } from '../actions';

import { Card, CardSection, Spinner, Confirm } from './common';

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
    const { button } = styles;

    return (
      <Button block bordered success iconLeft
        onPress={this.onSavePress.bind(this)}
        disabled={this.props.error !== ''}
        style={button}
      >
        <Icon name='person' />
        <Text>Save changes</Text>
      </Button>
    );
  }

  renderButtonDelete() {
    const { button, whiteText } = styles;
    return (
      <Button block danger iconLeft
        onPress={this.onDeletePress.bind(this)}
        style={button}
      >
        <Icon name='person' />
        <Text style={whiteText} >Delete Account</Text>
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
        <Container style={container}>
              <Content>
                  <Form>
                      <Item fixedLabel>
                          <Label>Email</Label>
                          <Input
                            editable
                            label="Email"
                            placeholder={this.props.usersObject[this.returnId()].email}
                            onChangeText={this.onEmailChange.bind(this)}
                            value={this.props.email}
                          />
                      </Item>
                      <Item fixedLabel>
                          <Label>Name</Label>
                          <Input
                            label="Name"
                            placeholder={this.props.usersObject[this.returnId()].name}
                            onChangeText={this.onNameChange.bind(this)}
                            value={this.props.name}
                          />
                      </Item>

                        <Item fixedLabel>
                            <Label>City</Label>
                            <Input
                              label="City"
                              placeholder={this.props.usersObject[this.returnId()].city}
                              onChangeText={this.onCityChange.bind(this)}
                              value={this.props.city}
                            />
                        </Item>

                      <CardSection style={{ flexDirection: 'row' }}>
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
                  </Form>

                    {this.renderButton()}
                    {this.renderButtonDelete()}

                  <Confirm
                   visible={this.state.showModal}
                   onAccept={this.onAccept.bind(this)}
                   onDecline={this.onDecline.bind(this)}
                  >
                    Are you sure you want to delete your account?
                  </Confirm>
              </Content>
          </Container>
    );
  }
}

const styles = {
  button: {
    margin: 10
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    marginTop: 80
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
  },
  whiteText: {
    color: 'white'
  }
};

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
