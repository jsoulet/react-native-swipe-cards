import { createBottomTabNavigator } from 'react-navigation';

import SwipeCards from './SwipeCards';
import GalleryNavigator from './GalleryNavigator';
import Camera from './Camera';

import variables from '$components/variables';

const AppStack = createBottomTabNavigator(
  {
    SwipeCards,
    Camera,
    GalleryNavigator,
  },
  {
    initialRouteName: 'GalleryNavigator',
    tabBarOptions: {
      activeTintColor: variables.colors.primary,
      inactiveTintColor: variables.colors.gray0,
      showLabel: false,
    },
  }
);

export const NAVIGATION_NAME = 'APP_STACK';

export default AppStack;
