import React from 'react';
import { SafeAreaView } from 'react-native';
import { ThemeProvider } from 'react-native-elements';

import '$src/Firebase';
import App from '$src/index';
import variables from '$components/variables';

const AppContainer = () => {
  return (
    <ThemeProvider theme={variables.theme}>
      <SafeAreaView style={{ flex: 1 }}>
        <App />
      </SafeAreaView>
    </ThemeProvider>
  );
};
export default AppContainer;
