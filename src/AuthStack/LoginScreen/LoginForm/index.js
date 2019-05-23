import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, KeyboardAvoidingView } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { SimpleLineIcons, MaterialCommunityIcons } from '@expo/vector-icons';

import variables from '$components/variables';

class LoginForm extends Component {
  state = {
    focusedInput: null,
    isPasswordInputProtected: true,
    email: '',
    password: '',
  };

  onChangeEmail = email => {
    this.setState({ email });
  };

  onChangePassword = password => {
    this.setState({ password });
  };

  onTogglePasswordInputProtection = () => {
    this.setState(({ isPasswordInputProtected }) => ({
      isPasswordInputProtected: !isPasswordInputProtected,
    }));
  };

  render() {
    return (
      <KeyboardAvoidingView style={styles.view} behavior="padding">
        <Input
          inputContainerStyle={styles.inputContainer}
          leftIcon={
            <SimpleLineIcons
              name="envelope"
              size={20}
              color={
                this.state.focusedInput === 'email'
                  ? variables.colors.primary
                  : variables.colors.gray3
              }
            />
          }
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          value={this.state.email}
          onChangeText={this.onChangeEmail}
          placeholder="Email"
          leftIconContainerStyle={styles.inputIconContainer}
          onFocus={() => {
            this.setState({ focusedInput: 'email' });
          }}
          onBlur={() => {
            this.setState(focusedInput => ({
              focusedInput: focusedInput === 'email' ? null : focusedInput,
            }));
          }}
        />
        <Input
          inputContainerStyle={styles.inputContainer}
          errorMessage={this.props.error}
          leftIcon={
            <SimpleLineIcons
              name="lock"
              size={20}
              color={
                this.state.focusedInput === 'password'
                  ? variables.colors.primary
                  : variables.colors.gray3
              }
            />
          }
          rightIcon={
            <MaterialCommunityIcons
              name="eye-outline"
              size={20}
              onPress={this.onTogglePasswordInputProtection}
              color={
                !this.state.isPasswordInputProtected
                  ? variables.colors.primary
                  : variables.colors.gray3
              }
            />
          }
          secureTextEntry={this.state.isPasswordInputProtected}
          autoCapitalize="none"
          value={this.state.password}
          onChangeText={this.onChangePassword}
          placeholder="Password"
          leftIconContainerStyle={styles.inputIconContainer}
          onFocus={() => {
            this.setState({ focusedInput: 'password' });
          }}
          onBlur={() => {
            this.setState(focusedInput => ({
              focusedInput: focusedInput === 'password' ? null : focusedInput,
            }));
          }}
        />
        <View style={styles.buttonContainer}>
          <Button
            title="Login"
            onPress={() => this.props.onPressLogin(this.state.email, this.state.password)}
          />
        </View>
      </KeyboardAvoidingView>
    );
  }
}

LoginForm.propTypes = {
  onPressLogin: PropTypes.func.isRequired,
  error: PropTypes.string,
};

const styles = StyleSheet.create({
  view: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    marginTop: 20,
  },
  inputContainer: {
    margin: 0,
    marginBottom: 30,
    padding: 0,
  },
  inputIconContainer: {
    paddingRight: 10,
    margin: 0,
  },
});

export default LoginForm;
