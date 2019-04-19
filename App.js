import React from 'react';
import { StyleSheet, Text, View, Dimensions, Image, Animated, PanResponder } from 'react-native';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;
const HEADER_HEIGHT = 60;
const FOOTER_HEIGHT = 60;

const Images = [
  { id: '1', uri: require('./assets/images/palmtree.jpg'), name:'palmtree' },
  { id: '3', uri: require('./assets/images/egg.jpg'), name:'egg' },
  { id: '4', uri: require('./assets/images/cookies.jpg'), name:'cookies' },
  { id: '5', uri: require('./assets/images/forest.jpg'), name:'forest' },
  { id: '2', uri: require('./assets/images/church.jpg'), name:'church' },
];

export default class App extends React.Component {

  constructor() {
    super();

    this.position = new Animated.ValueXY();
    this.rotation = this.position.x.interpolate({
      inputRange: [-SCREEN_WIDTH/2, 0, SCREEN_WIDTH/2],
      outputRange: ['-10deg', '0deg', '10deg'],
      extrapolate: 'clamp'
    });
    this.rotateAndTranslate = {
      transform: [{rotate: this.rotation},
      ...this.position.getTranslateTransform()]
    };
    this.likeOpacity = this.position.x.interpolate({
      inputRange: [-SCREEN_WIDTH/2, 0, SCREEN_WIDTH/2],
      outputRange: [0, 0, 1],
      extrapolate: 'clamp'
    });
    this.nopeOpacity = this.position.x.interpolate({
      inputRange: [-SCREEN_WIDTH/2, 0, SCREEN_WIDTH/2],
      outputRange: [1, 0, 0],
      extrapolate: 'clamp'
    });
    this.nextCardOpacity = this.position.x.interpolate({
      inputRange: [-SCREEN_WIDTH/2, 0, SCREEN_WIDTH/2],
      outputRange: [1, 0, 1],
      extrapolate: 'clamp'
    });
    this.nextCardScale = this.position.x.interpolate({
      inputRange: [-SCREEN_WIDTH/2, 0, SCREEN_WIDTH/2],
      outputRange: [1, 0.8, 1],
      extrapolate: 'clamp'
    });


    this.state = {
      currentIndex: 0,
    }
  }

  componentWillMount() {
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (event, gestureState) => true,
      onPanResponderMove: (event, gestureState) => {
        this.position.setValue({
          x: gestureState.dx,
          y: gestureState.dy,
        })
      },
      onPanResponderRelease: (event, gestureState) => {
        if(gestureState.dx > 120) {
          return Animated.spring(this.position, {
            toValue: {x: SCREEN_WIDTH + 100, y: gestureState.dy}
          }).start(() => {
            this.setState(
              ({currentIndex}) => {
                return {currentIndex: currentIndex + 1}
              },
              () => {
                this.position.setValue({ x: 0, y: 0 })
              }
          )
        })}

        if(gestureState.dx < -120) {
          return Animated.spring(this.position, {
            toValue: {x: -SCREEN_WIDTH - 100, y: gestureState.dy}
          }).start(() => {
            this.setState(
              ({currentIndex}) => {
                return {currentIndex: currentIndex + 1}
              },
              () => {
                this.position.setValue({ x: 0, y: 0 })
              }
          )
        })}
        return Animated.spring(this.position, {
          toValue: {x: 0, y: 0},
          friction: 4
        }).start()
      }
    });
  }

  renderImages = (images) => {
    return images.map((item, index) => {
      if(index < this.state.currentIndex || index > this.state.currentIndex + 1) {
        return null
      }
      if( this.state.currentIndex === index ) {
        return (
          <Animated.View
            {...this.panResponder.panHandlers}
            style={[this.rotateAndTranslate, styles.animated]}
            key={item.id}>
            <Animated.View style={[styles.textContainer, styles.likeContainer, {opacity: this.likeOpacity}]}>
              <Text style={[styles.text, styles.like]}>LIKE</Text>
            </Animated.View>
            <Animated.View style={[styles.textContainer, styles.nopeContainer, {opacity: this.nopeOpacity}]}>
              <Text style={[styles.text, styles.nope]}>NOPE</Text>
            </Animated.View>
            <Image  style={[styles.image]} source={item.uri}/>
          </Animated.View>)
      } else {
        return (
          <Animated.View
            style={[styles.animated, {opacity: this.nextCardOpacity, transform: [{scale: this.nextCardScale}]}]}
            key={item.id}>
            <Image  style={[styles.image]} source={item.uri}/>
          </Animated.View>)}

    }).reverse()
  }
  render() {
    return (
      <View style={styles.wrapper}>
        <View style={styles.header}><Text></Text></View>
        <View style={styles.container}>

            {this.renderImages(Images)}

        </View>
        <View style={styles.footer}><Text></Text></View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  header: {
    height: HEADER_HEIGHT,
  },
  container: {
    flex: 1,
  },
  footer: {
    height: FOOTER_HEIGHT,
  },
  animated: {
    height: SCREEN_HEIGHT - (HEADER_HEIGHT + FOOTER_HEIGHT),
    width: SCREEN_WIDTH,
    padding: 10,
    position: 'absolute'
  },
  image: {
    flex: 1,
    height: null,
    width: null,
    resizeMode: 'cover',
    borderRadius: 20,
  },
  textContainer: {
    position: 'absolute',
    zIndex: 1,
    top: 50,

  },
  text: {
    borderWidth: 1,
    fontSize: 32,
    fontWeight: '800'
  },
  likeContainer: {
    transform: [{rotate: '-30deg'}],
    left: 40,
  },
  nopeContainer: {
    transform: [{rotate: '30deg'}],
    right: 40,
  },
  like: {
    color: 'green',
    borderColor: 'green'
  },
  nope: {
    color: 'red',
    borderColor: 'red'
  }
});
