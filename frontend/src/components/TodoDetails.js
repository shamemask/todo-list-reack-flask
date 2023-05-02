import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTodoById, updateTodo } from '../actions/todosActions';
import AdminTodoForm from './AdminTodoForm';
import { useHistory } from 'react-router-dom';

const TodoDetails = ({ match }) => {
  const { id } = match.params;
  const dispatch = useDispatch();
  const todo = useSelector(state => state.todos.todo);
  const isAdmin = useSelector(state => state.todos.isAdmin);
  const [text, setText] = useState(todo.text || "");
  const [done, setDone] = useState(todo.done || false);
  const history = useHistory();

  useEffect(() => {
    dispatch(fetchTodoById(id));
  }, [dispatch, id]);

  useEffect(() =>{
    setText(todo.text);
    setDone(todo.done);
  }, [todo]);

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(updateTodo(todo.id, text, done));
    history.push('/');
  };

  return (
    <div className='container'>
      <h2>Task Details:</h2>
        <form onSubmit={handleSubmit} className="todo-details">
          <h3>{todo.name}</h3>
          <p>{todo.email}</p>
          <input
            type="text"
            value={text}
            onChange={e => setText(e.target.value)}
            className="todo-input"
          />
          <label>
            Done?
            <input
              type="checkbox"
              checked={done}
              onChange={e => setDone(e.target.checked)}
              className="todo-checkbox"
            />
          </label>
          <button type="submit" className="btn-primary">Save</button>
        </form>
        {isAdmin ? (
            <AdminTodoForm class="admin-todo-form" todo={todo} />
          ) : (
            <div>
              <h3>{todo.name}</h3>
              <p>{todo.email}</p>
              <p>{todo.text}</p>
              <p>{todo.done ? 'Done' : 'Not Done'}</p>
            </div>
          )}
    </div>
  );
};

export default TodoDetails;