import React, { useState, useEffect } from 'react';


function AvailableItems() {
    const [items, setItems] = useState({ name: [], isAvailable: [] });

    useEffect(() => {
      // Fetch data from the '/user/samplejson' route
      fetch('/user/samplejson')
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
              <th>Name</th>
              <th>Is Available</th>
            </tr>
          </thead>
          <tbody>
            {items.name.map((name, index) => (
                <tr key={index}>
                    <td>{name}</td>
                    <td>{items.isAvailable[index]}</td>
                </tr>
            ))}
          </tbody>
        </table>
        <p>This component is shared among multiple pages.</p>
      </div>
    );
  }

export default AvailableItems;
