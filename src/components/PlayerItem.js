import React, { Component } from 'react';
import { Text, TouchableWithoutFeedback, View } from 'react-native';
import { CardSection } from './common';

class PlayerItem extends Component {

  render() {
    const { email, position } = this.props.user;

    return (
      <TouchableWithoutFeedback>
        <View>
          <CardSection>
            <Text style={styles.titleStyle}>
              Player email: {email} {'\n'}
              Player position: {position}
            </Text>
          </CardSection>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}
const styles = {
  titleStyle: {
    fontSize: 14,
    paddingLeft: 15
  }
};

export default PlayerItem;
