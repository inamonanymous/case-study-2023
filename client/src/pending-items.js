// SharedComponent.js
import React, { useState, useEffect } from 'react';

function PendingItems() {
  const [items, setItems] = useState({
    pending_id: [],
    equip_type: [],
    student_name: [],
    student_number: [],
    
    equip_unique_key: [],
    is_verified: []
  })

  useEffect(() => {
    fetch('/user/pending-items').then(
      (response) => response.json()
    ).then((data) => {
      setItems(data)
    }).catch((error) => {
      console.error('Error fetching data:', error);
    });
  }, []
  );


  return (
    <div>
      <h2>Pending Items</h2>
      <table>
          <thead>
            <tr>
              <th>Pending Id</th>
              <th>Type</th>
              <th>Unique key</th>
              <th>Student number</th>
              <th>Student name</th>
              <th>Verified</th>
            </tr>
          </thead>
          <tbody>
            {items.equip_unique_key.map((unique_key, index) => (
                <tr key={index}>
                    
                    <td>{items.pending_id[index]}</td>
                    <td>{items.equip_type[index]}</td>
                    <td>{unique_key}</td>
                    <td>{items.student_number[index]}</td>

                    <td>{items.student_name[index]}</td>
                    
                    <td>{booleanToYesNo(items.is_verified[index])}</td>
                    
                </tr>
            ))}
          </tbody>
        </table>

    </div>
  );

  function booleanToYesNo(value) {
    return value ? 'Yes' : 'No';
  }
}

export default PendingItems;
