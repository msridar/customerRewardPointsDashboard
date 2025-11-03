import { fetchTransactions } from "../transactions";

describe("fetchTransactions", () => {
  beforeEach(() => {
    globalThis.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            transactions: [
              { id: "txn_001", amount: 100 },
              { id: "txn_002", amount: 250 },
            ],
          }),
      })
    );
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("fetches and returns data", async () => {
    const data = await fetchTransactions();
    expect(globalThis.fetch).toHaveBeenCalledWith("/mocks/transactions_aug_oct_2025.json");
    expect(data).toHaveLength(2);
  });
});