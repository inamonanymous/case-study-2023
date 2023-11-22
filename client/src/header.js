import React from 'react';

const Header = () => {
  return (
    <header className="bg-dark text-light p-3">
      <div className="container">
        <h1>Digital Sports Equipment Monitoring System</h1>
        <h3>Saint Vincent College of Cabuyao</h3>
        <p className="lead">Location: Mamatid, Cabuyao, Laguna</p>
        <p className="lead">BSIT 3rd Year 3A3 Project</p>
        <nav className="mt-3">
          
          {/* Add more navigation links as needed */}
        </nav>
      </div>
    </header>
  );
};

export default Header;
