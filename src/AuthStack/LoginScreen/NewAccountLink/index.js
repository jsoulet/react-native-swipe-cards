import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';

import variables from '$components/variables';

const NewAccountLink = ({ onPressButton }) => {
  return (
    <View>
      <Text style={styles.text}>Not a member yet ?</Text>
      <Button
        titleStyle={styles.button}
        onPress={onPressButton}
        title="Create a new account"
        type="clear"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    color: variables.colors.gray3,
    textAlign: 'center',
  },
  button: {
    color: variables.colors.secondary,
  },
});

NewAccountLink.propTypes = {
  onPressButton: PropTypes.func.isRequired,
};

export default NewAccountLink;
