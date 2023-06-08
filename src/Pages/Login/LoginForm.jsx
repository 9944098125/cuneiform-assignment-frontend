import React from "react";
import { Formik, Form, Field } from "formik";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function LoginForm(props) {
  const { callLoginApi, validate } = props;
  const initialValues = {
    email: "",
    password: "",
  };
  const LoginDetails = useSelector((state) => state.login);

  const [showPassword, setShowPassword] = React.useState(false);

  function toggleShowPassword() {
    setShowPassword(!showPassword);
  }

  return (
    <React.Fragment>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography
          sx={{ fontSize: "23px", fontWeight: "700", color: "secondary.main" }}
        >
          Login
        </Typography>
        <Typography
          sx={{
            fontSize: "13px",
            fontWeight: "700",
          }}
        >
          Do Not have an account, Please <Link to="/register">Register</Link>
        </Typography>
      </Box>
      <Formik
        initialValues={initialValues}
        validate={(values) => validate(values)}
        onSubmit={(values) => callLoginApi(values)}
      >
        {({ touched, errors }) => (
          <Form>
            <Box
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
                gap: "5px",
              }}
            >
              <Box className="form-group mb-4">
                <Field
                  type="text"
                  name="email"
                  placeholder="Enter your Email"
                  className={
                    errors.email && touched.email
                      ? "form-control login-input-field is-invalid"
                      : "form-control login-input-field"
                  }
                />
                {touched.email && errors.email ? (
                  <div className="invalid-feedback">{errors.email}</div>
                ) : null}
              </Box>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
                className="form-group mb-4"
              >
                <Box sx={{ width: "100%" }}>
                  <Field
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Enter your Password"
                    className={
                      errors.password && touched.password
                        ? "form-control login-input-field is-invalid"
                        : "form-control login-input-field"
                    }
                  />
                  {touched.password && errors.password ? (
                    <div className="invalid-feedback">{errors.password}</div>
                  ) : null}
                </Box>
                {showPassword ? (
                  <MdVisibilityOff
                    onClick={toggleShowPassword}
                    style={{ cursor: "pointer", marginLeft: "-20px" }}
                  />
                ) : (
                  <MdVisibility
                    onClick={toggleShowPassword}
                    style={{ cursor: "pointer", marginLeft: "-20px" }}
                  />
                )}
              </Box>
              <Button
                sx={{
                  backgroundColor: "secondary.main",
                  width: "100%",
                  height: "45px",
                  color: "white",
                }}
                type="submit"
              >
                Login{" "}
                {LoginDetails.loading && (
                  <CircularProgress sx={{ fontSize: "20px" }} />
                )}
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </React.Fragment>
  );
}

export default LoginForm;
