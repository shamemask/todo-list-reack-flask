import axios from 'axios';

export const FETCH_TASKS_REQUEST = 'FETCH_TASKS_REQUEST';
export const FETCH_TASKS_SUCCESS = 'FETCH_TASKS_SUCCESS';
export const FETCH_TASKS_FAILURE = 'FETCH_TASKS_FAILURE';

export const fetchTasks = (page = 1, order_by = 'name') => {
  return (dispatch) => {
    dispatch({ type: FETCH_TASKS_REQUEST });

    axios
      .get(`/api/tasks?page=${page}&order_by=${order_by}`)
      .then((response) => {
        dispatch({
          type: FETCH_TASKS_SUCCESS,
          payload: {
            tasks: response.data.tasks,
            total_pages: response.data.total_pages,
            current_page: response.data.current_page,
            per_page: response.data.per_page,
            order_by: response.data.order_by,
          },
        });
      })
      .catch((error) => {
        dispatch({ type: FETCH_TASKS_FAILURE, payload: { error: error.response.data.error } });
      });
  };
};