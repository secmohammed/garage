import { SERVICE_CHANGED, DESCRIPTION_CHANGED } from "../actions/types";

const INITIAL_STATE = {
  services: [
    {
      id: 1,
      name: "Electrical"
    },
    {
      id: 2,
      name: "Mechnical"
    },
    {
      id: 3,
      name: "Wheels"
    },
    {
      id: 4,
      name: "Other Issue."
    }
  ],
  selectedService: "electrical",
  description: null,
  loading: false
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case DESCRIPTION_CHANGED:
      return {
        ...state,
        description: action.payload,
        loading: false
      };
    case SERVICE_CHANGED:
      return { ...state, selectedService: action.payload, loading: false };
    default:
      return state;
  }
}
