import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import todosReducer from '../reducers/todosReducer';

const configureStore = () => {
  const store = createStore(todosReducer, applyMiddleware(thunk));
  return store;
};

export default configureStore;