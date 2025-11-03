import { render, screen, fireEvent, within } from "@testing-library/react";
import TransactionTable from "../TransactionTable";

const mockTransactions = [
  {
    id: "txn_005",
    amount: 180.57,
    currency: "USD",
    date: "2025-10-28T22:45:00Z",
    description: "Subscription renewal",
    customer_id: "cust_822",
    customer: {
      name: "Mason Thomas",
      email: "mason.thomas@example.com",
    },
  },
  {
    id: "txn_070",
    amount: 28.96,
    currency: "USD",
    date: "2025-10-28T21:07:38Z",
    description: "Online order",
    customer_id: "cust_916",
    customer: {
      name: "Lucas Perez",
      email: "lucas.perez@example.com",
    },
  },
];

describe("TransactionTable", () => {
  it("renders table with transactions", () => {
    render(<TransactionTable transactions={mockTransactions} />);
    expect(screen.getByText("Mason Thomas")).toBeInTheDocument();
    expect(screen.getByText("Lucas Perez")).toBeInTheDocument();
  });

  it("filters by month", () => {
    render(<TransactionTable transactions={mockTransactions} />);
    fireEvent.change(screen.getByDisplayValue("All"), {
      target: { value: "September" },
    });
    expect(screen.queryByText("Mason Thomas")).not.toBeInTheDocument();
  });

  it("filters by user name", () => {
    render(<TransactionTable transactions={mockTransactions} />);
    const input = screen.getByPlaceholderText(/Type at least 3 letters/i);
    fireEvent.change(input, { target: { value: "Mas" } });
    const table = screen.getByRole("table");
    expect(within(table).getByText("Mason Thomas")).toBeInTheDocument();
  });
});
