import React, {Component} from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { Camera, Permissions } from 'expo';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

class CameraView extends Component {
  state = {
    hasCameraPermission: null,
    cameraType: Camera.Constants.Type.back,
  };

  static navigationOptions = {
    tabBarVisible: false
  }

  camera = null

  async componentDidMount() {
    const {status} = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({hasCameraPermission: status === 'granted'});
  }

  switchCameraType = () => {
    this.setState(({ cameraType }) => ({
        cameraType: cameraType === Camera.Constants.Type.back
          ? Camera.Constants.Type.front
          : Camera.Constants.Type.back,
    }));
  }

  takePicture = async () => {
    if (this.camera) {
      let photo = await this.camera.takePictureAsync();
      console.log({photo})
    }
  };

  goBack = () => {
    this.props.navigation.goBack();
  }

  render() {
    const { hasCameraPermission, cameraType } = this.state;
    if ( hasCameraPermission === null) {
      return <View/>
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>
    } else {
      return <View style={styles.cameraWrapper}>
        <Camera style={styles.camera} type={cameraType} ref={ref => { this.camera = ref; }}>
        <TouchableOpacity
            style={styles.backIconContainer}
            onPress={this.goBack}>
              <Ionicons name="ios-close" size={48} color="white" style={styles.icon}/>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.flipIconContainer}
            onPress={this.switchCameraType}>
              <Ionicons name="ios-reverse-camera" size={32} color="white" style={styles.icon}/>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.takePictureContainer}
            onPress={this.takePicture}>
              <MaterialCommunityIcons name="circle-slice-8" size={64} color="white" style={styles.icon}/>
            </TouchableOpacity>
        </Camera>
      </View>
    }
  }
}

const styles = StyleSheet.create({
  cameraWrapper: {
    flex: 1
  },
  camera: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  flipIconContainer: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    //alignSelf: 'flex-end',
    //alignItems: 'flex-start',
  },
  backIconContainer: {
    position: 'absolute',
    right: 20,
    top: 30,
  },
  icon: {
    margin: 20,
  }
})

export default CameraView;
