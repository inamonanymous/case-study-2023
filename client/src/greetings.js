import React from 'react';
import { Link } from 'react-router-dom';

function Dashboard() {
  return (
    <div>
      <h1>Welcome to website</h1>
      <div>
        <Link to="/dashboard">
          <button>Continue</button>
        </Link>
      </div>
    </div>
  );
}

export default Dashboard;
