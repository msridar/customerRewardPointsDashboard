import React, { useCallback, useMemo, useState } from "react";
import styles from "./TransactionTable.module.scss";
import { calculatePoints } from "../../utils/helperFunctions";
import Pagination from "../pagination/Pagination";
import Dropdown from "../fields/Dropdown";
import Autocomplete from "../fields/Autocomplete";

const itemsPerPage = 20;

const TransactionTable = ({ transactions = [] }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedMonth, setSelectedMonth] = useState("All");
  const [selectedUser, setSelectedUser] = useState("");

  const monthOptions = useMemo(
    () => [
      { value: "All", label: "All" },
      { value: "August", label: "August" },
      { value: "September", label: "September" },
      { value: "October", label: "October" },
    ],
    []
  );

  const processedTransactions = useMemo(() => {
    if (!transactions.length) return [];

    //Reversing for calculating total points (oldest -> latest)
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

    //Reverse again for display (latest -> oldest)
    return withTotals.reverse();
  }, [transactions]);

  // Filter transactions by selected month
  const filterByMonth = (data, month) => {
    if (month === "All") return data;
    return data.filter((txn) => {
      const txnMonth = new Date(txn.date).toLocaleString("default", {
        month: "long",
      });
      return txnMonth === month;
    });
  };

  const filterByUser = (filteredData) => {
    if (!selectedUser) return filteredData;
    return filteredData.filter((txn) => txn.customer.name.toLowerCase().includes(selectedUser.toLowerCase()));
  };

  const filteredTransactions = useMemo(() => {
    let data = filterByMonth(processedTransactions, selectedMonth);
    return filterByUser(data);
  }, [processedTransactions, selectedMonth, selectedUser]);

  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentTransactions = filteredTransactions.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const userOptions = useMemo(() => {
    const names = Array.from(new Set(transactions.map((t) => t.customer.name)));
    return names.map((n) => ({ value: n, label: n }));
  }, [transactions]);

  const handleMonthChange = useCallback((value) => {
    setSelectedMonth(value);
    setCurrentPage(1);
  }, []);

  const handleUserChange = useCallback((value) => {
    setSelectedUser(value);
    setCurrentPage(1);
  }, []);

  if (!processedTransactions.length) {
    return <p className={styles.noData}>No transactions found.</p>;
  }

  return (
    <div className={styles.tableContainer}>
      <div className={styles.tableHeader}>
        <Dropdown
          label="Month"
          options={monthOptions}
          value={selectedMonth}
          onChange={handleMonthChange}
        />
        <Autocomplete
          label="Customer"
          placeholder="Type at least 3 letters"
          options={userOptions}
          value={selectedUser}
          onSelect={handleUserChange}
          minChars={3}
        />
      </div>
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
