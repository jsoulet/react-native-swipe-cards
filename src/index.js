import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import AuthStack, { NAVIGATION_NAME as Auth } from './AuthStack';
import LoadingScreen, { NAVIGATION_NAME as Loading } from './LoadingScreen';
import AppStack, { NAVIGATION_NAME as App } from './AppStack';

const appNavigator = createSwitchNavigator(
  {
    [Auth]: AuthStack,
    [App]: AppStack,
    [Loading]: LoadingScreen,
  },
  {
    initialRouteName: Loading,
  }
);

const appContainer = createAppContainer(appNavigator);
export default appContainer;
