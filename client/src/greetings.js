import React from 'react';
import { Link } from 'react-router-dom';
import './styles/greetings.css';

function Greeting() {
  return (
    
    <div className='greetings-container'>
      <h1 className='greetings-header'>Welcome to Digital Sports Equipment Monitoring System</h1>
      <div className='button-container'>
        <Link to="/dashboard">
          <button className='dashboard-button'>Proceed to Dashboard</button>
        </Link>
      </div>
    </div>
    
  );
}

export default Greeting;
