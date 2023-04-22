import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getTask } from '../actions/tasks';

const TaskDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const task = useSelector((state) => state.tasks.tasks.find((task) => task.id === parseInt(id)));
  const loading = useSelector((state) => state.tasks.loading);
  const error = useSelector((state) => state.tasks.error);

  useEffect(() => {
    dispatch(getTask(id));
  }, [dispatch, id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!task) {
    return <div>Task not found</div>;
  }

  return (
    <div>
      <h3>{task.name}</h3>
      <p>{task.email}</p>
      <p>{task.description}</p>
      {task.done && <p>Done</p>}
    </div>
  );
};

export default TaskDetails;