import React from "react";
import styles from "./Pagination.module.scss";

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const handlePrev = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  if (totalPages <= 1) return null; // no pagination needed

  return (
    <div className={styles.pagination}>
      <button
        onClick={handlePrev}
        disabled={currentPage === 1}
        className={styles.pageButton}
      >
        ← Previous
      </button>

      <span className={styles.pageInfo}>
        Page {currentPage} of {totalPages}
      </span>

      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className={styles.pageButton}
      >
        Next →
      </button>
    </div>
  );
}

export default Pagination;