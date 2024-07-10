import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './Routes.js';
import './App.css';

const App = () => {
  return (
    <Router>
        <AppRoutes />
          <p>&copy; 2024 Your Company</p>
    </Router>
  );
};

export default App;