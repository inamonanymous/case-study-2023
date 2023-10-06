import React, { useState, useEffect } from 'react';


function CompletedItems() {
    const [items, setItems] = useState({
      completed_id: [],
      student_number: [],
      student_department: [],
      student_name: [],
      equip_type: [],
      equip_unique_key: []});

    useEffect(() => {
      
      fetch('/user/completed-items')
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
        <h2>Transaction History</h2>
        <table>
          <thead>
            <tr>
              <th>Completed Id</th>
              <th>Student Number</th>
              <th>Student Department</th>
              <th>Student Name</th>
              <th>Equipment Type</th>
              <th>Equipment Unique Key</th>
            </tr>
          </thead>
          <tbody>
            {items.completed_id.map((completed_id, index) => (
                <tr key={index}>
                    <td>{completed_id}</td>
                    <td>{items.student_number[index]}</td>
                    <td>{items.student_department[index]}</td>
                    <td>{items.student_name[index]}</td>
                    <td>{items.equip_type[index]}</td>
                    <td>{items.equip_unique_key[index]}</td>
                </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }
export default CompletedItems;
