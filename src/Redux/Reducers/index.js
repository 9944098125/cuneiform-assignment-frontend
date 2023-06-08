import { combineReducers } from "redux";

import { alert } from "./alertReducer";
import register from "./register";
import login from "./login";
import blogs from "./blogs";

export default combineReducers({
  alert,
  register,
  login,
  blogs,
});
