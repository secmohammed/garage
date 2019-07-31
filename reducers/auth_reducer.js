import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILED,
  LOGIN_USER_PENDING
} from "../actions/types";

const INITIAL_STATE = {
  email: "",
  password: "",
  accessToken: null,
  error: "",
  loading: false
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case EMAIL_CHANGED:
      return { ...state, email: action.payload, loading: false };
    case PASSWORD_CHANGED:
      return { ...state, password: action.payload };
    case LOGIN_USER_SUCCESS:
      return {
        ...state,
        error: "",
        loading: false,
        accessToken: action.payload
      };
    case LOGIN_USER_FAILED:
      return {
        ...state,
        error: "Authentication Failed.",
        password: "",
        loading: false
      };
    case LOGIN_USER_PENDING:
      return { ...state, loading: true, error: "" };
    default:
      return state;
  }
}
