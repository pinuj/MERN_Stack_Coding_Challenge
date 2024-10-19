// // components/TransactionsTable.js
// import React, { useState, useEffect } from 'react';
// import { fetchTransactions } from '../utils/api';

// const TransactionsTable = ({ month }) => {
//   const [transactions, setTransactions] = useState([]);
//   const [search, setSearch] = useState('');
//   const [page, setPage] = useState(1);

//   useEffect(() => {
//     const getTransactions = async () => {
//       const data = await fetchTransactions(month, search, page);
//       setTransactions(data.transactions);
//     };
//     getTransactions();
//   }, [month, search, page]);

//   return (
//     <div>
//       <h3>Transactions for {month}</h3>
//       <input
//         type="text"
//         value={search}
//         onChange={(e) => setSearch(e.target.value)}
//         placeholder="Search transactions"
//       />
//       <table>
//         <thead>
//           <tr>
//             <th>Title</th>
//             <th>Description</th>
//             <th>Price</th>
//             <th>Date of Sale</th>
//           </tr>
//         </thead>
//         <tbody>
//           {transactions.map((txn) => (
//             <tr key={txn._id}>
//               <td>{txn.title}</td>
//               <td>{txn.description}</td>
//               <td>{txn.price}</td>
//               <td>{new Date(txn.dateOfSale).toLocaleDateString()}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//       <button disabled={page === 1} onClick={() => setPage(page - 1)}>Previous</button>
//       <button onClick={() => setPage(page + 1)}>Next</button>
//     </div>
//   );
// };

// export default TransactionsTable;

import React, { useState, useEffect } from 'react';
import { fetchTransactions } from '../utils/api';
import '../styles/TransactionsTable.css'; // Import the CSS file

const TransactionsTable = ({ month }) => {
  const [transactions, setTransactions] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  useEffect(() => {
    const getTransactions = async () => {
      const data = await fetchTransactions(month, search, page);
      setTransactions(data.transactions);
    };
    getTransactions();
  }, [month, search, page]);

  return (
    <div className="table-container">
      <h3>Transactions for {month}</h3>
      <div className="search-bar">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search transactions"
        />
      </div>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Price</th>
            <th>Date of Sale</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((txn) => (
            <tr key={txn._id}>
              <td>{txn.title}</td>
              <td>{txn.description}</td>
              <td>{txn.price}</td>
              <td>{new Date(txn.dateOfSale).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>Previous</button>
        <button onClick={() => setPage(page + 1)}>Next</button>
      </div>
    </div>
  );
};

export default TransactionsTable;
