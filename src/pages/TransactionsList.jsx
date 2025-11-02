import React from "react";
import useFetchTransactions from "../hooks/useFetchTransactions";
import TransactionTable from "../components/table/TransactionTable";
import styles from "./TransactionsList.module.scss";

const TransactionsList = () => {
  const { transactions, loading, error } = useFetchTransactions();

  if (loading)
    return <div className={styles.loading}>Loading transactions...</div>;
  if (error) return <div className={styles.error}>Error: {error}</div>;

  return (
    <div className={styles.appContainer}>
      <header className={styles.header}>
        <h1>Rewards Program Dashboard</h1>
        <p>Points earned by customers for the last 3 months</p>
      </header>

      <main className={styles.main}>
        <TransactionTable  transactions={transactions} />
      </main>
    </div>
  );
};

export default TransactionsList;
