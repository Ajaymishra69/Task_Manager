import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function TaskForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');

  useEffect(() => {
    if (id) {
      const fetchTask = async () => {
        try {
          const response = await axios.get(`http://localhost:8000/tasks/${id}`);
          setTitle(response.data.title);
          setDescription(response.data.description);
          setDueDate(response.data.dueDate);
        } catch (error) {
          console.error('Error fetching task:', error);
        }
      };
      fetchTask();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const task = { title, description, dueDate };
    try {
      if (id) {
        await axios.put(`http://localhost:8000/tasks/${id}`, task);
      } else {
        await axios.post('http://localhost:8000/tasks', task);
      }
      navigate('/');
    } catch (error) {
      console.error('Error saving task:', error);
    }
  };

  return (
    <div className="container mx-auto mt-10 p-4 bg-gray-500 shadow-lg">
      <h1 className="text-3xl font-bold mb-6">{id ? 'Edit Task' : 'Add New Task'}</h1>
      <form onSubmit={handleSubmit} className="bg-slate-100 p-6 rounded-lg shadow-md border border-gray-200">
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Title</label>
          <input
            type="text"
            className="form-input mt-1 block w-full border border-black-800 border-solid bg-slate-200 "
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2 ">Description</label>
          <textarea
            className="form-textarea mt-1 block w-full border border-black-800 bg-slate-200"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Due Date</label>
          <input
            type="date"
            className="form-input mt-1 block w-full border border-black-800 bg-slate-200"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
          {id ? 'Update' : 'Add'} Task
        </button>
      </form>
    </div>
  );
}

export default TaskForm;
