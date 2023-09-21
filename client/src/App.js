// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Greeting from './greetings';
import Dashboard from './dashboard';
import BorrowedItems from './borrowed-items';
import AvailableItems from './available-items';
import PendingItems from './pending-items';

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" exact element={<Greeting />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/borrowed-items" element={<BorrowedItems />} />
      <Route path="/available-items" element={<AvailableItems />} />
      <Route path="/pending-items" element={<PendingItems />} />
      </Routes>
    </Router>
  );
}

export default App;
