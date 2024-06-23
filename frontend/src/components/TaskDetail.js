import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';

function TaskDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/tasks/${id}`);
        setTask(response.data);
      } catch (error) {
        console.error('Error fetching task:', error);
      }
    };
    fetchTask();
  }, [id]);

  const deleteTask = async () => {
    try {
      await axios.delete(`http://localhost:8000/tasks/${id}`);
      navigate('/');
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  if (!task) return <div className="container mx-auto mt-10 p-4">Loading...</div>;

  return (
    <div className="container mx-auto mt-10 p-4  border border-white">
      <h1 className="text-3xl font-bold mb-6 text-slate-300">{task.title}</h1>
      <p className="mb-4 text-slate-300">{task.description}</p>
      <p className="text-slate-200 mb-4">Due: {new Date(task.dueDate).toISOString().split('T')[0]}</p>
      <div className="flex space-x-2">
        <Link to={`/edit/${task._id}`} className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600">Edit</Link>
        <button onClick={deleteTask} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">Delete</button>
      </div>
    </div>
  );
}

export default TaskDetail;
