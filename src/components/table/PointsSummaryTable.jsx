import React, { useMemo, useState } from "react";
import styles from "./PointsSummaryTable.module.scss";
import { summarizePoints } from "../../utils/helperFunctions";
import Pagination from "../pagination/Pagination";

const months = ["August 2025", "September 2025", "October 2025"];
const itemsPerPage = 20;

const PointsSummaryTable = ({ transactions }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const summary = useMemo(() => {
    return summarizePoints(transactions);
  }, [transactions]);

  const objectsAsRowsArray = Object.values(summary);
  const totalPages = Math.ceil(objectsAsRowsArray.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentSummary = objectsAsRowsArray.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <div className={styles.container}>
      <table className={styles.table} role="table">
        <thead>
          <tr>
            <th>Customer Name</th>
            {months.map((m) => (
              <th key={m}>{m}</th>
            ))}
            <th>Total Points</th>
          </tr>
        </thead>
        <tbody>
          {currentSummary.map((row) => (
            <tr key={row.customer}>
              <td>{row.customer}</td>
              {months.map((m) => (
                <td key={m}>{row.months[m] || 0}</td>
              ))}
              <td className={styles.total}>{row.total}</td>
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

export default PointsSummaryTable;
