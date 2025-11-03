export const calculatePoints = (amount) => {
  if (amount <= 50) return 0;
  if (amount <= 100) return amount - 50;
  return (amount - 100) * 2 + 50;
};

export const summarizePoints = (transactions) => {
  const summary = {};
  transactions.forEach((txn) => {
    const { name } = txn.customer;
    const date = new Date(txn.date);
    const month = date.toLocaleString("default", { month: "long" });
    const year = date.getFullYear();
    const monthKey = `${month} ${year}`;
    const points = calculatePoints(txn.amount);

    if (!summary[name]) {
      summary[name] = { customer: name, months: {}, total: 0 };
    }
    summary[name].months[monthKey] =
      (summary[name].months[monthKey] || 0) + points;
    summary[name].total += points;
  });

  // Round each month’s points and total to 2 decimals
  Object.values(summary).forEach((customer) => {
    Object.keys(customer.months).forEach((m) => {
      customer.months[m] = parseFloat(customer.months[m].toFixed(2));
    });
    customer.total = parseFloat(customer.total.toFixed(2));
  });

  return summary;
};
