// src/AvailableItems.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './styles/available-items.css';

function booleanToYesNo(value) {
  return value ? 'Yes' : 'No';
}

function AvailableItems() {
  const [items, setItems] = useState({ equip_id: [], equip_type: [], equip_unique_key: [], is_available: [], is_pending: [] });

  useEffect(() => {
    fetch('/user/equipments/all')
      .then((response) => response.json())
      .then((data) => {
        setItems(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div className="available-items-container">
      <div className="available-items-content">
        <h2 className="available-items-title">Equipments</h2>
        <table className="available-items-table">
          <thead>
            <tr>
              <th>Type</th>
              <th>Unique Key</th>
              <th>Pending</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {items.equip_unique_key.map((unique_key, index) => (
              <tr key={index}>
                <td>{items.equip_type[index]}</td>
                <td>{unique_key}</td>
                <td>{booleanToYesNo(items.is_pending[index])}</td>
                <td>
                  {items.is_available[index] ? (
                    <Link to={`/request-equipment/${items.equip_unique_key[index]}`}>
                      <button className="btn btn-primary">Borrow</button>
                    </Link>
                  ) : (
                    <p>Not Available</p>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AvailableItems;
