import React, { Component } from 'react';
import { ActivityIndicator, View, Text, StyleSheet } from 'react-native';
import firebase from 'firebase';
import { NAVIGATION_NAME as APP_NAVIGATION_NAME } from '../AppStack';
import { NAVIGATION_NAME as AUTH_NAVIGATION_NAME } from '../AuthStack';

class LoadingScreen extends Component {
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
        return (
            <View style={styles.view}>
                <ActivityIndicator size="large" />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    view: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export const NAVIGATION_NAME = 'LOADING_SCREEN';

export default LoadingScreen;
