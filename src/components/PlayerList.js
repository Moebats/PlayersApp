import _ from 'lodash';
import React, { Component } from 'react';
import { ListView, View } from 'react-native';
import { connect } from 'react-redux';
import { Text, Icon, Button } from 'native-base';
import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import { playerFetch, showGeo } from '../actions/PlayersListActions';
import PlayerItem from './PlayerItem.js';


class PlayerList extends Component {

  componentWillMount() {
    this.props.showGeo();
    this.props.playerFetch();
    this.createDataSource(this.props);
  }

  componentWillReceiveProps(nextProps) {
      this.createDataSource(nextProps);
    }

  createDataSource({ users }) {
      const ds = new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2
      });
      this.dataSource = ds.cloneWithRows(users);
    }

  logout() {
    firebase.auth().signOut()
      .then(() => {
          Actions.auth({ reset: true });
        })
      .catch((error) => {
          console.error('Sign Out Error', error);
        });
  }

  userProfile() {
    Actions.userEdit();
  }

  renderRow(user) {
  return <PlayerItem user={user} />;
}

  render() {
    const { button } = styles;

    return (
      <View>
        <ListView
          style={styles.container}
          enableEmptySections
          dataSource={this.dataSource}
          renderRow={this.renderRow}
        />

        <Button
          block bordered success iconLeft
          onPress={this.userProfile.bind(this)}
          style={button}
        >
          <Icon name='person' />
          <Text>User profile</Text>
        </Button>

        <Button
          block bordered danger iconLeft
          onPress={this.logout.bind(this)}
          style={button}
        >
          <Icon name='alarm' />
          <Text>Logout</Text>
        </Button>

     </View>
    );
  }
}

const styles = {
  container: {
    marginTop: 20
  },
  button: {
    margin: 10,
  }
};

const mapStateToProps = state => {
  // console.log('users below original');
  // console.log(state.users);
  const users = _.map(state.geo, (val) => {
    return { ...val };
  });

  console.log(state.geo);
  let i;
    for (i = 0; i < users.length; i++){
      if (users[i].distance === 0) {
        users.splice(i, 1);
      }
    }
  // const users2 = _.map(state.geo, (val) => {
  //   return { ...val };
  // });
  // const users = state.geo;
  console.log(state.geo);
  console.log(state.users);
  // console.log('users below coverted');
  // console.log(users);
  // console.log(users2);

  return { users };
};

export default connect(mapStateToProps, { playerFetch, showGeo })(PlayerList);
