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
import { Button, Icon } from "react-native-elements";
import { Spinner } from "../components/common/spinner";
import { Constants, Location, Permissions } from "expo";
import MapViewDirections from "react-native-maps-directions";
import logo from "../assets/tow-truck.png";

import {
  getNearbyUsers,
  addNewEmergency,
  getEmergencyCategories,
  activeEmergencyExpires
} from "../actions";
import moment from "moment";
const GOOGLE_MAPS_APIKEY = "AIzaSyB9-6jIkdA6mjeB9VGwsi1peGI16GWDG1s";
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
    duration: 0,
    distance: 0,
    mapLoaded: false,
    region: {
      latitude: 30.023902,
      longitude: 31.30145,
      latitudeDelta: 0,
      longitudeDelta: 0
    },
    nearbyMarkers: [
      {
        latitude: 30.033902,
        longitude: 31.31145
      }
    ]
  };
  componentWillMount() {
    //   this.props.getNearbyUsers();
    //   this.props.getEmergencyCategories();

    this.getCurrentPosition();
  }
  setRegion = region => {
    this.setState({ region });
    setTimeout(() => this.map.animateToRegion(region), 10);
  };
  getCurrentPosition = () => {
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
        }
      );
    } catch (e) {
      alert(e.message || "");
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
          minZoomLevel={10}
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
          <MapViewDirections
            origin={this.state.region}
            destination={
              this.state.nearbyMarkers[this.state.nearbyMarkers.length - 1]
            }
            apikey={GOOGLE_MAPS_APIKEY}
            strokeWidth={3}
            strokeColor="hotpink"
            optimizeWaypoints={true}
            onStart={params => {
              console.log(
                `Started routing between "${params.origin}" and "${params.destination}"`
              );
            }}
            onError={errorMessage => {
              console.log(errorMessage);
            }}
            onReady={result => {
              if (result && result.distance && result.duration) {
                this.state.distance = result.distance;
                this.state.duration = result.duration;
                this.map.fitToCoordinates(result.coordinates, {
                  edgePadding: {
                    right: width / 20,
                    bottom: height / 20,
                    left: width / 20,
                    top: height / 20
                  },
                  animated: true
                });
              }
            }}
          />
          <MapView.Marker.Animated coordinate={this.state.region} draggable />
          {this.state.nearbyMarkers.map((marker, index) => (
            <MapView.Marker coordinate={marker} title="Hello" key={index} />
          ))}
        </MapView>
        <View
          style={{
            flex: 1,
            justifyContent: "flex-end",
            width: "100%",
            backgroundColor: "#FFF",
            height: "30%"
          }}
        >
          <View
            style={{
              justifyContent: "center",
              height: "25%",
              borderBottomColor: "#CCC",
              borderBottomWidth: 1,
              alignItems: "center"
            }}
          >
            <Text
              style={{ fontSize: 10 }}
            >{`Your driver is ${this.state.distance}km away from you, driver will reach you out in ${this.state.duration}mins`}</Text>
          </View>
        </View>
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
