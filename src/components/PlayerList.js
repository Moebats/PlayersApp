import React, { Component } from 'react';
import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import { Button, Card, CardSection } from './common';

class PlayerList extends Component {

  logout() {
    firebase.auth().signOut()
      .then(() => {
          Actions.auth();
        })
      .catch((error) => {
          console.error('Sign Out Error', error);
        });
  }

  render() {
    return (
      <Card>
        <CardSection>
          <Button onPress={this.logout.bind(this)}>
            Logout
          </Button>
        </CardSection>
      </Card>
    );
  }

}

export default PlayerList;
