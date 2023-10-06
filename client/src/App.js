// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Greeting from './greetings';
import Dashboard from './dashboard';
import BorrowedItems from './borrowed-items';
import AvailableItems from './available-items';
import PendingItems from './pending-items';
import RequestEquipment from './request-equipment';
import CompletedItems from './completed-items';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Greeting />} />
        <Route path="/dashboard" exact element={<Dashboard />} />
        <Route path="/borrowed-items" element={<BorrowedItems />} />
        <Route path="/available-items" element={<AvailableItems />} />
        <Route path="/pending-items" element={<PendingItems />} />
        <Route path="/completed-items" element={<CompletedItems />} />
        <Route path="/request-equipment/:equip_unique_key" element={<RequestEquipment />} />
      </Routes>
    </Router>
  );
}

export default App;
