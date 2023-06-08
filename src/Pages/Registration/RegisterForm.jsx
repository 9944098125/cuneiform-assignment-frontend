import React from "react";
import { Formik, Form, Field } from "formik";
import { Box, Button, Typography } from "@mui/material";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import ImagePreview from "./ImagePreview";
import { Link } from "react-router-dom";

function RegisterForm(props) {
  const { profilePicture, validate, submitRegisterApi, setProfilePicture } =
    props;
  const initialValues = {
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirm_password: "",
  };

  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const onImageChange = (image) => {
    if (image === undefined) {
      return;
    }
    if (
      image.type === "image/jpeg" ||
      "image/jpg" ||
      "image/png" ||
      "image/svg"
    ) {
      const data = new FormData();
      data.append("file", image);
      data.append("upload_preset", "projects");
      data.append("cloud_name", "dakda5ni3");
      fetch("https://api.cloudinary.com/v1_1/dakda5ni3/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setProfilePicture(data.url);
          console.log(profilePicture);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      return;
    }
  };
  return (
    <React.Fragment>
      <Formik
        initialValues={initialValues}
        validate={(values) => validate(values)}
        onSubmit={(values) => submitRegisterApi(values)}
      >
        {({ errors, touched }) => (
          <Form>
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "column", md: "row" },
                alignItems: "center",
                gap: "15px",
                height: "100%",
                width: "100%",
              }}
            >
              <ImagePreview
                profilePicture={profilePicture}
                onImageChange={onImageChange}
              />
              <Box
                sx={{ height: "100%", width: { xs: "100%", md: "50%" }, p: 3 }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Typography sx={{ fontSize: "21px", fontWeight: "700" }}>
                    Registration
                  </Typography>
                  <Typography sx={{ fontSize: "12px" }}>
                    Already Have an account ? Please{" "}
                    <Link to="/login">Login</Link>
                  </Typography>
                </Box>
                <Box className="form-group mb-4">
                  <Field
                    type="text"
                    name="first_name"
                    placeholder="Enter your first name"
                    className={
                      errors.first_name && touched.first_name
                        ? "form-control primary-input-field is-invalid"
                        : "form-control primary-input-field"
                    }
                  />
                  {touched.first_name && errors.first_name ? (
                    <div className="invalid-feedback">{errors.first_name}</div>
                  ) : null}
                </Box>

                <Box className="form-group mb-4">
                  <Field
                    type="text"
                    name="last_name"
                    placeholder="Enter your last name"
                    className={
                      errors.last_name && touched.last_name
                        ? "form-control primary-input-field is-invalid"
                        : "form-control primary-input-field"
                    }
                  />
                  {touched.last_name && errors.last_name ? (
                    <div className="invalid-feedback">{errors.last_name}</div>
                  ) : null}
                </Box>

                <Box className="form-group mb-4">
                  <Field
                    type="text"
                    name="email"
                    placeholder="Enter your Email"
                    className={
                      errors.email && touched.email
                        ? "form-control primary-input-field is-invalid"
                        : "form-control primary-input-field"
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
                          ? "form-control primary-input-field is-invalid"
                          : "form-control primary-input-field"
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

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}
                  className="form-group mb-4"
                >
                  <Box sx={{ width: "100%" }}>
                    <Field
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirm_password"
                      placeholder="Confirm your Password"
                      className={
                        errors.confirm_password && touched.confirm_password
                          ? "form-control primary-input-field is-invalid"
                          : "form-control primary-input-field"
                      }
                    />
                    {touched.confirm_password && errors.confirm_password ? (
                      <div className="invalid-feedback">
                        {errors.confirm_password}
                      </div>
                    ) : null}
                  </Box>
                  {showConfirmPassword ? (
                    <MdVisibilityOff
                      onClick={toggleShowConfirmPassword}
                      style={{ cursor: "pointer", marginLeft: "-20px" }}
                    />
                  ) : (
                    <MdVisibility
                      onClick={toggleShowConfirmPassword}
                      style={{ cursor: "pointer", marginLeft: "-20px" }}
                    />
                  )}
                </Box>
                <Button
                  type="submit"
                  sx={{
                    backgroundColor: "primary.main",
                    height: "45px",
                    width: "100%",
                    color: "white",
                  }}
                >
                  Register
                </Button>
              </Box>
            </Box>
          </Form>
        )}
      </Formik>
    </React.Fragment>
  );
}

export default RegisterForm;
