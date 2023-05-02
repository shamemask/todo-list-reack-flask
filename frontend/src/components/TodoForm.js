import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createTodo } from '../actions/todosActions';

const TodoForm = ({ createTodo, history }) => { // добавляем history в пропсы
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [text, setText] = useState('');

  const onSubmit = e => {
    e.preventDefault();
    createTodo(name, email, text);
    setName('');
    setEmail('');
    setText('');
    history.push('/'); // переход на главную страницу
  };

  return (
    <div className='container'>
      <form onSubmit={onSubmit} className="todo-form">
        <div>
          <label htmlFor="name">Name</label>
          <input className="todo-input" type="text" id="name" value={name} onChange={e => setName(e.target.value)} required />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input className='todo-input' type="email" id="email" value={email} onChange={e => setEmail(e.target.value)} required />
        </div>
        <div>
          <label htmlFor="text">Text</label>
          <input className='todo-input' type="text" id="text" value={text} onChange={e => setText(e.target.value)} required />
        </div>
        <button className='btn-primary' type="submit">Add Todo</button>
      </form>
    </div>
  );
};

export default connect(null, { createTodo })(TodoForm);