import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const isAdmin = useSelector(state => state.todos.isAdmin);

  return (
    <Route {...rest} render={(props) => (
      isAdmin === true
        ? <Component {...props} />
        : <Redirect to='/' />
    )} />
  );
};

export default PrivateRoute;