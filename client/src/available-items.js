import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './styles/available-items.css';

function booleanToYesNo(value) {
  return value ? 'Yes' : 'No';
}

function AvailableItems() {
  const [items, setItems] = useState({ equip_id: [], equip_type: [], equip_unique_key: [], is_available: [], is_pending: [] });

  useEffect(() => {
    // Fetch data from the '/user/equipments/all' route
    fetch('/user/equipments/all')
      .then((response) => response.json())
      .then((data) => {
        // Update the state with the fetched data
        setItems(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div className="available-items-background">
      <div className="container h-100 d-flex justify-content-center align-items-center">
        <div className="text-center">
          <h2>Available Items</h2>
          <table className="custom-table">
            <thead>
              <tr>
                <th>Type</th>
                <th>Unique Key</th>
                <th>Available</th>
                <th>Pending</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {items.equip_unique_key.map((unique_key, index) => (
                <tr key={index}>
                  <td>{items.equip_type[index]}</td>
                  <td>{unique_key}</td>
                  <td>{booleanToYesNo(items.is_available[index])}</td>
                  <td>{booleanToYesNo(items.is_pending[index])}</td>
                  <td>
                    <Link to={`/request-equipment/${items.equip_unique_key[index]}`}>
                      <button className="btn btn-primary">Borrow</button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AvailableItems;
