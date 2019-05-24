import React from 'react';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import { SafeAreaView } from 'react-native';
import { ThemeProvider } from 'react-native-elements';
import '$src/Firebase';
import variables from '$components/variables';

import AuthStack, { NAVIGATION_NAME as Auth } from './AuthStack';
import LoadingScreen, { NAVIGATION_NAME as Loading } from './LoadingScreen';
import AppStack, { NAVIGATION_NAME as App } from './AppStack';
import UserProvider from '$src/store/UserProvider';

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

const AppContainer = createAppContainer(appNavigator);

const Root = () => {
  return (
    <UserProvider>
      <ThemeProvider theme={variables.theme}>
        <SafeAreaView style={{ flex: 1 }}>
          <AppContainer />
        </SafeAreaView>
      </ThemeProvider>
    </UserProvider>
  );
};

export default Root;
