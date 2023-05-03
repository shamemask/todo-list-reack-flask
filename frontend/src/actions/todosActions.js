import axios from 'axios';
import {
  FETCH_TODOS,
  FETCH_TODO_BY_ID,
  UPDATE_TODO,
  CREATE_TODO
} from './types';
import { API_URL } from '../config';

axios.defaults.baseURL = API_URL;

export const fetchTodos = (page = 1, sortField = 'id', sortOrder = 'asc') => async dispatch => {
  try {
    const res = await axios.get(`/api/todos?_page=${page}&_limit=3&_sort=${sortField}&_order=${sortOrder}`);
    const totalCount = await res.headers['x-total-count'];
    dispatch({
      type: FETCH_TODOS,
      payload: { data: res.data, page, totalCount:totalCount }
    });
  } catch (err) {
    console.log(err);
  }
};
export const fetchTodoById = id => async dispatch => {
  const res = await axios.get(`/api/todos/${id}`);
  dispatch({
    type: FETCH_TODO_BY_ID,
    payload: res.data
  });
};

export const updateTodo = (id, text, done) => async dispatch => {
  await axios.put(`/api/todos/${id}`, { text, done });
  dispatch({
    type: UPDATE_TODO
  });
};

export const createTodo = (name, email, text) => dispatch => {
  return axios.post('/api/todos', { name, email, text })
    .then(res => {
      dispatch({ type: CREATE_TODO, payload: res.data });
    })
    .catch(err => console.log(err));
};

export const login = (username, password) => dispatch => {
  if (username === 'admin' && password === '123') {
    dispatch({ type: LOGIN_SUCCESS });
  } else {
    dispatch({ type: LOGIN_FAIL });
  }
};

export const logout = () => dispatch => {
  dispatch({ type: LOGOUT });
};