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
} from "../Actions/Types";

const initialState = {
  loading: false,
  failMessage: "",
  fetchedBlogs: [],
  createdEditedBlog: {},
};

export default function blogs(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case CREATE_BLOG_START:
      return {
        ...state,
        loading: true,
      };
    case CREATE_BLOG_SUCCESS:
      return {
        ...state,
        loading: false,
        createdEditedBlog: payload,
      };
    case CREATE_BLOG_FAIL:
      return {
        ...state,
        loading: false,
        failMessage: payload,
      };
    case GET_BLOGS_SUCCESS:
      return {
        ...state,
        fetchedBlogs: payload,
      };
    case GET_BLOGS_FAIL:
      return {
        ...state,
        failMessage: payload,
      };
    case UPDATE_BLOG_START:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_BLOG_SUCCESS:
      return {
        ...state,
        loading: false,
        createdEditedBlog: payload,
      };
    case UPDATE_BLOG_FAIL:
      return {
        ...state,
        loading: false,
        failMessage: payload,
      };
    case DELETE_BLOG_SUCCESS:
      return {
        ...state,
      };
    case DELETE_BLOG_FAIL:
      return {
        ...state,
        failMessage: payload,
      };
    default:
      return state;
  }
}
