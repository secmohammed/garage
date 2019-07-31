import {
  NO_NEARBY_USERS,
  ERROR_NEARBY_USERS,
  FINDING_NEARBY_USERS,
  FOUND_NEARBY_USERS,
  GOT_EMERGENCY_CATEGORIES,
  EMERGENCY_ADDED,
  ADDING_EMERGENCY,
  EMERGENCY_EXPIRED
} from "../actions/types";

const INITIAL_STATE = {
  nearbyUsers: [],
  categories: [],
  activeEmergency: null,
  loading: false
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FOUND_NEARBY_USERS:
      return { ...state, nearbyUsers: action.payload };
    case NO_NEARBY_USERS:
      return { ...state, nearbyUsers: [] };
    case GOT_EMERGENCY_CATEGORIES:
      return { ...state, categories: action.payload };
    case EMERGENCY_ADDED:
      return { ...state, activeEmergency: action.payload, loading: false };
    case ADDING_EMERGENCY:
      return { ...state, activeEmergency: null, loading: true };
    case EMERGENCY_EXPIRED:
      return { ...state, activeEmergency: null };
    default:
      return state;
  }
}
