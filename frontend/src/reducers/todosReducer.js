import {
  FETCH_TODOS,
  FETCH_TODO_BY_ID,
  UPDATE_TODO
} from '../actions/types';

const initialState = {
  todos: [],
  todo: {}
};

const todosReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TODOS:
      return {
        ...state,
        todos: action.payload
      };
    case FETCH_TODO_BY_ID:
      return {
        ...state,
        todo: action.payload
      };
    case UPDATE_TODO:
      return state;
    default:
      return state;
  }
};

export default todosReducer;