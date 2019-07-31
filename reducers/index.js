import { combineReducers } from "redux";
import auth from "./auth_reducer";
import map from "./map_reducers";
import service from "./service_reducer";
export default combineReducers({
    auth,
    map,
    service
});
