import React, { useState, useEffect } from 'react';

function booleanToYesNo(value) {
  return value ? 'Yes' : 'No';
}

function BorrowedItems() {
    const [items, setItems] = useState({
      borrow_id: [],
      time_quota: [],
      is_returned: [],
      pending_id: []});

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
      <div>
        <h2>Borrowed Items</h2>
        <table>
          <thead>
            <tr>
              <th>Borrow Id</th>
              <th>Time Quota</th>
              <th>Return Status</th>
              <th>Pending</th>
            </tr>
          </thead>
          <tbody>
            {items.borrow_id.map((borrow_id, index) => (
                <tr key={index}>
                    <td>{borrow_id}</td>
                    <td>{items.time_quota[index]}</td>
                    <td>{items.is_returned[index]}</td>
                    <td>{items.pending_id[index]}</td>
                </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }
export default BorrowedItems;
