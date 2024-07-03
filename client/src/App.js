// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainContent from './MainContent'; // Import the MainContent component
import CalendarView from './components/CalendarView'; // Import the CalendarView component
import Login from './components/Login';
import Signup from './components/Signup';
import { AuthProvider } from './components/AuthContext'
import ProtectedRoute from './components/ProtectedRoute';
import LandingPage from './components/LandingPage';

import { ScheduleProvider } from './ScheduleContext';

const App = () => {
  return (
  <AuthProvider>
    <ScheduleProvider>
        <Router>
        <Routes>
          <Route path='/landing' element={<LandingPage/>} />
          <Route path="/" element={<ProtectedRoute element={<MainContent /> } /> } />
          <Route path="/calendar" element={<ProtectedRoute element = {<CalendarView />} />} /> 
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </Router>
    </ScheduleProvider>
  </AuthProvider>
  );
};

export default App;
