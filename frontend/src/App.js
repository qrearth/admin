import React from 'react';
import './App.css';
import UsersChart from './UsersChart';
import Location from './Location';

function App() {
  return (
    <div className="App">
      <h1>QEarth Admin Dashboard</h1>
      <div className="charts-container">
        <UsersChart />
        <Location />
      </div>
    </div>
  );
}

export default App;
