import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTodos } from '../actions/todosActions';
import { Link } from 'react-router-dom';

const TodoList = () => {
  const dispatch = useDispatch();
  const todos = useSelector(state => state.todos);

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  return (
    <div>
        <h2>Todo List</h2>
        <Link to="/create-todo">Create Todo</Link>
        {todos.length === 0 ? <p>No todos found.</p> : (
          <ul>
            {todos.map(todo => (
              <li key={todo.id}>
                <Link to={`/todos/${todo.id}`}>
                  {todo.text} {todo.done ? '(done)' : ''}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
  );
};

export default TodoList;