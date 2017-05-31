import React, { Component } from 'react';
import { ListItem, Thumbnail, Text, Body, Left, Right, Icon } from 'native-base';


class PlayerItem extends Component {

  render() {
    const { name, city, position, distance } = this.props.user;
    const rounded = distance.toFixed(4)

    return (
                <ListItem avatar>
                    <Left>
                        <Thumbnail source={require('../images/batsman.png')} />
                    </Left>
                    <Body>
                        <Text>{name}</Text>
                        <Text note>Player type: {position}</Text>
                        <Text note>Location: {city}</Text>
                        <Text note>Distance from you: {rounded} km</Text>
                    </Body>
                    <Right>
                        <Icon name='chatboxes' style={{ fontSize: 20, color: '#1ec949' }} />
                    </Right>
                </ListItem>
    );
  }
}

export default PlayerItem;
