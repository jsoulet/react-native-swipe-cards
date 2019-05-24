import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import { NAVIGATION_NAME as Signup } from '../SignUpScreen';

import { withUser } from '$src/store/UserProvider';
import LoginForm from './LoginForm';
import NewAccountLink from './NewAccountLink';

class LoginScreen extends Component {
  state = {
    error: null,
  };

  static propTypes = {
    user: PropTypes.shape({
      loginWithEmailAndPassword: PropTypes.func.isRequired,
    }),
  };

  onLoginHandler = async (email, password) => {
    try {
      await this.props.user.loginWithEmailAndPassword(email, password);
    } catch (error) {
      this.setState({
        error: error.message,
      });
    }
  };

  onPressSignUp = () => {
    this.props.navigation.navigate(Signup);
  };

  render() {
    return (
      <View style={styles.view}>
        <LoginForm onLogin={this.onLoginHandler} error={this.state.error} />
        <NewAccountLink onPressButton={this.onPressSignUp} />
      </View>
    );
  }
}

LoginScreen.navigationOptions = {
  title: 'Login',
  header: null,
};

const styles = StyleSheet.create({
  view: {
    flex: 1,
  },
});

export const NAVIGATION_NAME = 'LOGIN_SCREEN';
export default withUser(LoginScreen);
