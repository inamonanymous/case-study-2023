// src/CompletedItems.js
import React, { useState, useEffect } from 'react';
import './styles/completed-items.css';

function CompletedItems() {
  const [items, setItems] = useState({
    completed_id: [],
    student_department: [],
    equip_type: [],
    equip_unique_key: [],
  });

  function capitalize(str){
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  useEffect(() => {
    fetch('http://127.0.0.1:5000/user/completed-items')
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setItems(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div className="completed-items-container">
      <div className="completed-items-content">
        <h2 className="completed-items-title">Transaction History</h2>
        <table className="completed-items-table">
          <thead>
            <tr>
              <th>Student Department</th>
              <th>Equipment Type</th>
              <th>Equipment Unique Key</th>
            </tr>
          </thead>
          <tbody>
            {items.completed_id.map((completed_id, index) => (
              <tr key={index}>
                <td>{items.student_department[index]}</td>
                <td>{capitalize(items.equip_type[index])}</td>
                <td>{items.equip_unique_key[index]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CompletedItems;
