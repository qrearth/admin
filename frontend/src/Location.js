import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Select, MenuItem, Box, Typography, FormControl, InputLabel } from '@mui/material';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ChartDataLabels);

const Location = () => {
  const [chartData, setChartData] = useState({});
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState('');

  // Fetch data when the component mounts
  useEffect(() => {
    axios.get('http://localhost:8081/bottle')
      .then(response => {
        const data = response.data;

        // Extract unique locations
        const availableLocations = [...new Set(data.map(item => item.Location))];
        setLocations(availableLocations);

        // Set the default selected location
        if (availableLocations.length > 0) {
          setSelectedLocation(availableLocations[0]);
        }
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  // Fetch data for the selected location and set chart data
  useEffect(() => {
    if (selectedLocation) {
      axios.get('http://localhost:8081/bottle')
        .then(response => {
          const data = response.data;

          // Filter data for the selected location
          const filteredData = data.find(item => item.Location === selectedLocation);

          if (filteredData) {
            // Prepare chart data
            setChartData({
              labels: ['Small', 'Medium', 'Large'],
              datasets: [
                {
                  label: `Bottle Sizes for ${selectedLocation}`,
                  data: [filteredData.Small, filteredData.Medium, filteredData.Large],
                  backgroundColor: ['#4CAF50', '#FFC107', '#00BCD4'], // New set of colors
                  borderColor: '#000000',
                  borderWidth: 1
                }
              ]
            });
          }
        })
        .catch(error => console.error('Error filtering data:', error));
    }
  }, [selectedLocation]);

  // Handle location change
  const handleLocationChange = (event) => {
    setSelectedLocation(event.target.value);
  };

  return (
    <Box sx={{ width: 600, margin: 'auto', padding: 2 }}>
      <Typography variant="h6" gutterBottom>Select Location:</Typography>
      <FormControl fullWidth variant="outlined">
        <InputLabel>Select Location</InputLabel>
        <Select
          value={selectedLocation}
          onChange={handleLocationChange}
          label="Select Location"
        >
          {locations.map(location => (
            <MenuItem key={location} value={location}>
              {location}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

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
                  text: `Bottle Sizes for ${selectedLocation}`
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

export default Location;
