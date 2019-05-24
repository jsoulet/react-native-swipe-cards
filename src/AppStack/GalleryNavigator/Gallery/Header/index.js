import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import firebase from 'firebase';
import { withUser } from '$src/store/UserProvider';
import { Ionicons } from '@expo/vector-icons';
import variables from '$components/variables';

const UserPic = ({ uri }) => {
  return (
    <View style={picStyles.photoContainer}>
      <Ionicons size={70} name="md-person" color={variables.colors.white} />
    </View>
  );
};

const picStyles = StyleSheet.create({
  photoContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 90,
    width: 90,
    borderRadius: 45,
    backgroundColor: variables.colors.gray4,
    margin: 5,
  },
});

const Header = props => {
  if (!props.user.userInfo) {
    return <Text>Loading...</Text>;
  }
  return (
    <View>
      <View style={styles.header}>
        <UserPic />
        <Text style={styles.username}>{props.user.userInfo.username}</Text>
      </View>
      <View style={styles.logoutContainer}>
        <Button
          icon={<Ionicons name="md-power" size={20} color={variables.colors.gray2} />}
          title="Logout"
          type="clear"
          titleStyle={styles.logoutTitle}
          onPress={() => {
            firebase.auth().signOut();
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    display: 'flex',
    alignItems: 'center',
    paddingTop: 10,
  },
  username: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  logoutContainer: {
    position: 'absolute',
    right: 10,
    top: 10,
  },
  logoutTitle: {
    display: 'none',
  },
});

export default withUser(Header);
