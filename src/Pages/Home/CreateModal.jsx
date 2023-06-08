import React from "react";
import Modal from "react-bootstrap/Modal";
import { Box, Button } from "@mui/material";
import { Formik, Form, Field } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { create, getBlogs, updateBlog } from "../../Redux/Actions/blogs";
import AlertModal from "../../Components/AlertModal";

function CreateModal({
  showCreateModal,
  showEditor,
  setShowEditor,
  setShowCreateModal,
}) {
  const dispatch = useDispatch();

  // taking the blogId from the show editor so that particular blog id comes on which we click
  const blogId = showEditor && showEditor.dataWithId._id;

  // taking image and initial values for creating and updating the blog
  const [blogImage, setBlogImage] = React.useState(
    showEditor ? showEditor.dataWithId.image : ""
  );

  const [initialValues] = React.useState({
    title: showEditor ? showEditor.dataWithId.title : "",
    description: showEditor ? showEditor.dataWithId.description : "",
  });

  // image change function
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
      // if image is a valid one we declare with
      // FormData and append the file, cloud name,
      // preset and then apply post method to cloudinary
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
          setBlogImage(data.url);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      return;
    }
  };

  const validate = (values) => {
    let errors = {};
    if (!values.title) {
      errors.title = "Title is required";
    }
    if (!values.description) {
      errors.description = "Description is required";
    }
    return errors;
  };

  const AlertState = useSelector((state) => state.alert);
  const closeModal = () => {
    // if showEditor exists then set showEditor or else set create modal
    showEditor && setShowEditor({ bool: false });
    showCreateModal && setShowCreateModal(false);
    window.location.reload();
  };

  const callCreateApi = (values) => {
    const userId = JSON.parse(localStorage.getItem("user_id"));

    if (!showEditor) {
      // if it is on creating a blog then execute this
      const body = {
        image: blogImage,
        title: values.title,
        description: values.description,
      };
      // console.log("body.image", body.image);
      // console.log("values.blogImage", values.blogImage);
      dispatch(create(body, userId));
    } else {
      // if it is editing of a blog then execute this
      const body = {
        image: blogImage,
        title: values.title,
        description: values.description,
      };
      // console.log(body);
      dispatch(updateBlog(body, userId, blogId));
    }
    // after this process wait for 3 seconds and close the modal
    setTimeout(() => {
      closeModal();
    }, 3000);
  };

  return (
    <React.Fragment>
      <Modal
        show={showCreateModal || showEditor.bool}
        onHide={closeModal}
        backdrop="static"
        centered
        size="xl"
      >
        {AlertState.message && <AlertModal show={true} />}
        <Box sx={{}}>
          <Modal.Header>
            <Modal.Title>
              {showEditor ? "Edit the Blog" : "Create A Blog"}
            </Modal.Title>
            <Button onClick={closeModal}>X</Button>
          </Modal.Header>
          <Formik
            initialValues={initialValues}
            validate={(values) => validate(values)}
            onSubmit={(values) => callCreateApi(values)}
          >
            {({ touched, errors }) => (
              <Form>
                <Box sx={{ display: "flex", p: 3 }}>
                  <Box style={{ height: "100%", width: "50%" }}>
                    <label htmlFor="blogImage">
                      <img
                        src={
                          blogImage
                            ? blogImage
                            : "https://icon-library.com/images/placeholder-image-icon/placeholder-image-icon-0.jpg"
                        }
                        alt=""
                        style={{
                          height: "100%",
                          width: "100%",
                          borderRadius: "12px",
                        }}
                      />
                      <input
                        type="file"
                        name="blogImage"
                        id="blogImage"
                        style={{ display: "none" }}
                        onChange={(e) => onImageChange(e.target.files[0])}
                      />
                    </label>
                  </Box>
                  <Box sx={{ width: "50%", height: "100%", p: 2 }}>
                    <Box sx={{ width: "100%", mb: 2 }}>
                      <Field
                        name="title"
                        type="text"
                        placeholder="Enter the title"
                        className={
                          touched.title && errors.title
                            ? "primary-input-field form-control is-invalid"
                            : "form-control primary-input-field"
                        }
                      />
                      {touched.title && errors.title && (
                        <div className="invalid-feedback">{errors.title}</div>
                      )}
                    </Box>

                    <Box sx={{ width: "100%", mb: 2 }}>
                      <Field
                        as="textarea"
                        rows="6"
                        name="description"
                        type="text"
                        placeholder="Enter the description"
                        className={
                          touched.description && errors.description
                            ? "primary-input-field form-control is-invalid"
                            : "form-control primary-input-field"
                        }
                      />
                      {touched.description && errors.description && (
                        <div className="invalid-feedback">
                          {errors.description}
                        </div>
                      )}
                    </Box>
                    <Modal.Footer>
                      <Button
                        type="submit"
                        sx={{
                          width: "100%",
                          backgroundColor: "primary.dark",
                          color: "white",
                          mb: 2,
                        }}
                      >
                        {showEditor ? "Edit Blog" : "Create Blog"}
                      </Button>
                      <Button
                        onClick={closeModal}
                        sx={{
                          backgroundColor: "secondary.dark",
                          color: "white",
                          width: "100%",
                        }}
                      >
                        Close
                      </Button>
                    </Modal.Footer>
                  </Box>
                </Box>
              </Form>
            )}
          </Formik>
        </Box>
      </Modal>
    </React.Fragment>
  );
}

export default CreateModal;
