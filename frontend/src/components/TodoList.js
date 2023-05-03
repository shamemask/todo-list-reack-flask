import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTodos } from '../actions/todosActions';
import { Link } from 'react-router-dom';
import AdminPanel from './AdminPanel';
import AdminTodoForm from './AdminTodoForm';

const TodoList = () => {
  const dispatch = useDispatch();
  const todos = useSelector(state => state.todos.todos);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = useSelector(state => state.todos.totalPages);
  const [nameSort, setNameSort] = useState(false);
  const [emailSort, setEmailSort] = useState(false);
  const [statusSort, setStatusSort] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [error, setError] = useState(null); 

  useEffect(() => {
    dispatch(fetchTodos(currentPage, nameSort ? 'name' : 'id', nameSort ? 'asc' : 'desc'));
  }, [dispatch, currentPage, nameSort]);

  const currentTodos = todos

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const handlePageClick = e => {
    setCurrentPage(Number(e.target.id));
  };

  const handleNameSort = () => {
    setNameSort(!nameSort);
    setEmailSort(false);
    setStatusSort(false);
    setCurrentPage(1);
  };

  const handleEmailSort = () => {
    setEmailSort(!emailSort);
    setNameSort(false);
    setStatusSort(false);
    setCurrentPage(1);
  };

  const handleStatusSort = () => {
    setStatusSort(!statusSort);
    setNameSort(false);
    setEmailSort(false);
    setCurrentPage(1);
  };

  const handleLogin = (username, password) => {
    if (username === 'admin' && password === '123') {
      setIsAdmin(true);
      setError(null); 
    } else {
      setError('Invalid username or password'); 
    }
  };

  const handleLogout = () => {
    setIsAdmin(false);
  };

  return (
    <div className='container'>
      <h2>Todo List</h2>
      <AdminPanel class="admin-todo-form" onLogin={handleLogin} onLogout={handleLogout} isAdmin={isAdmin} error={error} />
      <Link className="btn-primary" to="/create-todo">Create Todo</Link>
      <table>
        <thead>
          <tr>
            <th className='sort-name' onClick={handleNameSort}>Name</th>
            <th className='sort-email' onClick={handleEmailSort}>Email</th>
            <th>Description</th>
            <th className='sort-status' onClick={handleStatusSort}>Status</th>
            {isAdmin && <th className="edit-column">Edit</th>}
          </tr>
        </thead>
        <tbody>
          {currentTodos.map(todo => (
            <tr key={todo.id}>
              <td>{todo.name}</td>
              <td>{todo.email}</td>
              <td><Link to={`/todos/${todo.id}`}>{todo.text}</Link></td>
              <td>{todo.done ? 'Done' : 'Not Done'}</td>
              {isAdmin && (
                <>
                  <td className="edit-column"><Link to={`/todos/${todo.id}`}>Edit</Link></td>
                  <AdminTodoForm class="admin-todo-form" todo={todo} />
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      <div className='paginate'>
        {pageNumbers.map(number => (
          <span key={number} id={number} onClick={handlePageClick}>{number}</span>
        ))}
      </div>
    </div>
  );
};

export default TodoList;