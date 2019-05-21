import React, {Component} from 'react';
import {View, Text, TextInput, StyleSheet, KeyboardAvoidingView} from 'react-native';
import {Input, Button} from 'react-native-elements';
import {NAVIGATION_NAME as Signup} from '../SignUpScreen';
import {NAVIGATION_NAME as App} from '$src/AppStack';
import firebase from 'firebase';
import variables from '$components/variables';

class LoginScreen extends Component {
  state  = {
    email: '',
    password: '',
    error: null,
  }

  login = async (email, password) => {
    try {
      await firebase
        .auth()
        .signInWithEmailAndPassword(email, password);
      this.props.navigation.navigate(App);
    } catch(error) {
      this.setState({
        error: error.message
      });
    }
  }

  onPressSignUp = () => {
    this.props.navigation.navigate(Signup);
  }

  render () {
    return <KeyboardAvoidingView style={styles.view} behavior="padding">
    <Input
      keyboardType="email-address"
      autoCapitalize="none"
      autoCorrect={false}
      value={this.state.email}
      onChangeText={(email) => {this.setState({email})}}
      onFocus={() => {this.setState({error: null})}}
      label="Email"
    />
    <Input
      secureTextEntry
      autoCapitalize="none"
      value={this.state.password}
      onChangeText={(password) => {this.setState({password})}}
      onFocus={() => {this.setState({error: null})}}
      label="Password"
    />
    {!!this.state.error && <Text style={styles.error}>{this.state.error}</Text>}
    <View style={styles.buttonContainer}>
      <Button title="Login" onPress={() => this.login(this.state.email, this.state.password)}/>
      <Button title="Create a new account" type="clear" onPress={this.onPressSignUp}/>
    </View>
  </KeyboardAvoidingView>
  }
}

LoginScreen.navigationOptions = {
    title: 'Login',
    header: null
};

const styles = StyleSheet.create({
  view: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    marginTop: 20
  },
  error: {
    color: variables.color.negative
  }
});

export const NAVIGATION_NAME = 'LOGIN_SCREEN';
export default LoginScreen;
