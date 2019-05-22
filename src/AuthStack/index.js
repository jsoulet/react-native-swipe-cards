import { createStackNavigator } from 'react-navigation';
import SignUpScreen, { NAVIGATION_NAME as Signup } from './SignUpScreen';
import LoginScreen, { NAVIGATION_NAME as Login } from './LoginScreen';
// Forgot password

const AuthStack = createStackNavigator(
    {
        [Login]: {
            screen: LoginScreen,
        },
        [Signup]: {
            screen: SignUpScreen,
        },
    },
    {
        initialRouteName: Login,
        mode: 'modal',
    }
);

export const NAVIGATION_NAME = 'AUTH_STACK';

export default AuthStack;
