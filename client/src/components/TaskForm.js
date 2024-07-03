import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios'; // Import axios for making HTTP requests
import AuthContext from './AuthContext';

const TaskForm = ({ addTask, editTask, currentTask }) => {
    // Initialize form data state with useState hook
  const { user } = useContext(AuthContext)
  const [formData, setFormData] = useState({
    user_id: user?.id || '',
    taskname: '',
    fixed: false,
    duration: '',
    preferred_intervals: [],
    preferred_days: [],
    max_intervals: [],
    all_days: [],
    difficulty: '',
    importance: '',
    fixed_day: '',
    fixed_start_time: '',
    fixed_end_time: '',
  });

  //useEffect is a hook that is used to perfrom side effects on our application
  // a side effect is a reaction to something, usually a change in state
  // What's in the {} represents the code we want to when useEffect() is triggered
  // The [] is the depencncy array, where you tell useEffect() what it should listen/react to
  // In this case useEffect() reacts to a change in currentTask
  useEffect(() => {
    console.log('Current task in TaskForm:', currentTask); // Verify currentTask prop
    if (currentTask) {
        // If currentTask isn't null we want our form data to show the task we plan to edit
        setFormData(currentTask);
    }
    else {
        // If our currentTask is null (i.e. we are adding a new task), then we want it to be null
        setFormData({
            user_id: user?.id || '',
            taskname: '',
            fixed: false,
            duration: '',
            preferred_intervals: [],
            preferred_days: [],
            max_intervals: [],
            all_days: [],
            difficulty: '',
            importance: '',
            fixed_day: '',
            fixed_start_time: '',
            fixed_end_time: '',
        });
    }
  }, [currentTask, user?.id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : type === 'number' ? Number(value) : value,
    }));
  };

  const handleDaysChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value.split(',').map(item => item.trim()), // Split by commas and trim spaces
    }));
  };

 


  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("current form data", formData)
    let formattedData = { ...formData };
    if (!formData.fixed) {
      formattedData = {
        ...formData,
        preferred_intervals: Array.isArray(formData.preferred_intervals)
          ? formData.preferred_intervals
          : formData.preferred_intervals.split(',').map(interval => interval.trim()),
        preferred_days: Array.isArray(formData.preferred_days)
          ? formData.preferred_days
          : formData.preferred_days.split(',').map(day => day.trim()),
        max_intervals: Array.isArray(formData.max_intervals)
          ? formData.max_intervals
          : formData.max_intervals.split(',').map(interval => interval.trim()),
        all_days: Array.isArray(formData.all_days)
          ? formData.all_days
          : formData.all_days.split(',').map(day => day.trim()),
    };
    }
    try {
     if (currentTask) {
        // CurrentTask.id is undefined right here for some reason
        console.log("Current task ID:", currentTask.id);
        const response = await axios.put(`http://127.0.0.1:5000/updateTask/${currentTask.id}`, formattedData);
        console.log("Response data:", response.data);
        editTask(currentTask.index, formattedData); 
     }
     else {
        console.log("Sending data", formattedData)
        const response = await axios.post('http://127.0.0.1:5000/addTask', formattedData);
        console.log("Response data:", response.data);
        const newTask = response.data.task;
        console.log("New task", response.data.task);
        addTask(newTask);
     }
    } catch (error) {
      console.error('Error submitting form', error);
    }
  };
// Render the form
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Task Name:
          <input type="text" name="taskname" value={formData.taskname} onChange={handleChange} required />
        </label>
      </div>
      <div>
        <label>
          Fixed:
          <input type="checkbox" name="fixed" checked={formData.fixed} onChange={handleChange} />
        </label>
      </div>
      <div>
        <label>
          Duration:
          <input type="number" name="duration" value={formData.duration} onChange={handleChange} required />
        </label>
      </div>
      {formData.fixed && (
        <>
          <div>
            <label>
              Fixed Day:
              <input type="text" name="fixed_day" value={formData.fixed_day} onChange={handleChange} />
            </label>
          </div>
          <div>
            <label>
              Fixed Start Time:
              <input type="time" name="fixed_start_time" value={formData.fixed_start_time} onChange={handleChange} />
            </label>
          </div>
          <div>
            <label>
              Fixed End Time:
              <input type="time" name="fixed_end_time" value={formData.fixed_end_time} onChange={handleChange} />
            </label>
          </div>
        </>
      )}
      {!formData.fixed && (
        <>
          <div>
            <label>
              Preferred Intervals:
              <input type="text" name="preferred_intervals" value={formData.preferred_intervals} onChange={handleChange} placeholder="Separate with commas"/>
            </label>
          </div>
          <div>
            <label>
              Preferred Days:
              <input type="text" name="preferred_days" value={formData.preferred_days} onChange={handleDaysChange} placeholder="Separate with commas"/>
            </label>
          </div>
          <div>
            <label>
              Max Intervals:
              <input type="text" name="max_intervals" value={formData.max_intervals} onChange={handleChange} placeholder="Separate with commas" />
            </label>
          </div>
          <div>
            <label>
              All Days:
              <input type="text" name="all_days" value={formData.all_days} onChange={handleDaysChange} placeholder="Separate with commas"/>
            </label>
          </div>
          <div>
            <label>
               Difficulty (1-10):
              <input type="number" name="difficulty" value={formData.difficulty} onChange={handleChange} min="1" max="10" />
            </label>
          </div>
          <div>
            <label>
              Importance (1-10):
              <input type="number" name="importance" value={formData.importance} onChange={handleChange} min="1" max="10"/>
            </label>
          </div>
        </>
      )}
      <button type="submit">{currentTask ? 'Update' : 'Submit' }</button>
    </form>
  );
};

export default TaskForm;
