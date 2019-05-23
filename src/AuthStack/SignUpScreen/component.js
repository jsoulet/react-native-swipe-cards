import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, KeyboardAvoidingView, StyleSheet } from 'react-native';
import { Ionicons, SimpleLineIcons } from '@expo/vector-icons';
import { Button } from 'react-native-elements';

import Input from '$components/Input';
import InputPassword from '$components/InputPassword';

class SignUpScreen extends Component {
  state = {
    email: '',
    username: '',
    password: '',
  };

  onChangeValue = key => value => {
    this.setState({
      [key]: value,
    });
  };

  render() {
    const { onSignup } = this.props;
    return (
      <KeyboardAvoidingView style={styles.view} behavior="height" enabled>
        <Input
          leftIcon={{
            set: Ionicons,
            name: 'md-person',
            size: 20,
          }}
          autoCapitalize="none"
          autoCorrect={false}
          value={this.state.username}
          onChangeText={this.onChangeValue('username')}
          placeholder="Username"
          inputContainerStyle={styles.inputContainer}
        />
        <Input
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          value={this.state.email}
          leftIcon={{
            set: SimpleLineIcons,
            name: 'envelope',
            size: 20,
          }}
          onChangeText={this.onChangeValue('email')}
          placeholder="Email"
          inputContainerStyle={styles.inputContainer}
        />
        <InputPassword
          value={this.state.password}
          onChangeText={this.onChangeValue('password')}
          inputContainerStyle={styles.inputContainer}
          errorMessage={this.props.error}
        />
        <View style={styles.buttonContainer}>
          <Button
            title="Signup"
            onPress={() => onSignup(this.state.email, this.state.password, this.state.username)}
          />
        </View>
      </KeyboardAvoidingView>
    );
  }
}

SignUpScreen.propTypes = {
  error: PropTypes.string,
  onSignup: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  view: {
    flex: 1,
    paddingRight: 20,
    paddingLeft: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    marginTop: 20,
    width: '100%',
  },
  inputContainer: {
    marginBottom: 30,
  },
});

export const NAVIGATION_NAME = 'SIGNUP_SCREEN';

export default SignUpScreen;
