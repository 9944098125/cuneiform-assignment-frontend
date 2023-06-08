import {
  REGISTRATION_FAIL,
  REGISTRATION_SUCCESS,
  REGISTRATION_START,
} from "../Actions/Types";

const initialState = {
  user: {},
  loading: false,
  failMessage: "",
};

export default function register(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case REGISTRATION_START:
      return {
        ...state,
        loading: true,
      };
    case REGISTRATION_SUCCESS:
      return {
        ...state,
        loading: false,
        user: payload,
      };
    case REGISTRATION_FAIL:
      return {
        ...state,
        loading: false,
        failMessage: payload,
      };
    default:
      return state;
  }
}
