import React, { Component } from 'react';
import { Button, ListItem, Thumbnail, Text, Body, Left, Right, Icon } from 'native-base';
import { Actions } from 'react-native-router-flux';


class PlayerItem extends Component {

  render() {
    const { name, city, position, uid } = this.props.user;

    return (
      <ListItem avatar>
          <Left>
              <Thumbnail source={require('../images/batsman.png')} />
          </Left>
          <Body>
              <Text>{name}</Text>
              <Text note>Player type: {position}</Text>
              <Text note>Location: {city}</Text>
          </Body>
          <Right>
            <Button
              onPress={() => Actions.playerChat({ name, uid })}
              transparent
            >
              <Icon name='chatboxes' style={{ fontSize: 20, color: '#1ec949' }} />
            </Button>
          </Right>
      </ListItem>
    );
  }
}

export default PlayerItem;
