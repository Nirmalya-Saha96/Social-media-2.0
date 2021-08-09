import axios from 'axios';
import { setAlert } from './alert';
import { GET_BLOGS, BLOG_ERROR, UPDATE_BLIKES, DELETE_BLOG, ADD_BLOG } from './types';

//get blogs
export const getBlogs = () => async dispatch => {
  try {
    const res = await axios.get('/api/blog');

    dispatch({
      type: GET_BLOGS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: BLOG_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
}

//add like
export const addBLike = id => async dispatch => {
  try {
    const res = await axios.put(`/api/blog/like/${id}`);

    dispatch({
      type: UPDATE_BLIKES,
      payload: { id, likes: res.data }
    });
  } catch (err) {
    dispatch({
      type: BLOG_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
}

//remove like
export const removeBLike = id => async dispatch => {
  try {
    const res = await axios.put(`/api/blog/unlike/${id}`);

    dispatch({
      type: UPDATE_BLIKES,
      payload: { id, likes: res.data }
    });
  } catch (err) {
    dispatch({
      type: BLOG_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
}

//delete blog
export const deleteBlog = id => async dispatch => {
  try {
    const res = await axios.delete(`/api/blog/${id}`);

    dispatch({
      type: DELETE_BLOG,
      payload: id
    });

    dispatch(setAlert('Blog deleted', 'success'));
  } catch (err) {
    dispatch({
      type: BLOG_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
}

//add post
export const addBlog = formData => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  try {
    const res = await axios.post('/api/blog', formData, config);

    dispatch({
      type: ADD_BLOG,
      payload: res.data
    });

    dispatch(setAlert('Blog created', 'success'));
  } catch (err) {
    dispatch({
      type: BLOG_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
}
