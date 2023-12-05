import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './styles/available-items.css';

function booleanToYesNo(value) {
  return value ? 'Yes' : 'No';
}
function capitalize(str){
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function AvailableItems() {
  const [items, setItems] = useState({ equip_id: [], equip_type: [], equip_unique_key: [], is_available: [], is_pending: [] });
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:5000/user/equipments/all?search=${searchQuery}`);
        const data = await response.json();
        setItems(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [searchQuery]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    console.log("Search Query:", event.target.value);
  };

  return (
    <div className="available-items-container">
      <div className="available-items-content">
        <h2 className="available-items-title">Equipments</h2>
        <input 
          type="text"
          placeholder="Search Equipments"
          value={searchQuery}
          onChange={handleSearchChange}
          className="search-input"
        />
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
                <td>{capitalize(items.equip_type[index])}</td>
                <td>{capitalize(unique_key)}</td>
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
  );
}

export default AvailableItems;
