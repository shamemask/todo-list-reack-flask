import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { UPDATE_TODO } from '../actions/types';

const AdminTodoForm = ({ todo }) => {
  const dispatch = useDispatch();
  const [text, setText] = useState(todo.text);
  const [done, setDone] = useState(todo.done);

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.patch(`/api/todos/${todo.id}`, { text, done });
      dispatch({
        type: UPDATE_TODO
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
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