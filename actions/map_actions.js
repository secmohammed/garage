import axios from "axios";
// import { pusher } from "../services/pusher";
import {
  FOUND_NEARBY_USERS,
  NO_NEARBY_USERS,
  GOT_EMERGENCY_CATEGORIES,
  EMERGENCY_ADDED,
  ADDING_EMERGENCY,
  EMERGENCY_EXPIRED
} from "./types";

export const addNewEmergency = ({ lat, lng, categoryId }) => {
  return (dispatch, getState) => {
    addingEmergency(dispatch);
    const { accessToken } = getState().auth;
    const data = {
      status: "pending",
      location: { lat, lng },
      userId: accessToken.userId,
      "posting-userId": accessToken.userId,
      "emergency-categoryId": categoryId
    };
    axios
      .post("http://nouni.herokuapp.com/api/emergencies", data, {
        headers: { Authorization: accessToken.id }
      })
      .then(res => emergencyAdded(dispatch, res.data))
      .catch(err => {
        console.log(err);
      });
  };
};

export const getEmergencyCategories = () => {
  return dispatch => {
    axios
      .get("http://nouni.herokuapp.com/api/emergency-categories")
      .then(res => gotEmergencyCategories(dispatch, res.data));
  };
};

export const getNearbyUsers = () => {
  return dispatch => {
    let users = [
      {
        latitude: 30.003912,
        longitude: 31.40125
      },
      {
        latitude: 30.00391,
        longitude: 31.40123
      },
      {
        latitude: 30.0039,
        longitude: 31.40121
      }
    ];
    foundNearbyUsers(dispatch, users);
    // axios
    //   .get("http://localhost:4000/nearby-drivers")
    //   .then(res => {
    //     pusher
    //       .subscribe(`protected-channel-${res.data}`)
    //       .bind("found-nearby-users", data => {
    //         foundNearbyUsers(dispatch, data.users);
    //       });
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });
  };
};

export const activeEmergencyExpires = () => {
  return {
    type: EMERGENCY_EXPIRED
  };
};

const foundNearbyUsers = (dispatch, nearbyUsers) => {
  dispatch({ type: FOUND_NEARBY_USERS, payload: nearbyUsers });
};
const gotEmergencyCategories = (dispatch, categories) => {
  dispatch({ type: GOT_EMERGENCY_CATEGORIES, payload: categories });
};
const emergencyAdded = (dispatch, emergency) => {
  dispatch({ type: EMERGENCY_ADDED, payload: emergency });
};
const addingEmergency = dispatch => {
  dispatch({ type: ADDING_EMERGENCY });
};
