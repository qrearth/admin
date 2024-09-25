import React from 'react';
import './App.css';
import UsersChart from './pages/UsersChart';
import Location from './pages/Location';
import Header from './pages/Header'; 
import DailyUpdateChart from './pages/DailyUpdateChart';

function App() {
  return (
    <div className="App">
      <Header /> 
      <div style={{ display: 'flex', justifyContent: 'center', padding: '20px', flexDirection: 'row' }}>
        <UsersChart />
        <Location />
      
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', padding: '20px', flexDirection: 'row' }}>
      <DailyUpdateChart />
    </div>
    <div/>
    
    </div>
  );
}

export default App;
