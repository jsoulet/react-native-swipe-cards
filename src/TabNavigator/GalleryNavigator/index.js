import {createStackNavigator, getActiveChildNavigationOptions} from 'react-navigation';

import ImagePreview from './ImagePreview';
import Gallery from './Gallery';

const GalleryNavigator = createStackNavigator({
  ImagePreview: {
    screen: ImagePreview,
    path: '/ImagePreview'
  },
  Gallery: {
    screen: Gallery,
    path: '/Gallery'
  }
}, {
  initialRouteName: 'Gallery',
  mode: 'modal',
  //headerMode: 'none',
  navigationOptions: ({ navigation, screenProps }) => {
    console.log(getActiveChildNavigationOptions(navigation, screenProps))
    return ({
    // you can put fallback values before here, eg: a default tabBarLabel
    ...getActiveChildNavigationOptions(navigation, screenProps),
    // put other navigationOptions that you don't want the active child to
    // be able to override here!
  })}

})

export default GalleryNavigator;
