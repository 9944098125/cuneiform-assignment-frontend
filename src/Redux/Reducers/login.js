import {
  LOGIN_START,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT,
} from "../Actions/Types";

const initialState = {
  loading: false,
  user: null,
  isActivated: false,
  failMessage: "",
};

export default function login(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case LOGIN_START:
      return {
        ...state,
        loading: true,
      };
    case LOGIN_SUCCESS:
      localStorage.setItem("user", JSON.stringify(payload));
      localStorage.setItem("is_activated", true);
      localStorage.setItem("user_id", JSON.stringify(payload._id));
      return {
        ...state,
        loading: false,
        user: payload,
        isActivated: true,
      };
    case LOGIN_FAIL:
      return {
        ...state,
        loading: false,
        failMessage: payload,
      };
    case LOGOUT:
      localStorage.removeItem("user");
      localStorage.removeItem("user_id");
      localStorage.removeItem("is_activated");
      return {
        ...state,
        loading: false,
        user: null,
        isActivated: false,
      };
    default:
      return state;
  }
}
