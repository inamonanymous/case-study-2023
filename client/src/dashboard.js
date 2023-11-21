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
    return selectedContent ? contentComponents[selectedContent] : <div></div>;
  };

  const buttons = [
    { label: 'Borrowed Equipment', content: 'borrowed-items' },
    { label: 'Available Equipment', content: 'available-items' },
    { label: 'Pending Equipment', content: 'pending-items' },
    { label: 'Transaction History', content: 'completed-items' },
  ];

  return (
    <div className="dashboard-container">
      <div className="dashboard-content">
        <h1 className="display-title">Digital Sports Equipment Monitoring System</h1>
        <p className="lead">Empower athletes, coaches, and sports enthusiasts with cutting-edge technology. Track, analyze, and optimize your sporting experience like never before. Enhance performance, prevent injuries, and revolutionize the way you engage with sports equipment. Your journey to peak performance starts here.</p>
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
