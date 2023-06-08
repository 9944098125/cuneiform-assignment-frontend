import {
  CREATE_BLOG_START,
  CREATE_BLOG_SUCCESS,
  CREATE_BLOG_FAIL,
  GET_BLOGS_SUCCESS,
  GET_BLOGS_FAIL,
  UPDATE_BLOG_START,
  UPDATE_BLOG_SUCCESS,
  UPDATE_BLOG_FAIL,
  DELETE_BLOG_SUCCESS,
  DELETE_BLOG_FAIL,
} from "./Types";
import api from "../Api/Api";
import { alertActions } from "./alertActions";

export const create = (data, userId) => async (dispatch) => {
  dispatch({
    type: CREATE_BLOG_START,
  });
  try {
    const res = await api.post(`/blogs/createBlog/${userId}`, data);
    if (res) {
      console.log(res);
      dispatch({
        type: CREATE_BLOG_SUCCESS,
        payload: res.data && res.data.blog,
      });
      dispatch(alertActions.success(res.data.message));
      setTimeout(() => {
        dispatch(alertActions.success_clear());
        dispatch(alertActions.clear());
      }, 3000);
    }
  } catch (err) {
    console.log("Create Blog error in frontend: ", err);
    dispatch({
      type: CREATE_BLOG_FAIL,
      payload: err.response.data.message,
    });
    dispatch(alertActions.error(err.response.data.message));
    setTimeout(() => {
      dispatch(alertActions.error_clear());
      dispatch(alertActions.clear());
    }, 3000);
  }
};

export const getBlogs = () => async (dispatch) => {
  try {
    const res = await api.get("/blogs/getBlogs");
    if (res) {
      // console.log(res);
      dispatch({
        type: GET_BLOGS_SUCCESS,
        payload: res.data && res.data.blogs,
      });
    }
  } catch (err) {
    console.log("Get Blogs error in frontend: ", err);
    dispatch({
      type: GET_BLOGS_FAIL,
      payload: err.response.data.message,
    });
    dispatch(alertActions.error(err.response.data.message));
    setTimeout(() => {
      dispatch(alertActions.error_clear());
      dispatch(alertActions.clear());
    }, 3000);
  }
};
export const updateBlog = (data, userId, blogId) => async (dispatch) => {
  dispatch({
    type: UPDATE_BLOG_START,
  });
  try {
    const res = await api.patch(`/blogs/editBlog/${blogId}/${userId}`, data);
    if (res) {
      console.log(res);
      dispatch({
        type: UPDATE_BLOG_SUCCESS,
        payload: res.data.blog.updatedBlog,
      });
      dispatch(alertActions.success(res.data.message));
      setTimeout(() => {
        dispatch(alertActions.success_clear());
        dispatch(alertActions.clear());
      }, 3000);
    }
  } catch (err) {
    console.log("update blog error in frontend", err);
    dispatch({
      type: UPDATE_BLOG_FAIL,
      payload: err.response.data.message,
    });
    dispatch(alertActions.error(err.response.data.message));
    setTimeout(() => {
      dispatch(alertActions.error_clear());
      dispatch(alertActions.clear());
    }, 3000);
  }
};

export const deleteBlog = (blogId, userId) => async (dispatch) => {
  try {
    const res = await api.delete(`/blogs/deleteBlog/${blogId}/${userId}`);
    if (res) {
      console.log(res);
      dispatch({
        type: DELETE_BLOG_SUCCESS,
        payload: res.data.message,
      });
      dispatch(alertActions.success(res.data.message));
      setTimeout(() => {
        dispatch(alertActions.success_clear());
        dispatch(alertActions.clear());
      }, 3000);
    }
  } catch (err) {
    console.log("Delete blog error in the frontend", err);
    dispatch({
      type: DELETE_BLOG_FAIL,
      payload: err.response.data.message,
    });
    dispatch(alertActions.error(err.response.data.message));
    setTimeout(() => {
      dispatch(alertActions.error_clear());
      dispatch(alertActions.clear());
    }, 3000);
  }
};
