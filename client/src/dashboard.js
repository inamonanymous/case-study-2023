// src/Dashboard.js
import React, { useState } from 'react';
import BorrowedItems from './borrowed-items';
import AvailableItems from './available-items';
import PendingItems from './pending-items';
import CompletedItems from './completed-items';
import './styles/dashboard.css';

function Dashboard() {
  const [selectedContent, setSelectedContent] = useState(null);

  const contentComponents = {
    'borrowed-items': <BorrowedItems />,
    'available-items': <AvailableItems />,
    'pending-items': <PendingItems />,
    'completed-items': <CompletedItems />,
  };

  const renderContent = () => {
    return selectedContent ? contentComponents[selectedContent] : <div>Welcome to the dashboard!</div>;
  };

  const buttons = [
    { label: 'Display Borrowed Equipments', content: 'borrowed-items' },
    { label: 'Display All Equipments', content: 'available-items' },
    { label: 'Display Pending Equipments', content: 'pending-items' },
    { label: 'Display Transaction History', content: 'completed-items' },
  ];

  return (
    <div className="dashboard-container">
      <div className="dashboard-content">
        <h1 className="display-4">Dashboard</h1>
        <p className="lead">Welcome to the dashboard!</p>
        <div className="buttons">
          {buttons.map((button, index) => (
            <button
              key={index}
              className="btn"
              onClick={() => setSelectedContent(button.content)}
            >
              {button.label}
            </button>
          ))}
        </div>
      </div>
      <div className="content-container">
        {renderContent()}
      </div>
    </div>
  );
}

export default Dashboard;
