import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './components/Home';
import Gallery2 from './components/Gallery';
import PhotoDetail from './components/PhotoDetail';
import './CSS/Navbar.css';
import './CSS/style.css';

const Navbar = () => {
  return (
    <nav className="navbar-container">
      <div>
        <h3>MSVAV's Click's</h3>
      </div>
      <ul className="nav-links">
        <li>
          <Link to="/"> Home </Link>
        </li>
        <li>
          <Link to="/gallery"> Gallery </Link>
        </li>
      </ul>
    </nav>
  );
};

const App = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/gallery" element={<Gallery2 />} />
          <Route path="/photo/:id" element={<PhotoDetail />} />
        </Routes>
        <footer>
          <div className='footer'>
            <p>© 2025 MSVAV's Click's</p>
          </div>
        </footer>
      </div>
    </Router>
  );
};

export default App;
