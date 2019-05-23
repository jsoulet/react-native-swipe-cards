import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';
import { Input as BaseInput } from 'react-native-elements';
import variables from '$components/variables';

const InputIcon = ({ set, ...rest }) => {
  const IconSet = set;
  return <IconSet {...rest} />;
};

InputIcon.propTypes = { set: PropTypes.func.isRequired };

class Input extends Component {
  state = {
    isFocused: false,
  };

  onBlur = event => {
    this.setState({
      isFocused: false,
    });

    if (this.props.onBlur) {
      this.props.onBlur(event);
    }
  };

  onFocus = event => {
    this.setState({
      isFocused: true,
    });

    if (this.props.onFocus) {
      this.props.onFocus(event);
    }
  };

  getInputColor = () => {
    if (this.state.isFocused) {
      return variables.colors.primary;
    }

    return variables.colors.gray3;
  };

  render() {
    const {
      leftIcon,
      onFocus,
      onBlur,
      inputContainerStyle,
      leftIconContainerStyle,
      ...rest
    } = this.props;

    return (
      <BaseInput
        inputContainerStyle={StyleSheet.flatten([
          inputContainerStyle,
          this.state.isFocused ? styles.inputContainerFocused : styles.inputContainer,
        ])}
        leftIcon={leftIcon ? InputIcon({ color: this.getInputColor(), ...leftIcon }) : null}
        onBlur={this.onBlur}
        onFocus={this.onFocus}
        leftIconContainerStyle={StyleSheet.flatten([
          styles.leftIconContainer,
          leftIconContainerStyle,
        ])}
        {...rest}
      />
    );
  }
}
Input.propTypes = {
  ...BaseInput.propTypes,
  leftIcon: PropTypes.shape({
    set: PropTypes.func.isRequired,
  }),
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
};

const styles = StyleSheet.create({
  inputContainerFocused: {
    borderBottomColor: variables.colors.primary,
  },
  inputContainer: {
    borderBottomColor: variables.colors.gray3,
  },
  leftIconContainer: {
    marginRight: 10,
  },
});

export default Input;
