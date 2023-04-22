import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import TasksList from './components/TasksList';
import TaskDetails from './components/TaskDetails';
import TaskForm from './components/TaskForm';

const App = () => {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Tasks</Link>
            </li>
            <li>
              <Link to="/new-task">New Task</Link>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route exact path="/">
            <TasksList />
          </Route>
          <Route exact path="/new-task">
            <TaskForm />
          </Route>
          <Route exact path="/tasks/:id">
            <TaskDetails />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;