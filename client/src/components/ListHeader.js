import AuthContext from './AuthContext';
import React, { useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Takes in two props, listName and onAddNew
// listName: a string that represents the name of the list to be displayed
// onAddNew: A function that will be called when the ADD NEW button is clicked
const ListHeader = ({ listName, onAddNew }) => {
    const { logout } = useContext(AuthContext)
    const navigate = useNavigate();

    const signOut = async () => {
      try {
        const response = await axios.post('http://127.0.0.1:5000/logout');
        if (response.status === 200) {
          logout();
          navigate('/landing'); // Redirect to the landing page after signing out
        } else {
          console.error('Error logging out:', response.data);
        }
      } catch (error) {
        console.error('Error logging out:', error);
      }
    };
    
    return (
      <div className="list-header">
        <h1>{listName}</h1>
        <div className="button-container">
            <button className="create" onClick={onAddNew}>ADD NEW</button>
            <button className="signout" onClick={signOut}>SIGN OUT</button>
        </div>
      </div>
    )
  }
  
  export default ListHeader