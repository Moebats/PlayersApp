import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

const Button = ({ onPress, children, disabled }) => {
  const { buttonStyle, textStyle } = styles;

  // By default button is enabled, if a disabled prop is passed in
  // then the button enabled state is controlled by the prop.
  let isDisabled = false;
  if (disabled) {
    isDisabled = disabled;
  }
  return (
    <TouchableOpacity
      onPress={onPress}
      style={buttonStyle}
      disabled={isDisabled}
    >
      <Text style={textStyle}>
        {children}
      </Text>
    </TouchableOpacity>
  );
};

const styles = {
  textStyle: {
    alignSelf: 'center',
    color: '#007aff',
    fontSize: 16,
    fontWeight: '600',
    paddingTop: 10,
    paddingBottom: 10
  },
  buttonStyle: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: '#fff',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#007aff',
    marginLeft: 5,
    marginRight: 5
  }
};

export { Button };
