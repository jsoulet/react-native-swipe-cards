import React from 'react';
import PropTypes from 'prop-types';
import { FlatList, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';

// import Api from '../../../../api';

// const Images = Api.listImages();
const Images = [
  { id: '1', uri: require('../../../../assets/images/palmtree.jpg'), name: 'palmtree' },
  { id: '2', uri: require('../../../../assets/images/church.jpg'), name: 'church' },
  { id: '3', uri: require('../../../../assets/images/egg.jpg'), name: 'egg' },
  { id: '4', uri: require('../../../../assets/images/cookies.jpg'), name: 'cookies' },
  { id: '5', uri: require('../../../../assets/images/forest.jpg'), name: 'forest' },
];

const VIEW_PADDING = 10;
const IMAGE_PADDING = 2;
const SCREEN_WIDTH = Dimensions.get('window').width;
const COL_NUMBER = 2;
const ITEM_WIDTH = (SCREEN_WIDTH - VIEW_PADDING * 2 - 2 * COL_NUMBER * IMAGE_PADDING) / COL_NUMBER;

const GallerieItem = ({ item: { uri }, onPress }) => {
  return (
    <TouchableOpacity activeOpacity={0.5} onPress={() => onPress()} style={styles.imageWrapper}>
      <Image style={styles.image} source={uri} onPress={() => console.log('toto')} />
    </TouchableOpacity>
  );
};

GallerieItem.propTypes = {
  item: PropTypes.shape({
    uri: PropTypes.string.isRequired,
  }).isRequired,
  onPress: PropTypes.func.isRequired,
};

const Gallerie = ({ onPressItem }) => {
  return (
    <FlatList
      data={Images.concat(Images, Images, Images, Images, Images, Images)}
      renderItem={({ item }) => <GallerieItem item={item} onPress={() => onPressItem(item.id)} />}
      keyExtractor={(i, index) => index}
      numColumns={COL_NUMBER}
      style={styles.view}
    />
  );
};

Gallerie.propTypes = {
  onPressItem: PropTypes.func.isRequired,
};

const GalleryContainer = ({ navigation }) => {
  return (
    <Gallerie
      onPressItem={id => {
        navigation.navigate('ImagePreview', { id, tabBarHidden: true });
      }}
    />
  );
};

GalleryContainer.navigationOptions = {
  headerMode: 'none',
  title: 'username',
};

const styles = StyleSheet.create({
  view: {
    flex: 1,
    padding: VIEW_PADDING,
    // paddingTop: 60,
    paddingBottom: 60,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  image: {
    resizeMode: 'cover',

    height: ITEM_WIDTH,
    width: ITEM_WIDTH,
  },
  imageWrapper: {
    padding: IMAGE_PADDING,
  },
});

export default GalleryContainer;
