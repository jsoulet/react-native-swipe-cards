import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, KeyboardAvoidingView } from 'react-native';
import { Button } from 'react-native-elements';
import { SimpleLineIcons } from '@expo/vector-icons';

import Input from '$components/Input';
import InputPassword from '$components/InputPassword';

class LoginForm extends Component {
  state = {
    email: '',
    password: '',
  };

  onChangeEmail = email => {
    this.setState({ email });
  };

  onChangePassword = password => {
    this.setState({ password });
  };

  render() {
    return (
      <KeyboardAvoidingView style={styles.view} behavior="padding">
        <Input
          value={this.state.email}
          onChangeText={this.onChangeEmail}
          placeholder="Email"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          inputContainerStyle={styles.inputContainer}
          leftIcon={{
            set: SimpleLineIcons,
            name: 'envelope',
            size: 20,
          }}
        />
        <InputPassword
          inputContainerStyle={styles.inputContainer}
          errorMessage={this.props.error}
          onChangeText={this.onChangePassword}
          value={this.state.password}
        />
        <View style={styles.buttonContainer}>
          <Button
            title="Login"
            onPress={() => this.props.onLogin(this.state.email, this.state.password)}
          />
        </View>
      </KeyboardAvoidingView>
    );
  }
}

LoginForm.propTypes = {
  onLogin: PropTypes.func.isRequired,
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
    width: '100%',
  },
  inputContainer: {
    marginBottom: 30,
  },
});

export default LoginForm;
