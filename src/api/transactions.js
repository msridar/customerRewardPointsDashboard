export const fetchTransactions = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      fetch("/mocks/transactions_aug_oct_2025.json")
        .then((res) => {
          if (!res.ok) throw new Error("Failed to fetch transactions");
          return res.json();
        })
        .then((data) => resolve(data.transactions))
        .catch((err) => reject(err));
    }, 1000); // simulate API delay
  });
};