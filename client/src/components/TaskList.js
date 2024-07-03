// Takes in three props: tasks, onDelete, and onEdit
// tasks: an array of tasks that we will display
// onDelete: a function that gets called when delete button is clicked
// onEdit: a function that gets called when "Edit" button is clicked
// index used to determine whcih task in the array to modify/delete
/*
NOTES: For onClick you can pass functions in as parameter, which is what we are doing with onDelete and onEdit, so when you click the button
titled 'Edit' or 'Delete', then the onEdit function and onDelete functions get executed. This functions are defined elsewhere and passed in,
which makes this component reusable because you can use it for diffferent things and pass different functions through
*/
import React from 'react';

const TaskList = ({ tasks, onDelete, onEdit }) => {
  return (
    <div className="task-list">
      {tasks.map((task, index) => (
        <div key={index} className="task-item">
          <div className="task-details">
            <span>{task.taskname}</span>
          </div>
          <div className="task-actions">
            <button className="edit-button" onClick={() => onEdit(index)}>Edit</button>
            <button className="delete-button" onClick={() => onDelete(index)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
