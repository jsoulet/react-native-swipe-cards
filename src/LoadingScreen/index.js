import React, { Component } from 'react';
import firebase from 'firebase';

import { NAVIGATION_NAME as APP_NAVIGATION_NAME } from '../AppStack';
import { NAVIGATION_NAME as AUTH_NAVIGATION_NAME } from '../AuthStack';

import LoadingScreen from './component';

class LoadingScreenContainer extends Component {
  componentDidMount() {
    this.checkLogin();
  }

  checkLogin = () => {
    if (firebase.auth().currentUser) {
      this.props.navigation.navigate(APP_NAVIGATION_NAME);
    } else {
      this.props.navigation.navigate(AUTH_NAVIGATION_NAME);
    }
  };

  render() {
    return <LoadingScreen />;
  }
}

export const NAVIGATION_NAME = 'LOADING_SCREEN';

export default LoadingScreenContainer;
