import React, { createContext, useState } from 'react';

const ScheduleContext = createContext();

export const ScheduleProvider = ({ children }) => {
  const [schedule, setSchedule] = useState(null);
  const [unschedulable, setUnschedulable] = useState([]);
  const [tasks, setTasks] = useState ([]);

  return (
    <ScheduleContext.Provider value={{ schedule, setSchedule, unschedulable, setUnschedulable, tasks, setTasks }}>
      {children}
    </ScheduleContext.Provider>
  );
};

export default ScheduleContext;
