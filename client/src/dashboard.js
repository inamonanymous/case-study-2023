// src/Dashboard.js
import React from 'react';
import { Link } from 'react-router-dom';
import './styles/dashboard.css'; // Import the CSS specific to the Dashboard component
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

function Dashboard() {
  return (
    <div className="dashboard-background">
      <div className="container">
        <h1 className="display-4">Dashboard</h1>
        <p className="lead">Welcome to the dashboard!</p>
        <div className="row">
          <div className="col-md-3">
            <Link to="/borrowed-items" className="btn btn-primary btn-block">
              Display Borrowed Equipments
            </Link>
          </div>
          <div className="col-md-3">
            <Link to="/available-items" className="btn btn-primary btn-block">
              Display Available Equipments
            </Link>
          </div>
          <div className="col-md-3">
            <Link to="/pending-items" className="btn btn-primary btn-block">
              Display Pending Equipments
            </Link>
          </div>
          <div className="col-md-3">
            <Link to="/completed-items" className="btn btn-primary btn-block">
              Display Transaction History
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
