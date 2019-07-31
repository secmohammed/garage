import React from "react";
import {
  View,
  Keyboard,
  Picker,
  StyleSheet,
  KeyboardAvoidingView
} from "react-native";
import { connect } from "react-redux";
import { serviceChanged, descriptionChanged } from "../actions";
import { Button, Input } from "react-native-ui-kitten";
import { Actions } from "react-native-router-flux";
import { Spinner } from "../components/common/spinner";

class ServiceScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  onServiceChange(text) {
    this.props.serviceChanged(text);
  }
  onDescriptionChange(text) {
    this.props.descriptionChanged(text);
  }

  renderButtonOrSpinner = () => {
    if (this.props.loading) {
      return <Spinner size="large" />;
    }
    return (
      <Button
        onPress={() =>
          Actions.map({
            description: this.props.description,
            selectedService: this.props.selectedService.selectedService
          })
        }
      >
        Proceed to map.
      </Button>
    );
  };

  render = () => (
    <KeyboardAvoidingView
      behavior="padding"
      enabled={true}
      style={styles.screen}
    >
      <View
        style={{
          flex: 1,
          paddingTop: 200,
          flexDirection: "column",
          justifyContent: "center"
        }}
      >
        <Picker
          selectedValue={this.props.selectedService}
          style={{ height: 50, flex: 2 }}
          onValueChange={(itemValue, itemIndex) =>
            this.onServiceChange({ selectedService: itemValue })
          }
        >
          {this.props.services.map(service => {
            return (
              <Picker.Item
                key={service.id}
                label={service.name}
                value={service.name}
              />
            );
          })}
        </Picker>
        <Input
          style={{ flex: 3 }}
          size="large"
          label="Your Issue."
          placeholder="Describe your issue."
          onChangeText={this.onDescriptionChange.bind(this)}
          value={this.props.description}
        />
        {this.renderButtonOrSpinner()}
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center"
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

function mapStateToProps({ service }) {
  return {
    services: service.services,
    loading: service.loading,
    description: service.description,
    selectedService: service.selectedService
  };
}

export default connect(
  mapStateToProps,
  { serviceChanged, descriptionChanged }
)(ServiceScreen);
