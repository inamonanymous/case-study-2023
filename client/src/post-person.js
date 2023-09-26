import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Dashboard from './dashboard';

function PostPersonData({ onSubmit, userEmail }) {
  const [formData, setFormData] = useState({
    args_person_firstname: '',
    args_person_surname: '',
    args_phone_number: '',
    args_email_address: userEmail, // Use the provided userEmail as the initial value
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://127.0.0.1:5000/user/person', formData, {
      headers: {
        'Content-Type': 'application/json',
      },});
      console.log('Response:', response);
      if (response.status === 201) {
        console.log('Person data saved successfully');
        console.log('Before navigate');
        navigate('/dashboard'); 
        console.log('After navigate');
      } else {
        console.error('Error saving user data:', response);
      }
    } catch (error) {
      
      console.error('Error saving user data:', error);
    }
  };

  return (
    <div>
      <h2>Post Form Data Example</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="args_person_firstname">Firstname:</label>
          <input
            type="text"
            id="args_person_firstname"
            name="args_person_firstname"
            value={formData.args_person_firstname}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="args_person_surname">Surname:</label>
          <input
            type="text"
            id="args_person_surname"
            name="args_person_surname"
            value={formData.args_person_surname}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="args_phone_number">Phone number:</label>
          <input
            type="text"
            id="args_phone_number"
            name="args_phone_number"
            value={formData.args_phone_number}
            onChange={handleChange}
          />
        </div>
        
          <div>
            {/* Only render this if userEmail is provided */}
            <label htmlFor="email_address">Email:</label>
            <input
              type="text"
              id="email_address"
              name="email_address"
              value={userEmail}
              disabled
            />
          </div>
        
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default PostPersonData;
