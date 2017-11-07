import firebase from 'firebase';
import React, { Component } from 'react';
import { Text, Picker, View, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { Icon, Container, Button, Content, Form, Item, Input, Label } from 'native-base';
import {
  signupEmailChanged,
  signupNameChanged,
  signupCityChanged,
  signupGeoLocationChanged,
  signupPositionChanged,
  signupShowModal,
  userDataFetchSuccess
 } from '../actions';
 import LocationModal from './LocationModal';
 import LocationButton from './LocationButton';
import { CardSection, Spinner, Confirm } from './common';

class UserEditProfile extends Component {

  /**
    Constructor used to bind the methods with this component. Apparently
    this is best practice for binding for ES6.
  */
  constructor(props) {
    super(props);

    //LocationButton method binds
    this.onManuallyEnterLocation = this.onManuallyEnterLocation.bind(this);
    this.onGeoLocationSuccess = this.onGeoLocationSuccess.bind(this);
    this.onLocationSuccess = this.onLocationSuccess.bind(this);
    this.onCancelPressed = this.onCancelPressed.bind(this);

    //LocationModal binds
    this.onModalCancel = this.onModalCancel.bind(this);
  }

  state = { showDeleteConfirmModal: false };

  componentWillMount() {
    const { currentUser } = firebase.auth();
    const id = currentUser.uid;
    const userData = firebase.database().ref(`/users/${id}`);
    userData.once('value', snapshot => {
      this.props.userDataFetchSuccess({ ...snapshot.val(), email: currentUser.email });
    },
    () => console.log('Error occurred during data fetch'));
  }

  onGeoLocationSuccess(geolocation) {
    this.onModalCancel();
    this.props.signupGeoLocationChanged(geolocation);
  }

  onLocationSuccess(location) {
    this.onModalCancel();
    this.props.signupCityChanged(location);
  }

  onModalCancel() {
    this.props.signupShowModal(false);
  }

  onCancelPressed() {
    // Do nothing and return to the form
  }

  onManuallyEnterLocation() {
    this.props.signupShowModal(true);
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
    const { email, name, city, position, location, region } = this.props;
    const usersRef = firebase.database().ref('/users');
    const userSave = firebase.auth().currentUser;
    usersRef.child(this.returnId()).set({
        name,
        city,
        location,
        region,
        position
      });
      userSave.updateProfile({
        displayName: name,
        email
      });
  }

  onDeletePress() {
    this.setState({ showDeleteConfirmModal: true });
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
    this.setState({ showDeleteConfirmModal: false });
  }

  returnId() {
    const { currentUser } = firebase.auth();
    const id = currentUser.uid;
    return id;
  }

  renderLocationItem() {
    if (this.props.location !== null) {
      return (
        <View style={{ flexDirection: 'row', width: '67%' }}>
          <Input
            label="Location"
            placeholder={this.props.placeholder.city}
            editable={false}
            value={this.props.city}
          />
          <LocationButton
          onCancelPressed={this.onCancelPressed}
          onGeoLocationSuccess={this.onGeoLocationSuccess}
          onLocationSuccess={this.onLocationSuccess}
          onManuallyEnterLocation={this.onManuallyEnterLocation}
          />
        </View>
      );
    }
    return (
      <LocationButton
      onCancelPressed={this.onCancelPressed}
      onGeoLocationSuccess={this.onGeoLocationSuccess}
      onLocationSuccess={this.onLocationSuccess}
      onManuallyEnterLocation={this.onManuallyEnterLocation}
      />
    );
  }

  renderButton() {
    if (this.props.loading) {
      return <Spinner size="large" />;
    }
    const { button } = styles;

    return (
      <Button
        block success iconLeft
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
      <Button
        block danger iconLeft
        onPress={this.onDeletePress.bind(this)}
        style={button}
      >
        <Icon name='person' />
        <Text style={whiteText} >Delete Account</Text>
      </Button>
    );
  }

  render() {
    const { errorTextStyle, container, baseContainer } = styles;
    return (
      <View style={baseContainer}>
        <ScrollView>
          <Container style={container}>
          <LocationModal
            visible={this.props.showModal}
            onLocationSuccess={this.onLocationSuccess}
            onGeoLocationSuccess={this.onGeoLocationSuccess}
            onModalCancel={this.onModalCancel}
          />
              <Content>
                  <Form>
                      <Item fixedLabel>
                          <Label>Email</Label>
                          <Input
                            editable
                            autoCapitalize='none'
                            keyboardType='email-address'
                            label="Email"
                            placeholder={this.props.placeholder.email}
                            onChangeText={this.onEmailChange.bind(this)}
                            value={this.props.email}
                          />
                      </Item>
                      <Item fixedLabel>
                          <Label>Name</Label>
                          <Input
                            label="Name"
                            placeholder={this.props.placeholder.name}
                            onChangeText={this.onNameChange.bind(this)}
                            value={this.props.name}
                          />
                      </Item>

                      <Item fixedLabel>
                        <Label>Location</Label>
                        {this.renderLocationItem()}
                      </Item>


                      <CardSection style={{ flexDirection: 'row' }}>
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


                    <CardSection style={{ justifyContent: 'center', marginBottom: 15 }}>
                      <Text style={errorTextStyle}>
                        {this.props.error}
                      </Text>
                    </CardSection>
                  </Form>

                    {this.renderButton()}
                    {this.renderButtonDelete()}

                  <Confirm
                   visible={this.state.showDeleteConfirmModal}
                   onAccept={this.onAccept.bind(this)}
                   onDecline={this.onDecline.bind(this)}
                  >
                    Are you sure you want to delete your account?
                  </Confirm>
              </Content>
            </Container>
          </ScrollView>
        </View>
    );
  }
}

const styles = {
  button: {
    margin: 10,
    marginBottom: 5
  },
  baseContainer: {
    marginTop: 63,
    flex: 1,
    justifyContent: 'center'
  },
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
  },
  whiteText: {
    color: 'white'
  }
};

const mapStateToProps = ({ signup }) => {
  const {
    email, name, city, position, error, location, loading, showModal, placeholder, region
  } = signup;

  return {
    email,
    name,
    city,
    position,
    error,
    loading,
    location,
    showModal,
    placeholder,
    region
  };
};

export default connect(mapStateToProps,
  {
    signupEmailChanged,
    signupNameChanged,
    signupCityChanged,
    signupPositionChanged,
    signupGeoLocationChanged,
    signupShowModal,
    userDataFetchSuccess
})(UserEditProfile);
