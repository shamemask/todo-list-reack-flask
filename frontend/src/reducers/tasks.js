import {
    FETCH_TASKS_REQUEST,
    FETCH_TASKS_SUCCESS,
    FETCH_TASKS_FAILURE,
  } from '../actions/tasks';
  
  const initialState = {
    tasks: [],
    total_pages: 0,
    current_page: 0,
    per_page: 0,
    order_by: 'name',
    loading: false,
    error: null,
  };
  
  export default (state = initialState, action) => {
    switch (action.type) {
      case FETCH_TASKS_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
        };
      case FETCH_TASKS_SUCCESS:
        return {
          ...state,
          tasks: action.payload.tasks,
          total_pages: action.payload.total_pages,
          current_page: action.payload.current_page,
          per_page: action.payload.per_page,
          order_by: action.payload.order_by,
          loading: false,
          error: null,
        };
      case FETCH_TASKS_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload.error,
        };
      default:
        return state;
    }
  };