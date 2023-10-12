// src/BorrowedItems.js
import React, { useState, useEffect } from 'react';
import './styles/borrowed-items.css';

function booleanToYesNo(value) {
  return value ? 'Yes' : 'No';
}

function BorrowedItems() {
  const [items, setItems] = useState({
    borrow_id: [],
    time_quota: [],
    is_claimed: [],
    is_returned: [],
    pending_id: [],
  });

  useEffect(() => {
    fetch('/user/borrowed-items')
      .then((response) => response.json())
      .then((data) => {
        setItems(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div className="borrowed-items-container">
      <div className="borrowed-items-content">
        <h2 className="borrowed-items-title">Borrowed Items</h2>
        <table className="borrowed-items-table">
          <thead>
            <tr>
              <th>Borrow Id</th>
              <th>Time Quota</th>
              <th>Claimed Status</th>
              <th>Return Status</th>
              <th>Pending Id</th>
            </tr>
          </thead>
          <tbody>
            {items.borrow_id.map((borrow_id, index) => (
              <tr key={index}>
                <td>{borrow_id}</td>
                <td>{items.time_quota[index]}</td>
                <td>{booleanToYesNo(items.is_claimed[index])}</td>
                <td>{booleanToYesNo(items.is_returned[index])}</td>
                <td>{items.pending_id[index]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default BorrowedItems;
