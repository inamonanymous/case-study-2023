import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import PostStudentData from './post-student';

function RequestEquipment() {
  // Get the equip_id parameter from the URL
  const { equip_id } = useParams(); // Use the correct parameter name here
  const [items, setItems] = useState({
    equip_id: null,
    equip_type: null,
    equip_unique_key: null,
    is_available: null,
    is_pending: null,
  });

  useEffect(() => {
    // Fetch data from the '/request-equipment/:equip_id' route
    fetch(`/user/equipments/${equip_id}`)
      .then((response) => response.json())
      .then((data) => {
        // Update the state with the fetched data
        setItems(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [equip_id]);

  return (
    <div>
      {items.equip_id !== null ? ( // Check if the data has been fetched
        <div>
          <p><b>Equipment Details</b></p>
          <p>Equipment ID: {items.equip_id}</p>
          <p>Equipment Type: {items.equip_type}</p>
          <p>Unique Key: {items.equip_unique_key}</p>
          <p>Available: {items.is_available ? 'Yes' : 'No'}</p>
          <p>Pending: {items.is_pending ? 'Yes' : 'No'}</p>

          <div>
            <PostStudentData />
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default RequestEquipment;
