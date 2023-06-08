import React from "react";
import { Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { register } from "../../Redux/Actions/register";
import registerBg from "../../Assets/Images/register-bg.png";
import RegisterForm from "./RegisterForm";
import AlertModal from "../../Components/AlertModal";

export default function Registration() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [profilePicture, setProfilePicture] = React.useState("");

  const AlertState = useSelector((state) => state.alert);

  const validate = (values) => {
    let errors = {};
    if (!values.first_name) errors.first_name = "First Name is required";
    if (!values.last_name) errors.last_name = "Last Name is required";
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
    if (!values.confirm_password)
      errors.confirm_password = "Confirm your Password";
    else if (values.password !== values.confirm_password) {
      errors.confirm_password = "Please make sure that both passwords are same";
    }
    return errors;
  };

  const submitRegisterApi = (values) => {
    const body = {
      first_name: values.first_name,
      last_name: values.last_name,
      email: values.email,
      password: values.password,
      profilePicture: profilePicture,
    };
    dispatch(register(body));
  };

  React.useEffect(() => {
    if (AlertState.type === "success") {
      setTimeout(() => {
        navigate("/login", { replace: true });
      }, 3000);
    }
  }, [navigate, AlertState]);

  return (
    <React.Fragment>
      <Box
        sx={{
          backgroundImage: `url(${registerBg})`,
          backgroundSize: "cover",
          minHeight: "100vh",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* glass effect box */}
        <Box
          sx={{
            minHeight: "75%",
            width: "80vw",
            boxShadow: "0 0 1rem 0 rgb(0, 0, 0, 0.5)",
            borderRadius: "12px",
            backgroundColor: "rgba(225, 225, 225, 0.15",
            backdropFilter: "blur(5px)",
          }}
        >
          {AlertState.message && <AlertModal show={true} />}
          <RegisterForm
            profilePicture={profilePicture}
            validate={validate}
            submitRegisterApi={submitRegisterApi}
            setProfilePicture={setProfilePicture}
          />
        </Box>
      </Box>
    </React.Fragment>
  );
}
