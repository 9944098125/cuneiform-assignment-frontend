import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Box, Button, Modal, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CreateModal from "./CreateModal";
import { getBlogs, deleteBlog, create } from "../../Redux/Actions/blogs";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteIcon from "@mui/icons-material/Delete";
import AlertModal from "../../Components/AlertModal";

export default function Home() {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("user"));

  const [showCreateModal, setShowCreateModal] = React.useState(false);

  const openShowCreateModal = () => {
    setShowCreateModal(true);
  };

  const oldData = {
    image: "",
    title: "",
    description: "",
  };

  const [showEditor, setShowEditor] = React.useState({
    id: "",
    bool: false,
    dataWithId: { ...oldData },
  });

  const updateBlog = (blog) => {
    setShowEditor({
      id: blog._id,
      bool: !showEditor.bool,
      dataWithId: { ...blog },
    });
    // console.log("editing blog: ", showEditor.dataWithId, blog);
  };
  const Blogs = useSelector((state) => state.blogs);
  // console.log(Blogs.fetchedBlogs);

  const userId = JSON.parse(localStorage.getItem("user_id"));

  const deleteB = (blogId) => {
    dispatch(deleteBlog(blogId, userId));
    window.location.reload();
  };

  React.useEffect(() => {
    dispatch(getBlogs());
  }, [dispatch, showEditor, showCreateModal, userId]);

  const AlertState = useSelector((state) => state.alert);

  return (
    <React.Fragment>
      <Box
        onClick={openShowCreateModal}
        sx={{
          position: "absolute",
          top: "80px",
          right: "15px",
          borderRadius: "50%",
          height: "70px",
          width: "70px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "white",
          backgroundColor: "primary.dark",
          cursor: "pointer",
          "&:hover": {
            backgroundColor: "primary.main",
          },
        }}
      >
        <AddIcon sx={{ fontSize: "30px" }} />
        {showCreateModal && (
          <CreateModal
            showCreateModal={showCreateModal}
            setShowCreateModal={setShowCreateModal}
          />
        )}
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexWrap: "wrap",
          p: 3,
          mt: 7,
        }}
      >
        {Blogs.fetchedBlogs &&
          Blogs.fetchedBlogs.map((blog, idx) => (
            <Box
              key={idx}
              sx={{
                minHeight: "300px",
                width: "270px",
                borderRadius: "12px",
                boxShadow: 25,
                border: "2px solid maroon",
                backgroundColor: "black",
                color: "white",
                p: 1,
                m: 2,
              }}
            >
              <Box sx={{ height: "70%", width: "100%" }}>
                <img
                  src={blog.image}
                  alt=""
                  style={{ height: "100%", width: "100%" }}
                />
              </Box>
              <Typography sx={{ fontSize: "19px", fontWeight: "800" }}>
                {blog.title}
              </Typography>
              <Typography sx={{ fontSize: "14px" }}>
                {blog.description}
              </Typography>
              <EditNoteIcon
                sx={{ fontSize: "25px", cursor: "pointer" }}
                onClick={() => updateBlog(blog)}
              />
              {showEditor.bool && showEditor.id === blog._id && (
                <>
                  {AlertState.message && <AlertModal show={true} />}
                  <CreateModal
                    showEditor={showEditor}
                    setShowEditor={setShowEditor}
                  />
                </>
              )}
              <DeleteIcon
                sx={{ fontSize: "25px", cursor: "pointer" }}
                onClick={() => deleteB(blog._id)}
              />
              <Typography
                sx={{ fontSize: "12px", fontWeight: "700", color: "grey" }}
              >
                {blog.createdAt}
              </Typography>
            </Box>
          ))}
      </Box>
    </React.Fragment>
  );
}
