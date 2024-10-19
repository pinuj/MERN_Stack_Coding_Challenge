// pages/Dashboard.js
import React, { useState } from 'react';
import TransactionsTable from '../components/TransactionTable';
import Statistics from '../components/Statistics';
import BarChartComponent from '../components/BarChart';
import PieChartComponent from '../components/PieChart';

const Dashboard = () => {
  const [month, setMonth] = useState('June');

  const handleMonthChange = (event) => {
    setMonth(event.target.value);
  };

  return (
    <div>
      <h2>Dashboard</h2>
      <label>
        Select Month: 
        <select value={month} onChange={handleMonthChange}>
          <option value="January">January</option>
          <option value="February">February</option>
          <option value="March">March</option>
          <option value="April">April</option>
          <option value="May">May</option>
          <option value="June">June</option>
          <option value="July">July</option>
          <option value="August">August</option>
          <option value="September">September</option>
          <option value="October">October</option>
          <option value="November">November</option>
          <option value="December">December</option>
        </select>
      </label>

      <TransactionsTable month={month} />
      <Statistics month={month} />
      <BarChartComponent month={month} />
      <PieChartComponent month={month} />
    </div>
  );
};

export default Dashboard;
