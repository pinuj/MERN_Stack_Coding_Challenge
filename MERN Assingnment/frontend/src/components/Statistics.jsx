// components/Statistics.js
import React, { useState, useEffect } from 'react';
import { fetchStatistics } from '../utils/api';

const Statistics = ({ month }) => {
  const [statistics, setStatistics] = useState({ totalSales: 0, soldItems: 0, notSoldItems: 0 });

  useEffect(() => {
    const getStatistics = async () => {
      try {
        const data = await fetchStatistics(month);
        console.log('New statistics data:', data);
        setStatistics({
          totalSales: data.totalSaleAmount,
          soldItems: data.totalSoldItems,
          notSoldItems: data.totalNotSoldItems,
        });
      } catch (error) {
        console.error('Error fetching statistics:', error);
      }
    };

    getStatistics();
  }, [month]);

  return (
    <div style={styles.container}>
      <h3 style={styles.heading}>Statistics for {month}</h3>
      <div style={styles.statBox}>
        <p style={styles.statText}><strong>Total Sales:</strong> ${statistics.totalSales.toFixed(2)}</p>
        <p style={styles.statText}><strong>Sold Items:</strong> {statistics.soldItems}</p>
        <p style={styles.statText}><strong>Not Sold Items:</strong> {statistics.notSoldItems}</p>
      </div>
    </div>
  );
};

// Inline styles for the component
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

export default Statistics;
