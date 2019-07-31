import React from "react";
import { Provider } from "react-redux";
import store from "./store";
import Router from "./Router";
import AuthScreen from "./screens/AuthScreen";
import MapScreen from "./screens/MapScreen";
import { mapping, light as lightTheme } from "@eva-design/eva";
import { ApplicationProvider } from "react-native-ui-kitten";

export default class App extends React.Component {
    render() {
        return (
            <ApplicationProvider mapping={mapping} theme={lightTheme}>
                <Provider store={store}>
                    <Router />
                </Provider>
            </ApplicationProvider>
        );
    }
}
