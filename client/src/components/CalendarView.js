// CalendarView.js
import React, { useContext } from 'react';
import ScheduleContext from '../ScheduleContext';

const CalendarView = () => {
  const { schedule } = useContext(ScheduleContext); // Use context to get schedule

  // Helper function to format the time slots
  const formatTime = (time) => {
    const [hours, minutes] = time.split(':');
    return `${parseInt(hours, 10)}:${minutes}`;
  };

  // Helper function to find tasks for a specific hour
  const findTasksForHour = (tasks, hour) => {
    return tasks.filter(task => {
      const startHour = parseInt(task.start_time.split(':')[0], 10);
      const endHour = parseInt(task.end_time.split(':')[0], 10);
      return hour >= startHour && hour < endHour;
    });
  };

  return (
    <div className="calendar-view">
      <h1>Weekly Calendar View</h1>
      <div className="calendar">
        {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
          <div key={day} className="calendar-day">
            <h2>{day}</h2>
            <div className="time-slots">
              {[...Array(24).keys()].map((hour) => (
                <div key={hour} className="time-slot">
                  {hour}:00
                  {schedule && schedule[day] && findTasksForHour(schedule[day].tasks, hour).map((task, index) => (
                    <div key={index} className="task">
                      <div className="task-name">{task.taskname}</div>
                      <div className="task-time">{formatTime(task.start_time)} - {formatTime(task.end_time)}</div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CalendarView;
