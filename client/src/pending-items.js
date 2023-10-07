import React, { useState, useEffect } from 'react';
import './styles/pending-items.css'; // Include the same CSS file used for the BorrowedItems component

function booleanToYesNo(value) {
  return value ? 'Yes' : 'No';
}

function PendingItems() {
  const [items, setItems] = useState({
    pending_id: [],
    equip_type: [],
    student_name: [],
    student_number: [],
    equip_unique_key: [],
    is_verified: [],
  });

  useEffect(() => {
    fetch('/user/pending-items')
      .then((response) => response.json())
      .then((data) => {
        setItems(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div className="pending-items-background"> {/* Apply a custom class for styling */}
      <div className="background-image full-screen"> {/* Apply full-screen class */}
        <div className="container d-flex justify-content-center align-items-center h-100"> {/* Center content vertically and horizontally */}
          <div>
            <h2 className="text-center">Pending Items</h2>
            <table className="custom-table">
              <thead>
                <tr>
                  <th>Pending Id</th>
                  <th>Type</th>
                  <th>Unique Key</th>
                  <th>Student Number</th>
                  <th>Student Name</th>
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
        </div>
      </div>
    </div>
  );
}

export default PendingItems;
