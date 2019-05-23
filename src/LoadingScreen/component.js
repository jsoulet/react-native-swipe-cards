import React from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';

const LoadingScreen = () => {
  return (
    <View style={styles.view}>
      <ActivityIndicator size="large" />
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export const NAVIGATION_NAME = 'LOADING_SCREEN';

export default LoadingScreen;
