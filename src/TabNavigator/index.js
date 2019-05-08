import React from 'react';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';

import SwipeCards from './SwipeCards';
import GalleryNavigator from './GalleryNavigator';
import Camera from './Camera';
const TabNavigator = createBottomTabNavigator({
  SwipeCards: SwipeCards,
  Camera: Camera,
  GalleryNavigator: GalleryNavigator,
},
{
  initialRouteName: 'GalleryNavigator',
  navigationOptions: ({ navigation }) => {
    const tabBarVisible = !navigation.state.routes[navigation.state.index].params.hideTabBar;

    return {
      tabBarVisible,
    };
  }
});

export default createAppContainer(TabNavigator);
