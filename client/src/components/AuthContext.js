import React, { createContext, useState, useEffect } from 'react';

const AuthContext = createContext();

// We are going to export this component and use it in the app.js file
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const { setTasks } = useContext(ScheduleContext);

  // Runs when the component mounts because of the empty dependency array
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        if (parsedUser){
            setUser(JSON.parse(storedUser));
            console.log('User found in localStorage:', JSON.parse(storedUser));
        }
      } catch (error) {
        console.error('Failed to parse user from localStorage:', error);
      }
    }
  }, []);

  const login = (userData) => {
    console.log('Logging in user:', userData);
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const fetchTasks = async (userId) => {
    try {
      const response = await axios.get(`http://127.0.0.1:5000/tasks?user_id=${userId}`);
      setTasks(response.data.tasks);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
