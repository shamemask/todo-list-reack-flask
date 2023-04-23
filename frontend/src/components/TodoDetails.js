import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTodoById, updateTodo } from '../actions/todosActions';

const TodoDetails = ({ match }) => {
  const { id } = match.params;
  const dispatch = useDispatch();
  const todo = useSelector(state => state.todo);
  const [text, setText] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    dispatch(fetchTodoById(id));
  }, [dispatch, id]);

  useEffect(() => {
    setText(todo.text);
    setDone(todo.done);
  }, [todo]);

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(updateTodo(todo.id, text, done));
  };

  return (
    <div>
      <h2>Task Details:</h2>
      <form onSubmit={handleSubmit}>
        <h3>{todo.name}</h3>
        <p>{todo.email}</p>
        <input
          type="text"
          value={text}
          onChange={e => setText(e.target.value)}
        />
        <label>
          Done?
          <input
            type="checkbox"
            checked={done}
            onChange={e => setDone(e.target.checked)}
          />
        </label>
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default TodoDetails;