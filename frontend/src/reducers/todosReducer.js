import {
  FETCH_TODOS,
  FETCH_TODO_BY_ID,
  UPDATE_TODO,
  CREATE_TODO,
  LOGIN_SUCCESS,
  LOGOUT
} from '../actions/types';

const initialState = {
  todos: [],
  todo: {},
  currentPage: 1,
  totalPages: 0,
  isAdmin: false
};

const todosReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TODOS:
      return {
        ...state,
        todos: action.payload.data,
        currentPage: action.payload.page,
        totalPages: Math.ceil(action.payload.headers['x-total-count'] / 3)
      };
    case FETCH_TODO_BY_ID:
      return {
        ...state,
        todo: action.payload
      };
    case UPDATE_TODO:
      return state;
    case CREATE_TODO:
      return {
        ...state,
        todos: [action.payload, ...state.todos]
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAdmin: true
      };
    case LOGOUT:
      return {
        ...state,
        isAdmin: false
      };
    default:
      return state;
  }
};

export default todosReducer;