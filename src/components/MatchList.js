import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { CardSection } from './common';

class MatchList extends Component {

  render() {
    return (

        <View>
          <CardSection>
            <Text style={styles.titleStyle}>
              Match List
            </Text>
          </CardSection>
        </View>
    );
  }
}
const styles = {
  titleStyle: {
    fontSize: 14,
    paddingLeft: 15
  }
};

export default MatchList;
