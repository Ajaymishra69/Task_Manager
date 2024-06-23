import React from 'react';
import "./App.css" ; 
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TaskList from './components/TaskList';
import TaskDetail from './components/TaskDetail';
import TaskForm from './components/TaskForm';


function App() {
  return (
    <div className="w-full">
      <Router>
        {/* <div> */}
          <Routes>
            <Route exact path="/" element={<TaskList />} />
            <Route path="/tasks/:id" element={<TaskDetail />} />
            <Route path="/add" element={<TaskForm />} />
            <Route path="/edit/:id" element={<TaskForm />} />
          </Routes>
        {/* </div> */}
      </Router>
    </div>
  );
}

export default App;
