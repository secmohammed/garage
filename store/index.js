import { createStore, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import { AsyncStorage } from "react-native";
import reducers from "../reducers";
// import devToolsEnhancer from "remote-redux-devtools";

const config = {
    key: "primary",
    storage: AsyncStorage
};
const reducer = persistReducer(config, reducers);

const store = createStore(reducer, undefined, compose(applyMiddleware(thunk)));

persistStore(store, null);

export default store;
