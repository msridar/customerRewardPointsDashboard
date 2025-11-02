import React, { useMemo, useState } from "react";
import styles from "./TransactionTable.module.scss";
import { calculatePoints } from "../../utils/helperFunctions";
import Pagination from "../pagination/Pagination";

const itemsPerPage = 20;

const TransactionTable = ({ transactions = [] }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const processedTransactions = useMemo(() => {
    if (!transactions.length) return [];
    const ascending = transactions.reverse();

    const customerTotals = {};

    const withTotals = ascending.map((txn) => {
      const name = txn.customer.name;
      const points = calculatePoints(txn.amount);

      if (!customerTotals[name]) {
        customerTotals[name] = 0;
      }

      customerTotals[name] += points;

      return {
        ...txn,
        points,
        runningTotal: customerTotals[name],
      };
    });

    // 3️⃣ Reverse again for display (latest → oldest)
    return withTotals.reverse();
  }, [transactions]);

  const totalPages = Math.ceil(processedTransactions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentTransactions = processedTransactions.slice(
    startIndex,
    startIndex + itemsPerPage
  );


  if (!processedTransactions.length) {
    return <p className={styles.noData}>No transactions found.</p>;
  }

  return (
    <div className={styles.tableContainer}>
      <table className={styles.transactionTable}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Customer</th>
            <th>Transaction Date</th>
            <th>Purchase Amount ($)</th>
            <th>Points Earned</th>
            <th>Total Points</th>
          </tr>
        </thead>
        <tbody>
          {currentTransactions.map((txn) => (
            <tr key={txn.id}>
              <td>{txn.id}</td>
              <td>{txn.customer.name}</td>
              <td>
                {new Date(txn.date).toLocaleString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                })}
              </td>
              <td className={styles.amountCell}>{txn.amount.toFixed(2)}</td>
              <td>{txn.points.toFixed(2)}</td>
              <td className={styles.totalPoints}>
                {txn.runningTotal.toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default TransactionTable;
