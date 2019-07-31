import React from "react";
import { View, Keyboard, Text, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { emailChanged, passwordChanged, loginUser } from "../actions";
import {
  RkButton,
  RkText,
  RkTextInput,
  RkAvoidKeyboard
} from "react-native-ui-kitten";
import { Actions } from "react-native-router-flux";
import { Spinner } from "../components/common/spinner";

class AuthScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  onEmailChange(text) {
    this.props.emailChanged(text);
  }
  onPasswordChange(text) {
    this.props.passwordChanged(text);
  }

  onLoginButtonPressed = () => {
    const { email, password } = this.props;
    this.props.loginUser({ email, password });
  };

  renderError = () => {
    if (this.props.error) {
      return (
        <View style={{ backgroundColor: "white" }}>
          <Text style={styles.errorTextStyle}>{this.props.error}</Text>
        </View>
      );
    }
  };

  renderButtonOrSpinner = () => {
    if (this.props.loading) {
      return <Spinner size="large" />;
    } else {
      return (
        <RkButton onPress={this.onLoginButtonPressed.bind(this)}>
          Login
        </RkButton>
      );
    }
  };

  render = () => (
    <RkAvoidKeyboard
      onStartShouldSetResponder={() => true}
      onResponderRelease={() => Keyboard.dismiss()}
      style={styles.screen}
    >
      <View style={{ flex: 1, paddingTop: 200, flexDirection: "column" }}>
        <RkTextInput
          rkType="rounded"
          placeholder="Email"
          onChangeText={this.onEmailChange.bind(this)}
          value={this.props.email}
        />
        <RkTextInput
          rkType="rounded"
          placeholder="Password"
          secureTextEntry
          onChangeText={this.onPasswordChange.bind(this)}
          value={this.props.password}
        />
        {this.renderButtonOrSpinner()}
      </View>
      {this.renderError()}
      <View style={styles.footer}>
        <View style={styles.textRow}>
          <RkText rkType="primary3">Don’t have an account?</RkText>
          <RkButton rkType="clear">
            <RkText rkType="header6" onPress={this.onSignUpButtonPressed}>
              Sign up now
            </RkText>
          </RkButton>
        </View>
      </View>
    </RkAvoidKeyboard>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#FFF"
  },
  image: {
    resizeMode: "cover"
  },
  container: {
    paddingHorizontal: 17,
    alignItems: "center"
  },
  footer: {
    justifyContent: "flex-end",
    flex: 1
  },
  buttons: {
    flexDirection: "row"
  },
  button: {
    marginHorizontal: 14
  },
  save: {
    marginVertical: 9
  },
  textRow: {
    justifyContent: "center",
    flexDirection: "row"
  },
  errorTextStyle: {
    color: "red",
    alignSelf: "center"
  }
});

function mapStateToProps({ auth }) {
  return {
    email: auth.email,
    password: auth.password,
    error: auth.error,
    loading: auth.loading,
    accessToken: auth.accessToken
  };
}

export default connect(
  mapStateToProps,
  { emailChanged, passwordChanged, loginUser }
)(AuthScreen);
