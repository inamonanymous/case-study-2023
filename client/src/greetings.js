import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Dashboard() {


  return (
    <div>
      <h1>Welcome to the website</h1>

      <Link to="/dashboard">
        <button>Dashboard</button>
      </Link>
    </div>
  );
}

export default Dashboard;
