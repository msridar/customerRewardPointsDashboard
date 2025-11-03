import { renderHook, waitFor } from "@testing-library/react";
import useFetchTransactions from "../useFetchTransactions";

beforeEach(() => {
  jest.useFakeTimers();
  globalThis.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () =>
        Promise.resolve({
          transactions: [{ id: "txn_001", amount: 100 }],
        }),
    })
  );
});

afterEach(() => {
  jest.runOnlyPendingTimers(); // clean any leftovers
  jest.useRealTimers();
  jest.resetAllMocks();
});

describe("useFetchTransactions", () => {
  it("returns transactions on success", async () => {
    const mockData = {
      transactions: [{ id: "txn_001", amount: 120 }],
    };

    globalThis.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockData,
    });

    const { result } = renderHook(() => useFetchTransactions());
    expect(result.current.loading).toBe(true);
    expect(result.current.error).toBeNull();

    jest.runAllTimers();
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.transactions).toEqual(mockData.transactions);
    expect(result.current.error).toBeNull();
  });

  it("sets error state on failure", async () => {
    globalThis.fetch.mockResolvedValueOnce({
      ok: false,
      status: 500,
      json: async () => ({}),
    });

    const { result } = renderHook(() => useFetchTransactions());

    expect(result.current.loading).toBe(true);

    jest.runAllTimers();
    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.transactions).toEqual([]);
    expect(result.current.error).toBeTruthy();
  });

  it("handles fetch throwing an exception", async () => {
    globalThis.fetch.mockRejectedValueOnce(new Error("Network error"));

    const { result } = renderHook(() => useFetchTransactions());
    
    jest.runAllTimers();
    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.error).toBe("Network error");
    expect(result.current.transactions).toEqual([]);
  });
});
