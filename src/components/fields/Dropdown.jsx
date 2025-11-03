import React from "react";
import styles from "./Dropdown.module.scss";

const Dropdown = React.memo(function Dropdown({
  label,
  options = [],
  value,
  onChange,
  className = "",
}) {

  return (
    <div className={`${styles.dropdownContainer} ${className}`}>
      {label && <label className={styles.dropdownLabel}>{label}</label>}
      <select
        className={styles.dropdownSelect}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
});

export default Dropdown;
