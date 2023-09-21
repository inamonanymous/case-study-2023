// src/Dashboard.js
import React from 'react';
import { Link } from 'react-router-dom';

function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome to the dashboard!</p>
      <div>
        <Link to="/borrowed-items">
          <button>Display borrowed equipments</button>
        </Link>
        <Link to="/available-items">
          <button>Display Availabe equipments</button>
        </Link>
        <Link to="/pending-items">
          <button>Display Pending equipments</button>
        </Link>
      </div>
    </div>
  );
}

export default Dashboard;
