// components/BarChart.js
import React, { useState, useEffect } from 'react';
import { fetchBarChart } from '../utils/api';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const BarChartComponent = ({ month }) => {
  const [barData, setBarData] = useState([]);

  useEffect(() => {
    const getBarChart = async () => {
      try {
        const data = await fetchBarChart(month);
        // Map data to a format that Recharts can understand
        const formattedData = data.map(item => ({
          priceRange: item._id,
          items: item.count,
        }));
        setBarData(formattedData);
      } catch (error) {
        console.error('Error fetching bar chart data:', error);
      }
    };
    getBarChart();
  }, [month]);

  return (
    <div>
      <h3 style={styles.heading}>Barchart {month}</h3>

    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={barData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="priceRange" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="items" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    margin: '20px 0',
    border: '1px solid #ddd',
    borderRadius: '8px',
    backgroundColor: '#f9f9f9',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    maxWidth: '400px',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  heading: {
    fontSize: '24px',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: '20px',
    color: '#333',
  },
  statBox: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  statText: {
    fontSize: '18px',
    color: '#555',
  },
};

export default BarChartComponent;
