// MainContent.js
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios for making HTTP requests
import ListHeader from './components/ListHeader';
import TaskForm from './components/TaskForm';
import Modal from './components/Modal';
import TaskList from './components/TaskList';
import ScheduleContext from './ScheduleContext';


const MainContent = () => {
  const [showTaskForm, setShowTaskForm] = useState(false);
  // const [tasks, setTasks] = useState([]);
  const [currentTask, setCurrentTask] = useState(null);
  
  const navigate = useNavigate(); // Get the navigate function from useNavigate
  const { tasks, setTasks, setSchedule, setUnschedulable } = useContext(ScheduleContext); // Use context to set schedule
  
  const handleAddNewClick = () => {
    setCurrentTask(null);
    setShowTaskForm(true);
  };

  const handleCloseModal = () => {
    setShowTaskForm(false);
  };

  const addTask = (task) => {
    setTasks([...tasks, task]);
    handleCloseModal();
  };

  const deleteTask = async (index) => {
    const taskToDelete = tasks[index];
    try {
      await axios.delete(`http://127.0.0.1:5000/deleteTask/${taskToDelete.id}`);
      const newTasks = [...tasks];
      newTasks.splice(index, 1);
      setTasks(newTasks);
    } catch (error) {
      console.log("There was an error deleting the task");
    }
  };

  const handleEditTask = (index) => {
    const taskToEdit = { ...tasks[index], index };
    setCurrentTask(taskToEdit);
    setShowTaskForm(true);
  };

  const editTask = (index, updatedTask) => {
    const newTasks = [...tasks];
    newTasks[index] = updatedTask;
    setTasks(newTasks);
    handleCloseModal();
  };

  const handleMakeSchedule = async () => {
    console.log("Called handleMakeSchedule");
    try {
      console.log("Making API Request");
      const response = await axios.post('http://127.0.0.1:5000/createSchedule');
      setSchedule(response.data.schedule);
      setUnschedulable(response.data.unschedulable);
      console.log("Scheduled tasks", response.data.schedule);
      console.log("Unscheduled tasks", response.data.unschedulable);
      navigate('/calendar'); // Navigate to the calendar view
    } catch (error) {
      console.log('Error creating schedule', error);
    }
  };



  return (
    <div className="app">
      <ListHeader listName={'AI Task Scheduler'} onAddNew={handleAddNewClick} />
      <div className="content">
        <TaskList tasks={tasks} onDelete={deleteTask} onEdit={handleEditTask} />
        {showTaskForm && (
          <Modal onClose={handleCloseModal}>
            <TaskForm addTask={addTask} editTask={editTask} currentTask={currentTask} />
          </Modal>
        )}
      </div>
      <div className="make-schedule-container">
        <button className="make-schedule-button" onClick={handleMakeSchedule}>
          Make My Schedule!
        </button>
      </div>
    </div>
  );
};

export default MainContent;
