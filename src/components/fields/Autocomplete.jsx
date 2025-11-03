import React, { useState, useMemo, useEffect } from "react";
import styles from "./Autocomplete.module.scss";

const Autocomplete = React.memo(function Autocomplete({
  label,
  placeholder = "Search...",
  options = [],
  value,
  onSelect,
  minChars = 3,
  className = "",
}) {
  const [query, setQuery] = useState("");
  const [showList, setShowList] = useState(false);
    console.log("Autocomplete rendered");
  useEffect(() => {
    if (value === "") setQuery("");
  }, [value]);

  const filteredOptions = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (q.length < minChars) return [];
    return options.filter(
      (opt) =>
        opt.label.toLowerCase().includes(q) ||
        opt.value.toLowerCase().includes(q)
    );
  }, [options, query, minChars]);

  const handleSelect = (selectedValue) => {
    setQuery(selectedValue);
    setShowList(false);
    onSelect(selectedValue);
  };

  const handleChange = (e) => {
    const val = e.target.value;
    setQuery(val);
    setShowList(true);
    onSelect(val);
  };

  const handleClear = () => {
    setQuery("");
    setShowList(false);
    onSelect("");
  };

  return (
    <div className={`${styles.autocompleteContainer} ${className}`}>
      {label && <label className={styles.autocompleteLabel}>{label}</label>}

      <div className={styles.autocompleteInputWrapper}>
        <div className={styles.autocompleteInputContainer}>
          <input
            type="text"
            value={query}
            placeholder={placeholder}
            onFocus={() => setShowList(true)}
            onBlur={() => setTimeout(() => setShowList(false), 150)}
            onChange={handleChange}
            className={styles.autocompleteInput}
          />

          {showList && filteredOptions.length > 0 && (
            <ul className={styles.autocompleteList}>
              {filteredOptions.map((opt) => (
                <li
                  key={opt.value}
                  onClick={() => handleSelect(opt.value)}
                  className={styles.autocompleteItem}
                >
                  {opt.label}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className={styles.autocompleteCancelAction}>
          {query && (
            <button
              type="button"
              className={styles.clearButton}
              onClick={handleClear}
            >
              ×
            </button>
          )}
        </div>
      </div>

      {showList && query.length >= minChars && filteredOptions.length === 0 && (
        <div className={styles.noResults}>No matches found.</div>
      )}
    </div>
  );
});

export default Autocomplete;
