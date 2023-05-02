import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import TodoList from './TodoList';
import TodoForm from './TodoForm';
import TodoDetails from './TodoDetails';

const App = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={TodoList} />
      <Route exact path="/create-todo" component={TodoForm} />
      <Route path="/todos/:id" component={TodoDetails} />
    </Switch>
  </Router>
);

export default App;