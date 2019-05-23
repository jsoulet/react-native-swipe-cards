import React, { Component } from 'react';
import { NAVIGATION_NAME as App } from '$src/AppStack';
import firebase from 'firebase';

import SignupScreen from './component';

class SignUpScreenContainer extends Component {
  static navigationOptions = {
    title: 'Signup',
  };

  state = {
    error: '',
  };

  onSignupHandler = async (email, password, username) => {
    try {
      const result = await firebase.auth().createUserWithEmailAndPassword(email, password);
      if (result) {
        const { user } = result;
        console.log(user);
        firebase
          .database()
          .ref(`/users/${user.uid}`)
          .set({
            email: user.email,
            username,
            createdAt: Date.now(),
          });
        this.props.navigation.navigate(App);
      } else {
        throw new Error('Cannot create account');
      }
    } catch (error) {
      this.setState({
        error: error.message,
      });
    }
  };

  render() {
    return <SignupScreen onSignup={this.onSignupHandler} error={this.state.error} />;
  }
}

export const NAVIGATION_NAME = 'SIGNUP_SCREEN';

export default SignUpScreenContainer;
