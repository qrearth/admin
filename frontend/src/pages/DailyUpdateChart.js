import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Box, Typography, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const DailyUpdateChart = () => {
  const [data, setData] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedUser, setSelectedUser] = useState('');
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    axios.get('http://localhost:8081/daily_update')
      .then(response => {
        setData(response.data);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  
  const uniqueDates = [...new Set(data.map(item => item.Date))];


  const handleDateChange = (event) => {
    const date = event.target.value;
    setSelectedDate(date);
    setSelectedUser(''); 
  };

  
  const usersForSelectedDate = data.filter(item => item.Date === selectedDate).map(item => item.User);

  
  const handleUserChange = (event) => {
    const user = event.target.value;
    setSelectedUser(user);

    
    const userData = data.filter(item => item.Date === selectedDate && item.User === user);
    

    const locations = userData.map(item => item.Location);
    const bottles = userData.map(item => item.Bottle);

   
    setChartData({
      labels: locations,
      datasets: [
        {
          label: `Bottles for ${user} on ${selectedDate}`,
          data: bottles,
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
          borderColor: '#000000',
          borderWidth: 1
        }
      ]
    });
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>Daily User Data</Typography>

     
      <FormControl fullWidth sx={{ marginBottom: 2 }}>
        <InputLabel>Select Date</InputLabel>
        <Select
          value={selectedDate}
          onChange={handleDateChange}
          label="Select Date"
        >
          {uniqueDates.map(date => (
            <MenuItem key={date} value={date}>{date}</MenuItem>
          ))}
        </Select>
      </FormControl>

    
      {selectedDate && (
        <FormControl fullWidth sx={{ marginBottom: 2 }}>
          <InputLabel>Select User</InputLabel>
          <Select
            value={selectedUser}
            onChange={handleUserChange}
            label="Select User"
          >
            {usersForSelectedDate.map(user => (
              <MenuItem key={user} value={user}>{user}</MenuItem>
            ))}
          </Select>
        </FormControl>
      )}

    
      {selectedUser && chartData.labels && (
        <Box sx={{ marginTop: 3 }}>
          <Bar
            data={chartData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  display: true,
                  position: 'top'
                },
                title: {
                  display: true,
                  text: `Bottle Data for ${selectedUser} on ${selectedDate}`
                }
              },
              scales: {
                x: {
                  beginAtZero: true
                },
                y: {
                  beginAtZero: true
                }
              }
            }}
          />
        </Box>
      )}
    </Box>
  );
};

export default DailyUpdateChart;
