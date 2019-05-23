import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import firebase from 'firebase';

import { NAVIGATION_NAME as Signup } from '../SignUpScreen';
import { NAVIGATION_NAME as App } from '$src/AppStack';
import LoginForm from './LoginForm';
import NewAccountLink from './NewAccountLink';

class LoginScreen extends Component {
  state = {
    error: null,
  };

  onLoginHandler = async (email, password) => {
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      this.props.navigation.navigate(App);
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
export default LoginScreen;
