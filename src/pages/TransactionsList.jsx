import React, { useState } from "react";
import useFetchTransactions from "../hooks/useFetchTransactions";
import TransactionTable from "../components/table/TransactionTable";
import PointsSummaryTable from "../components/table/PointsSummaryTable";
import styles from "./TransactionsList.module.scss";

const TransactionsList = () => {
  const [page, setPage] = useState('transactions'); // 'transactions' or 'summary'
  const { transactions, loading, error } = useFetchTransactions();

  if (loading)
    return <div className={styles.loading}>Loading transactions...</div>;
  if (error) return <div className={styles.error}>Error: {error}</div>;

  return (
    <div className={styles.appContainer}>
      <header className={styles.header}>
        <h1>Rewards Program Dashboard</h1>
        <p>Points earned by customers for the last 3 months</p>
        <div className={styles.toggleButtons}>
          <button 
            onClick={() => setPage('transactions')}
            className={`${styles.toggleButton} ${page === 'transactions' ? styles.active : ''}`}
          >
            View Transactions
          </button>
          <button 
            onClick={() => setPage('summary')}
            className={`${styles.toggleButton} ${page === 'summary' ? styles.active : ''}`}
          >
            View Points Summary
          </button>
        </div>
      </header>

      <main className={styles.main}>
        {page === 'transactions' ? (
          <TransactionTable transactions={transactions} />
        ) : (
          <section className={styles.pointsSummary}>
            <PointsSummaryTable transactions={transactions} />
          </section>
        )}
      </main>
    </div>
  );
};

export default TransactionsList;
