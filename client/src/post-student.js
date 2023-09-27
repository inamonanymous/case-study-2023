import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function PostStudentData({ equipmentData }) {
  const [formData, setFormData] = useState({
    args_student_number: '',
    args_student_section: '',
    args_student_department: '',
    args_student_year: '',
    args_student_email_address: '', // Use the provided userEmail as the initial value
    args_student_firstname: '', // Add a field for the student's first name
    args_student_surname: '', // Add a field for the student's surname
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const mergedData = {
        ...formData,
        ...equipmentData,
      };

      const response = await axios.post('http://127.0.0.1:5000/user/person/trial', mergedData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('Response:', response);

      if (response.status === 201) {
        console.log('Student data saved successfully');
        navigate('/dashboard');
      } else {
        console.error('Error saving student data:', response);
      }
    } catch (error) {
      console.error('Error saving student data:', error);
    }
  };

  return (
    <div>
      <h2>Student Information</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="args_student_number">Student Number:</label>
          <input
            type="text"
            id="args_student_number"
            name="args_student_number"
            value={formData.args_student_number}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="args_student_section">Section:</label>
          <input
            type="text"
            id="args_student_section"
            name="args_student_section"
            value={formData.args_student_section}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="args_student_department">Department:</label>
          <input
            type="text"
            id="args_student_department"
            name="args_student_department"
            value={formData.args_student_department}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="args_student_year">Year:</label>
          <input
            type="text"
            id="args_student_year"
            name="args_student_year"
            value={formData.args_student_year}
            onChange={handleChange}
          />
        </div>
        {/* Render these fields regardless of userEmail */}
        <div>
          <label htmlFor="args_student_email_address">Email:</label>
          <input
            type="text"
            id="args_student_email_address"
            name="args_student_email_address"
            value={formData.args_student_email_address}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="args_student_firstname">Firstname:</label>
          <input
            type="text"
            id="args_student_firstname"
            name="args_student_firstname"
            value={formData.args_student_firstname}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="args_student_surname">Surname:</label>
          <input
            type="text"
            id="args_student_surname"
            name="args_student_surname"
            value={formData.args_student_surname}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default PostStudentData;
