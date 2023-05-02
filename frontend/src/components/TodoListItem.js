import React from 'react';
import { Link } from 'react-router-dom';

const TodoListItem = ({ todo }) => {
  const isAdmin = useSelector(state => state.todos.isAdmin);

  return (
    <tr>
      <td>{todo.name}</td>
      <td>{todo.email}</td>
      <td><Link to={`/todos/${todo.id}`}>{todo.text}</Link></td>
      <td>{todo.done ? 'Done' : 'Not Done'}</td>
      {isAdmin && <td className="edit-column"><Link to={`/todos/${todo.id}`}>Edit</Link></td>}
    </tr>
  );
};

export default TodoListItem;