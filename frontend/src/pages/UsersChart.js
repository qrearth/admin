import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Select, MenuItem, Box, Typography } from '@mui/material';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ChartDataLabels);

const UsersChart = () => {
  const [chartData, setChartData] = useState({});
  const [years, setYears] = useState([]);
  const [selectedYear, setSelectedYear] = useState('');

 
  useEffect(() => {
    axios.get('http://localhost:8081/users')
      .then(response => {
        const data = response.data;

       
        const availableYears = [...new Set(data.map(item => item.Year))];
        setYears(availableYears);

       
        if (availableYears.length > 0) {
          setSelectedYear(availableYears[0]);
        }
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

 
  useEffect(() => {
    if (selectedYear) {
      axios.get('http://localhost:8081/users')
        .then(response => {
          const data = response.data;

       
          const filteredData = data.filter(item => item.Year === selectedYear);

         
          const labels = filteredData.map(item => item.Month);
          const users = filteredData.map(item => item.Users);

          setChartData({
            labels: labels,
            datasets: [
              {
                label: `Number of Users in ${selectedYear}`,
                data: users,
                backgroundColor: [
                  '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF',
                  '#FF9F40', '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'
                ],
                borderColor: '#000000',
                borderWidth: 1
              }
            ]
          });
        })
        .catch(error => console.error('Error filtering data:', error));
    }
  }, [selectedYear]);

 
  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  return (
    <Box sx={{ width: 600, margin: 'auto', padding: 2 }}>
      <Typography variant="h6" gutterBottom>Select Year:</Typography>
      <Select
        value={selectedYear}
        onChange={handleYearChange}
        fullWidth
        variant="outlined"
      >
        {years.map(year => (
          <MenuItem key={year} value={year}>
            {year}
          </MenuItem>
        ))}
      </Select>

      {chartData.labels && (
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
                  text: `User Growth in ${selectedYear}`
                },
                datalabels: {
                  color: '#000000',
                  anchor: 'end',
                  align: 'top',
                  formatter: (value) => value
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

export default UsersChart;
