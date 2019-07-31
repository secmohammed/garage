import React, { Component } from "react";
import {
  View,
  ActivityIndicator,
  Picker,
  Text,
  StyleSheet,
  Dimensions,
  Image
} from "react-native";
import MapView from "react-native-maps";
import { connect } from "react-redux";
import { Actions } from "react-native-router-flux";
import { Button, Icon } from "react-native-elements";
import { Spinner } from "../components/common/spinner";
import { Constants, Location, Permissions } from "expo";
import logo from "../assets/tow-truck.png";

import {
  getNearbyUsers,
  addNewEmergency,
  getEmergencyCategories,
  activeEmergencyExpires
} from "../actions";
import moment from "moment";
const GOOGLE_MAPS_APIKEY = "AIzaSyAqQZukuqiPG12VkNYG0JWLf6jXa8bqPfU";
const { width, height } = Dimensions.get("window");
const ASPECT_RATIO = width / height;
class MapScreen extends Component {
  static navigationOptions = {
    title: "Map",
    tabBar: {
      icon: ({ tintColor }) => {
        return <Icon name="my-location" size={30} color={tintColor} />;
      }
    }
  };
  map = null;

  state = {
    mapLoaded: false,
    region: {
      latitude: 26.629752999999965,
      longitude: 30.761726000000067,
      latitudeDelta: 0,
      longitudeDelta: 0
    },
    nearbyMarkers: [],
    addingEmergency: false
  };
  componentWillMount() {
    this.props.getNearbyUsers();
    //   this.props.getEmergencyCategories();

    this.getCurrentPosition();
  }
  setRegion = region => {
    this.setState({ region });
    setTimeout(() => this.map.animateToRegion(region), 10);
  };
  getCurrentPosition = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "denied") {
      try {
        navigator.geolocation.getCurrentPosition(
          position => {
            const region = {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              latitudeDelta: 0,
              longitudeDelta: 0
            };
            this.setRegion(region);
          },
          error => {
            //TODO: better design
            switch (error.code) {
              case 1:
                alert(error);
            }
          },
          {
            enableHighAccuracy: true
          }
        );
      } catch (e) {
        alert(e.message || "");
      }
    }
  };

  onRegionChangeComplete = region => {
    this.setState({ region });
  };
  onRequestHelpButtonPress = () => {
    const lat = this.state.region.latitude;
    const lng = this.state.region.longitude;
    const categoryId = this.state.selectedCategory;

    this.props.addNewEmergency({ lat, lng, categoryId });
  };
  onMapPress = e => {
    // axios.
    this.setState({
      region: {
        ...e.nativeEvent.coordinate,
        latitudeDelta: 0,
        longitudeDelta: 0
      }
    });
  };
  renderRequestOrTimeout = () => {
    if (this.props.map.loading) {
      return (
        <View style={styles.buttonContainer}>
          <Spinner size="large" />
        </View>
      );
    } else if (this.props.map.activeEmergency) {
      const calculateDuration = () => {
        const now = moment(new Date());
        const expiresAt = moment(
          new Date(this.props.map.activeEmergency.expiresAt)
        );
        const duration = Math.floor(
          moment.duration(expiresAt.diff(now)).asSeconds()
        );
        if (duration <= 0) {
          stopInterval();
          this.props.activeEmergencyExpires();
        } else {
          this.setState({ timeLeft: duration });
        }
      };
      const interval = setInterval(calculateDuration, 1000);
      const stopInterval = () => {
        clearInterval(interval);
      };
      return (
        <View style={styles.buttonContainer}>
          <Text>
            Contacting nearby drivers, {this.state.timeLeft} Seconds remaining
            until timeout
          </Text>
        </View>
      );
    } else if (!this.props.map.loading && !this.props.map.activeEmergency) {
      return (
        <View style={styles.buttonContainer}>
          <Picker
            selectedValue={this.state.selectedCategory}
            style={{ height: 50, flex: 1 }}
            onValueChange={(itemValue, itemIndex) =>
              this.setState({ selectedCategory: itemValue })
            }
          >
            {this.props.map.categories.map(category => {
              return (
                <Picker.Item
                  key={category.id}
                  label={category.name}
                  value={category.id}
                />
              );
            })}
          </Picker>
          <Button
            large
            title="Request Help"
            icon={{ name: "search" }}
            onPress={this.onRequestHelpButtonPress}
          />
        </View>
      );
    }
  };
  render() {
    //   if (!this.state.mapLoaded) {
    //     return (
    //       <View style={{ flex: 1, justifyContent: "center" }}>
    //         <ActivityIndicator size="large" />
    //       </View>
    //     );
    //   }

    return (
      <View style={styles.container}>
        <MapView
          minZoomLevel={5}
          zoomEnabled={true}
          ref={map => {
            this.map = map;
          }}
          onPress={this.onMapPress}
          showsTraffic
          followsUserLocation={true}
          showsUserLocation={true}
          showsMyLocationButton={true}
          style={styles.map}
          onRegionChange={this.onRegionChangeComplete}
          initialRegion={this.state.region}
        >
          <MapView.Marker.Animated coordinate={this.state.region} draggable />
          {this.props.map.nearbyUsers.map((user, index) => {
            return (
              <MapView.Marker
                key={index}
                coordinate={{
                  latitude: user.latitude,
                  longitude: user.longitude
                }}
              />
            );
          })}
        </MapView>
        <View style={{ flex: 1, justifyContent: "flex-end", width: "100%" }}>
          <View style={{ height: "30%", backgroundColor: "#FFF" }}>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                height: "30%"
              }}
            >
              <Image style={{ width: 50, height: 50 }} source={logo} />
            </View>
            <View
              style={{
                height: "15%",
                flexDirection: "row",
                justifyContent: "space-between"
              }}
            >
              <View>
                <Text
                  style={{ fontWeight: "bold", fontSize: 20, marginLeft: 10 }}
                >
                  Service: {this.props.selectedService}
                </Text>
              </View>
              <View style={{ left: 0, marginRight: 10 }}>
                <Text style={{ fontWeight: "bold", fontSize: 20 }}>Price</Text>
                <Text>150-180 L.E</Text>
              </View>
            </View>
            <View
              style={{
                justifyContent: "center",
                height: "25%",
                borderBottomColor: "#CCC",
                borderBottomWidth: 1
              }}
            >
              <Text style={{ fontSize: 10 }}>{this.props.description}</Text>
            </View>

            <View
              style={{
                height: "30%",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 25,
                  color: "#FFF",
                  backgroundColor: "#000",
                  width: "80%",
                  textAlign: "center",
                  padding: 10
                }}
                onPress={() => Actions.driver()}
              >
                Confirm
              </Text>
            </View>
          </View>
        </View>
        {/*{this.renderRequestOrTimeout()}*/}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "flex-end",
    alignItems: "center"
  },
  map: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  }
});
function mapStateToProps({ auth, map }) {
  return {
    map: {
      nearbyUsers: map.nearbyUsers,
      categories: map.categories,
      activeEmergency: map.activeEmergency,
      loading: map.loading
    }
  };
}

export default connect(
  mapStateToProps,
  {
    getNearbyUsers,
    addNewEmergency,
    getEmergencyCategories,
    activeEmergencyExpires
  }
)(MapScreen);
