import React from "react";
import { Scene, Router } from "react-native-router-flux";
import Login from "./screens/AuthScreen";
import Map from "./screens/MapScreen";
import Service from "./screens/ServiceScreen";
import DriverToUserMap from "./screens/DriverToUserMapScreen";
const RouterComponent = () => {
  return (
    <Router>
      <Scene key="root">
        <Scene component={Login} key="auth" title="Login" hideNavBar={true} />
        <Scene
          component={Service}
          key="service"
          title="select a service"
          hideNavBar={true}
        />
        <Scene
          component={DriverToUserMap}
          key="driver"
          title="Map"
          hideNavBar={true}
        />
        <Scene
          component={Map}
          key="map"
          title="Map"
          hideNavBar={true}
          initial
        />
      </Scene>
    </Router>
  );
};
export default RouterComponent;
