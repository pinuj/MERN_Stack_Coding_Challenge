// components/PieChart.js
import React, { useState, useEffect } from 'react';
import { fetchPieChart } from '../utils/api';
import { PieChart, Pie, Tooltip, ResponsiveContainer } from 'recharts';

const PieChartComponent = ({ month }) => {
  const [pieData, setPieData] = useState([]);

  useEffect(() => {
    const getPieChart = async () => {
      try {
        const data = await fetchPieChart(month);
        // Map the data to the format required by Recharts
        const formattedData = data.map(item => ({
          name: item._id, // Label for the pie chart slice
          value: item.count // Value for the pie chart slice
        }));
        setPieData(formattedData);
      } catch (error) {
        console.error('Error fetching pie chart data:', error);
      }
    };
    getPieChart();
  }, [month]);

  return (
    <div>
      <h3 style={styles.heading}>Paichat {month}</h3>
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie dataKey="value" data={pieData} fill="#82ca9d" label />
        <Tooltip />
      </PieChart>
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
export default PieChartComponent;
