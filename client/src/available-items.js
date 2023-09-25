import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';


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
      <div>
        <h2>Available Items</h2>
        <table>
          <thead>
            <tr>
              <th>Type</th>
              <th>Unique</th>
              <th>Available</th>
              <th>Pending</th>
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
                    <Link to={`/request-equipment/${items.equip_id[index]}`}>
                      <button>Borrow</button>
                    </Link>
                    </td>
                </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

export default AvailableItems;
