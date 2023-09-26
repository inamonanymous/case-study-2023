import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import PostPersonData from './post-person';

function Dashboard() {
  const [formData, setFormData] = useState({ email: '' });
  const [emailExists, setEmailExists] = useState(false);
  const [showUserDataForm, setShowUserDataForm] = useState(false); // Add state to show UserDataForm
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setEmailExists(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://127.0.0.1:5000/user/check-person', formData);
      console.log('Response:', response);
      if (response.data.emailExists) {
        setEmailExists(true);
        setShowUserDataForm(false); // Hide UserDataForm if email exists
      } else {
        setShowUserDataForm(true); // Show UserDataForm if email doesn't exist
      }
    } catch (error) {
      console.error('Error checking email:', error);
    }
  };

  // Function to handle UserDataForm submission
  const handleUserDataSubmit = async (userData) => {
    try {
      // Send userData to the backend for processing
      const response = await axios.post('http://127.0.0.1:5000/user/person', userData);
      console.log('Response:', response);
      // You can handle the response as needed
      if (response.status === 200) {
        // Redirect to a success page or do something else
        navigate('/success');
      } else {
        console.error('Error saving user data:', response);
      }
    } catch (error) {
      console.error('Error saving user data:', error);
    }
  };

  return (
    <div>
      <h1>Welcome to the website</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        {emailExists && <p>Email already exists. Please enter another email.</p>}
        <button type="submit">Continue</button>
      </form>

      {showUserDataForm && (
        <div>
          {/* Render UserDataForm component */}
          <PostPersonData onSubmit={handleUserDataSubmit} userEmail={formData.email} />
        </div>
      )}

      <div>
        <Link to="/dashboard">
          <button>Cancel</button>
        </Link>
      </div>
    </div>
  );
}

export default Dashboard;
