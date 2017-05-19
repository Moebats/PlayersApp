import _ from 'lodash';
import React, { Component } from 'react';
import { ListView, View } from 'react-native';
import { connect } from 'react-redux';
import { Text, Icon, Button } from 'native-base';
import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import { playerFetch } from '../actions/SignupActions';
import PlayerItem from './PlayerItem.js';


class PlayerList extends Component {

  componentWillMount() {
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
  const users = _.map(state.users, (val, uid) => {
    return { ...val, uid };
  });
  console.log('users below');
  console.log(users);
  return { users };
};

export default connect(mapStateToProps, { playerFetch })(PlayerList);
