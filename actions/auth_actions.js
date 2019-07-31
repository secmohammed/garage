import axios from 'axios';
import { Actions } from 'react-native-router-flux';
import { AsyncStorage } from 'react-native';

import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_USER_FAILED,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_PENDING,
  NO_LOGGED_IN_USER
} from './types';

export const emailChanged = (text) => {
  return {
    type: EMAIL_CHANGED,
    payload: text
  }
}

export const passwordChanged = (text) => {
  return {
    type: PASSWORD_CHANGED,
    payload: text
  }
}

export const loginUser = ({ email, password }) => {
  return (dispatch) => {
    dispatch({ type: LOGIN_USER_PENDING })
    axios
      .post('https://nouni.herokuapp.com/api/users/login', ({ email, password }))
      .then(res => loginUserSuccess(dispatch, res.data))
      .catch(err => loginUserFail(dispatch))
  }
}

const loginUserFail = (dispatch) => {
  dispatch({ type: LOGIN_USER_FAILED })
}
const loginUserSuccess = (dispatch, accessToken) => {
  dispatch({ type: LOGIN_USER_SUCCESS, payload: accessToken })
  Actions.map()
}