import axios from 'axios';
import {
  FETCH_TODOS,
  FETCH_TODO_BY_ID,
  UPDATE_TODO,
  CREATE_TODO
} from './types';

export const fetchTodos = () => async dispatch => {
  const res = await axios.get('/api/todos');
  dispatch({
    type: FETCH_TODOS,
    payload: res.data
  });
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