import { useEffect, useState } from "react";
import { fetchTransactions } from "../api/transactions";

const useFetchTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTransactions()
      .then((data) => setTransactions(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return { transactions, loading, error };
}

export default useFetchTransactions;