import React, { Component } from 'react';
import { Container, Content, ListItem, Thumbnail, Text, Body, Left, Right, Icon } from 'native-base';


class PlayerItem extends Component {

  render() {
    const { name, location, position } = this.props.user;

    return (
                <ListItem avatar>
                    <Left>
                        <Thumbnail source={require('./avatar.png')} />
                    </Left>
                    <Body>
                        <Text>{name}</Text>
                        <Text note>Player type: {position}</Text>
                        <Text note>Location: {location}</Text>
                    </Body>
                    <Right>
                        <Icon name='chatboxes' style={{fontSize: 20, color: '#1ec949'}} />
                    </Right>
                </ListItem>
    );
  }
}

export default PlayerItem;
