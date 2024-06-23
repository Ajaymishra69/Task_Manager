import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import image from './images.jpg';

function TaskList() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('http://localhost:8000/tasks');
        setTasks(response.data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };
    fetchTasks();
  }, []);

  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/tasks/${id}`);
      setTasks(tasks.filter(task => task._id !== id));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <div className={`container mx-auto mt-10 p-4  ${tasks.length === 0 ? "bg-white" : "bg-[#212121]" } h-[100%]`}>
      <div className="flex justify-between items-center mb-6">
        <h1 className={`text-3xl font-bold ${tasks.length === 0 ? "text-black" : "text-white" }`}>Task List</h1>
        <Link to="/add" className="btn btn-primary italic">
          <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">Add New Task</button>
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tasks.length === 0 ? (
          <div className="flex justify-center col-span-full">
            <img src={image} height="400px" width="400px" className="mt-5" alt="No tasks" />
          </div>
        ) : (
          tasks.map(task => (
            <div key={task._id} className="bg-slate-200 p-6 rounded-lg shadow-md border border-gray-200">
              <h2 className="text-xl font-semibold mb-2">{task.title}</h2>
              <p className="mb-2">{task.description}</p>
              <p className="text-gray-600">Due Date: {new Date(task.dueDate).toISOString().split('T')[0]}</p>
              <div className="flex justify-between mt-4">
                <Link to={`/tasks/${task._id}`} className="text-green-600 hover:text-green-800 flex items-center">
                  <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 20h9m-9-4h6M7 4h10m-6 8h6m-4 4h6M3 8h6m-4 4h6m-4 4h6M5 4h.01M5 16h.01M5 20h.01" />
                  </svg>
                  View Details
                </Link>
                <button onClick={() => deleteTask(task._id)} className="text-red-600 hover:text-red-800 flex items-center">
                  <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default TaskList;
