import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';

const Images = [
  { id: '1', uri: require('../../../../assets/images/palmtree.jpg'), name:'palmtree' },
  { id: '2', uri: require('../../../../assets/images/church.jpg'), name:'church' },
  { id: '3', uri: require('../../../../assets/images/egg.jpg'), name:'egg' },
  { id: '4', uri: require('../../../../assets/images/cookies.jpg'), name:'cookies' },
  { id: '5', uri: require('../../../../assets/images/forest.jpg'), name:'forest' },
];

const ImagePreview  = ({navigation}) => {
  const imageId = navigation.getParam('id', null);
  const image = Images.find((item) => item.id === imageId);
  if(!image) {
    return <View style={styles.view}><Text>Image Not Found</Text></View>
  }
  console.log({image})
  return <View style={styles.view}><Image source={image.uri}/></View>
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});

export default ImagePreview;
