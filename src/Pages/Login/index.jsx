import React from "react";
import { Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import LoginForm from "./LoginForm";
import { login } from "../../Redux/Actions/login";
import AlertModal from "../../Components/AlertModal";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const AlertState = useSelector((state) => state.alert);

  function validate(values) {
    let errors = {};
    if (!values.email) errors.email = "Email is required";
    else if (isNaN(values.email)) {
      if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
        //eslint-disable-line
        errors.email = "Email is invalid";
      }
    }
    if (!values.password) errors.password = "Password is required";
    // checking that if password is 8 characters long and
    // if container 1 number, 1 capitals, 1 special character
    else if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#%&])(?=.{8,})/.test(
        //eslint-disable-line
        values.password
      )
    ) {
      errors.password =
        "Password must contain 8 characters, at least one capital letter, one number and one special character";
    }
    return errors;
  }

  function callLoginApi(values) {
    dispatch(login(values));
  }

  const LoginDetails = useSelector((state) => state.login);

  React.useEffect(() => {
    if (LoginDetails.isActivated || localStorage.getItem("isActivated")) {
      navigate("/", { replace: true });
    }
  }, [navigate, LoginDetails.isActivated]);

  return (
    <React.Fragment>
      <Box
        sx={{
          display: "flex",
          gap: "50px",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          width: "100%",
          p: 3,
        }}
      >
        {AlertState.message && <AlertModal show={true} />}
        <div className="login-bg"></div>
        <Box
          sx={{
            minHeight: "45%",
            width: { xs: "80%", md: "35%" },
            boxShadow: "0 0 1rem 0 rgb(0, 0, 0, 0.5)",
            borderRadius: "12px",
            backgroundColor: "rgba(225, 225, 225, 0.15",
            backdropFilter: "blur(5px)",
            p: 3,
          }}
        >
          <LoginForm validate={validate} callLoginApi={callLoginApi} />
        </Box>
      </Box>
    </React.Fragment>
  );
}
