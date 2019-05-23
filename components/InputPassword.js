import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { FontAwesome, SimpleLineIcons } from '@expo/vector-icons';

import variables from '$components/variables';
import Input from '$components/Input';

class PasswordInput extends Component {
  state = {
    isPasswordHidden: true,
  };

  onTogglePasswordHidden = () => {
    this.setState(({ isPasswordHidden }) => ({ isPasswordHidden: !isPasswordHidden }));
  };

  render() {
    return (
      <Input
        rightIcon={
          <FontAwesome
            onPress={this.onTogglePasswordHidden}
            name="eye"
            size={20}
            color={!this.state.isPasswordHidden ? variables.colors.primary : variables.colors.gray3}
          />
        }
        leftIcon={{
          set: SimpleLineIcons,
          size: 20,
          name: 'lock',
        }}
        secureTextEntry={this.state.isPasswordHidden}
        autoCapitalize="none"
        placeholder="Password"
        leftIconContainerStyle={styles.leftIconContainer}
        {...this.props}
      />
    );
  }
}

const styles = StyleSheet.create({
  leftIconContainer: {
    marginRight: 10,
  },
});

export default PasswordInput;
