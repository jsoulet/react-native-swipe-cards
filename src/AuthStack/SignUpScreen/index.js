import React, { Component } from 'react';
import { View, Text, KeyboardAvoidingView, StyleSheet } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { NAVIGATION_NAME as App } from '$src/AppStack';
import firebase from 'firebase';

class SignUpScreen extends Component {
  state = {
    email: '',
    username: '',
    password: '',
    error: null,
  };

  signup = async (email, password) => {
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
            username: this.state.username,
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
    return (
      <KeyboardAvoidingView style={styles.view} behavior="padding">
        <Input
          autoCapitalize="none"
          autoCorrect={false}
          value={this.state.username}
          onChangeText={username => {
            this.setState({ username, error: null });
          }}
          onFocus={() => {
            this.setState({ error: null });
          }}
          label="Username"
        />
        <Input
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          value={this.state.email}
          onChangeText={email => {
            this.setState({ email, error: null });
          }}
          onFocus={() => {
            this.setState({ error: null });
          }}
          label="Email"
        />
        <Input
          secureTextEntry
          autoCapitalize="none"
          value={this.state.password}
          onChangeText={password => {
            this.setState({ password, error: null });
          }}
          onFocus={() => {
            this.setState({ error: null });
          }}
          label="Password"
        />
        {!!this.state.error && <Text style={styles.error}>{this.state.error}</Text>}
        <View style={styles.buttonContainer}>
          <Button
            title="Signup"
            onPress={() => this.signup(this.state.email, this.state.password)}
          />
        </View>
      </KeyboardAvoidingView>
    );
  }
}

SignUpScreen.navigationOptions = {
  title: 'Signup',
};

const styles = StyleSheet.create({
  view: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  buttonContainer: {
    marginTop: 20,
  },
});

export const NAVIGATION_NAME = 'SIGNUP_SCREEN';

export default SignUpScreen;
