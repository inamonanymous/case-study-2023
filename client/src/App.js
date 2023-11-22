// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Greeting from './greetings';
import Dashboard from './dashboard';
import RequestEquipment from './request-equipment';
import Header from './header.js';
import Footer from './footer.js';


function App() {
  return (
    <div>
    <Header />
      <Router>
        <Routes>
          <Route path="/" exact element={<Greeting />} />
          <Route path="/dashboard" exact element={<Dashboard />} />
          <Route path="/request-equipment/:equip_unique_key" element={<RequestEquipment />} />
        </Routes>
      </Router>
    <Footer />
    </div>
  );
}

export default App;
