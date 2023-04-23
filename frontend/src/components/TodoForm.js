import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createTodo } from '../actions/todosActions';

const TodoForm = ({ createTodo }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [text, setText] = useState('');

  const onSubmit = e => {
    e.preventDefault();
    createTodo(name, email, text);
    setName('');
    setEmail('');
    setText('');
  };

  return (
    <form onSubmit={onSubmit}>
      <div>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" value={name} onChange={e => setName(e.target.value)} required />
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input type="email" id="email" value={email} onChange={e => setEmail(e.target.value)} required />
      </div>
      <div>
        <label htmlFor="text">Text</label>
        <input type="text" id="text" value={text} onChange={e => setText(e.target.value)} required />
      </div>
      <button type="submit">Add Todo</button>
    </form>
  );
};

export default connect(null, { createTodo })(TodoForm);