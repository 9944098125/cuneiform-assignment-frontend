import api from "../Api/Api";
import { LOGIN_FAIL, LOGIN_START, LOGIN_SUCCESS, LOGOUT } from "./Types";
import { alertActions } from "./alertActions";

export const login = (data) => async (dispatch) => {
  dispatch({
    type: LOGIN_START,
  });
  try {
    const loginResponse = await api.post("/auth/login", data);
    if (loginResponse) {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: loginResponse.data.user,
      });
      // console.log(loginResponse.data);
    }
  } catch (err) {
    console.log("Login err in the frontend: ", err);
    dispatch({
      type: LOGIN_FAIL,
      payload: err.response.data.message,
    });
    dispatch(alertActions.error(err.response.data.message));
    setTimeout(() => {
      dispatch(alertActions.error_clear());
      dispatch(alertActions.clear());
    }, 3000);
  }
};

export const logout = () => (dispatch) => dispatch({ type: LOGOUT });
