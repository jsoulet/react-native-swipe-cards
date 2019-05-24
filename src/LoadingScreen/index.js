import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { NAVIGATION_NAME as APP_NAVIGATION_NAME } from '../AppStack';
import { NAVIGATION_NAME as AUTH_NAVIGATION_NAME } from '../AuthStack';

import LoadingScreen from './component';
import { withUser } from '$src/store/UserProvider';

class LoadingScreenContainer extends Component {
  static propTypes = {
    user: PropTypes.shape({
      onAuthenticationChange: PropTypes.func.isRequired,
    }),
  };

  constructor(props) {
    super(props);
    this.checkLogin();
  }

  checkLogin = () => {
    this.props.user.onAuthenticationChange(
      () => this.props.navigation.navigate(APP_NAVIGATION_NAME),
      () => this.props.navigation.navigate(AUTH_NAVIGATION_NAME)
    );
  };

  render() {
    return <LoadingScreen />;
  }
}

export const NAVIGATION_NAME = 'LOADING_SCREEN';

export default withUser(LoadingScreenContainer);
