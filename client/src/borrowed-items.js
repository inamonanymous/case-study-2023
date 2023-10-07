import React, { useState, useEffect } from 'react';
import './styles/borrowed-items.css'; // Include the CSS file for this component

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
        // Update the state with the fetched data
        setItems(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div className="borrowed-items-background"> {/* Apply a custom class for styling */}
      <div className="background-image full-screen"> {/* Apply full-screen class */}
        <div className="container d-flex justify-content-center align-items-center h-100"> {/* Center content vertically and horizontally */}
          <div>
            <h2 className="text-center">Borrowed Items</h2>
            <table className="custom-table">
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
      </div>
    </div>

  );
}

export default BorrowedItems;
