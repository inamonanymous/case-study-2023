import { useParams, Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import PostStudentData from './post-student';
import './styles/request-equipment.css'

function EquipmentRow({ label, value }) {
  return (
      <tr>
          <td>{label}</td>
          <td>{value}</td>
      </tr>
  );
}

function RequestEquipment() {
  // Get the equip_id parameter from the URL
  const { equip_unique_key } = useParams(); // Use the correct parameter name here
  const [items, setItems] = useState({
    equip_id: null,
    equip_type: null,
    equip_unique_key: null,
    is_available: null,
    is_pending: null,
  });

  useEffect(() => {
    // Fetch data from the '/request-equipment/:equip_id' route
    fetch(`http://127.0.0.1:5000/user/equipments/${equip_unique_key}`)
      .then((response) => response.json())
      .then((data) => {
        // Update the state with the fetched data
        setItems(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [equip_unique_key]);

  return (
      <div className="request-equipment">
          {items.equip_id !== null ? (
              <div className="equipment-details">
                  <h2>Equipment Details</h2>
                  <table>
                      <tbody>
                          <EquipmentRow label="Equipment ID:" value={items.equip_id} />
                          <EquipmentRow label="Equipment Type:" value={items.equip_type} />
                          <EquipmentRow label="Unique Key:" value={items.equip_unique_key} />
                          <EquipmentRow label="Available:" value={items.is_available ? 'Yes' : 'No'} />
                          <EquipmentRow label="Pending:" value={items.is_pending ? 'Yes' : 'No'} />
                      </tbody>
                  </table>
                  <div className="student-data-form">
                      <h3>Submit Student Information</h3>
                      <PostStudentData args_requested_item={items.equip_unique_key} />
                  </div>
              </div>
          ) : (
              <p>Loading...</p>
          )}
          <div>
            
          </div>
      </div>
  );
}

export default RequestEquipment;
