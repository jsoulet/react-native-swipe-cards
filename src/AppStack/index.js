import React from 'react';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';

import SwipeCards from './SwipeCards';
import GalleryNavigator from './GalleryNavigator';
import Camera from './Camera';

const AppStack = createBottomTabNavigator(
    {
        SwipeCards: SwipeCards,
        Camera: Camera,
        GalleryNavigator: GalleryNavigator,
    },
    {
        initialRouteName: 'GalleryNavigator',
    }
);

export const NAVIGATION_NAME = 'APP_STACK';

export default AppStack;
