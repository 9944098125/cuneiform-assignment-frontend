import {
  REGISTRATION_START,
  REGISTRATION_SUCCESS,
  REGISTRATION_FAIL,
} from "./Types";
import api from "../Api/Api";
import { alertActions } from "./alertActions";

export const register = (body) => async (dispatch) => {
  dispatch({
    type: REGISTRATION_START,
  });
  try {
    const res = await api.post("/auth/register", body);
    if (res) {
      dispatch({
        type: REGISTRATION_SUCCESS,
        payload: res.data && res.data.user,
      });
      console.log(res);
      dispatch(alertActions.success(res.data.message));
      setTimeout(() => {
        dispatch(alertActions.success_clear());
        dispatch(alertActions.clear());
      }, 3000);
    }
  } catch (err) {
    console.log("Registration error in frontend: ", err);
    dispatch({
      type: REGISTRATION_FAIL,
      payload: err.response.data.message,
    });
    dispatch(alertActions.error(err.response.data.message.toString()));
    setTimeout(() => {
      dispatch(alertActions.error_clear());
      dispatch(alertActions.clear());
    }, 3000);
  }
};
