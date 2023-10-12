import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './styles/post-students.css';

function PostStudentData({ args_requested_item }) {
  const [errorMessage, setErrorMessage] = useState('');

  const [formData, setFormData] = useState({
    args_student_number: '',
    args_student_section: '',
    args_student_department: '',
    args_student_year: '',
    args_student_email_address: '',
    args_student_firstname: '',
    args_student_surname: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.args_student_number ||
      !formData.args_student_firstname ||
      !formData.args_student_surname ||
      !formData.args_student_department ||
      !formData.args_student_year ||
      !formData.args_student_email_address ||
      !formData.args_student_section
    ) {
      setErrorMessage('Please fill in all fields');
      return;
    }

    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (!emailRegex.test(formData.args_student_email_address)) {
      setErrorMessage('Invalid email address format');
      return;
    }

    try {
      const mergedData = {
        ...formData,
        args_requested_item,
      };

      const response = await axios.post(
        'http://127.0.0.1:5000/user/student',
        mergedData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status === 201) {
        navigate('/dashboard');
      } else {
        setErrorMessage('Data could not be saved');
        console.error('Error saving student data:', response);
      }
    } catch (error) {
      setErrorMessage('An error occurred while saving data (Check if Item is available)');
      console.error('Error saving student data:', error);
    }
  };

  return (
    <div className="post-student-data">
      <h2>Student Information</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="args_student_number">Student Number:</label>
          <input
            type="text"
            id="args_student_number"
            name="args_student_number"
            value={formData.args_student_number}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="args_student_firstname">First Name:</label>
          <input
            type="text"
            id="args_student_firstname"
            name="args_student_firstname"
            value={formData.args_student_firstname}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="args_student_surname">Last Name:</label>
          <input
            type="text"
            id="args_student_surname"
            name="args_student_surname"
            value={formData.args_student_surname}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="args_student_department">Department:</label>
          <input
            type="text"
            id="args_student_department"
            name="args_student_department"
            value={formData.args_student_department}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="args_student_year">Year:</label>
          <input
            type="text"
            id="args_student_year"
            name="args_student_year"
            value={formData.args_student_year}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="args_student_email_address">Email Address:</label>
          <input
            type="text"
            id="args_student_email_address"
            name="args_student_email_address"
            value={formData.args_student_email_address}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="args_student_section">Section:</label>
          <input
            type="text"
            id="args_student_section"
            name="args_student_section"
            value={formData.args_student_section}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <button type="submit">Submit</button>
        </div>
      </form>

      {errorMessage && (
        <div className="error-message">
          <b><i>{errorMessage}</i></b>
        </div>
      )}
    </div>
  );
}

export default PostStudentData;
