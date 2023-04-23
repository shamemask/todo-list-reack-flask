import React from 'react';
import { Link } from 'react-router-dom';

const TodoListItem = ({ todo }) => (
  <div>
    <h3>{todo.name}</h3>
    <p>{todo.email}</p>
    <p>{todo.text}</p>
    <p>Completed: {todo.done ? 'Yes' : 'No'}</p>
    <Link to={`/todos/${todo.id}`}>Details</Link>
  </div>
);

export default TodoListItem;