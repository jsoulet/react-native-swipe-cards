/* eslint-disable react/no-unused-state */
import React, { Component, createContext } from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase';

const UserContext = createContext();

class UserProvider extends Component {
  state = {
    uid: null,
    userInfo: null,
    loginWithEmailAndPassword: this.loginWithEmailAndPassword,
  };

  static propTypes = {
    children: PropTypes.element.isRequired,
  };

  setUid = uid => {
    this.setState({ uid });
    this.setUser(uid);
  };

  setUser = async uid => {
    try {
      await firebase
        .database()
        .ref(`users/${uid}`)
        .on('value', snapshot => {
          this.setState({ userInfo: snapshot.val() });
        });
    } catch (error) {
      console.log('An error occured retreiving the user', error.message);
    }
  };

  loginWithEmailAndPassword = async (email, password) => {
    const user = await firebase.auth().signInWithEmailAndPassword(email, password);
    await this.setUid(user.uid);
  };

  onAuthenticationChange = async (onAuthenticated = () => {}, onAnonymous = () => {}) => {
    firebase.auth().onAuthStateChanged(async user => {
      if (user) {
        onAuthenticated(user);
        await this.setUser(user.uid);
      } else {
        onAnonymous();
      }
    });
  };

  render() {
    return (
      <UserContext.Provider
        value={{
          user: {
            ...this.state,
            onAuthenticationChange: this.onAuthenticationChange,
            loginWithEmailAndPassword: this.loginWithEmailAndPassword,
          },
        }}
      >
        {this.props.children}
      </UserContext.Provider>
    );
  }
}

export const withUser = WrappedComponent => props => (
  <UserContext.Consumer>{store => <WrappedComponent {...props} {...store} />}</UserContext.Consumer>
);

export const UserConsumer = UserContext.Consumer;
export default UserProvider;
