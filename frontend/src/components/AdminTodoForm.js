import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { UPDATE_TODO } from '../actions/types';

const AdminTodoForm = ({ todo }) => {
  const dispatch = useDispatch();
  const isAdmin = useSelector(state => state.todos.isAdmin);
  const [text, setText] = useState(todo.text);
  const [done, setDone] = useState(todo.done);

  const handleSave = async e => {
    e.preventDefault();
    try {
      await dispatch({ type: UPDATE_TODO, payload: { id: todo.id, text, done } });
      const res = await axios.patch(`/api/todos/${todo.id}`, { text, done });
      dispatch({ type: UPDATE_TODO, payload: res.data });
    } catch (err) {
      console.log(err);
      alert(err.message);
    }
  };

  return (
    isAdmin &&
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
  );
};

export default AdminTodoForm;