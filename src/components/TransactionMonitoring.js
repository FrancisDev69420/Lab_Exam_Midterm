import React from 'react';

const TransactionMonitoring = ({ transactions }) => {
  return (
    <div>
      <h4>Transaction Monitoring</h4>
      {transactions.length === 0 ? (
        <p>No transactions found.</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>User</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx) => (
              <tr key={tx.id}>
                <td>{tx.id}</td>
                <td>{tx.user}</td>
                <td>${tx.amount.toFixed(2)}</td>
                <td>{tx.status}</td>
                <td>{new Date(tx.date).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TransactionMonitoring;
