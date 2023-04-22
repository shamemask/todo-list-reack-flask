import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTasks } from '../actions/tasks';
import { Link } from 'react-router-dom';

const TasksList = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.tasks);
  const loading = useSelector((state) => state.tasks.loading);
  const error = useSelector((state) => state.tasks.error);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      {tasks.map((task) => (
        <div key={task.id}>
          <h3>{task.name}</h3>
          <p>{task.email}</p>
          <p>{task.description}</p>
          {task.done && <p>Done</p>}
          <Link to={`/tasks/${task.id}`}>Details</Link>
        </div>
      ))}
    </div>
  );
};

export default TasksList;