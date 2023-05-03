import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import TodoList from './TodoList';
import TodoForm from './TodoForm';
import TodoDetails from './TodoDetails';
import PrivateRoute from './PrivateRoute';

const App = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={TodoList} />
      <Route exact path="/create-todo" component={TodoForm} />
      <PrivateRoute path="/todos/:id" component={TodoDetails} />
    </Switch>
  </Router>
);

export default App;