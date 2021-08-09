import { GET_BLOGS, BLOG_ERROR, UPDATE_BLIKES, DELETE_BLOG, ADD_BLOG } from '../actions/types';

const initialState = {
  blogs: [],
  blog: null,
  loading: true,
  error: {}
}

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch(type) {
    case GET_BLOGS:
      return {
        ...state,
        blogs: payload,
        loading: false
      }
    case ADD_BLOG:
      return {
        ...state,
        blogs: [ payload, ...state.blogs],
        loading: false
      }
    case DELETE_BLOG:
      return {
        ...state,
        blogs: state.blogs.filter(blog => blog._id !== payload),
        loading: false
      }
    case UPDATE_BLIKES:
      return {
        ...state,
        blogs: state.blogs.map(blog => blog._id === payload.id ? { ...blog, likes: payload.likes} : blog),
        loading: false
      }
    case BLOG_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      }
    default:
      return state;
  }
}
