import { calculatePoints, summarizePoints } from "../helperFunctions";

describe("calculatePoints", () => {
  it("returns 0 for purchases <= 50", () => {
    expect(calculatePoints(40)).toBe(0);
    expect(calculatePoints(50)).toBe(0);
  });

  it("returns 1 point per dollar between 50 - 100", () => {
    expect(calculatePoints(70)).toBe(20);
    expect(calculatePoints(100)).toBe(50);
  });

  it("returns 2 points per dollar over 100 + 50 points for 50 - 100 tier", () => {
    expect(calculatePoints(120)).toBe(90);
    expect(calculatePoints(200)).toBe(250);
  });
});

describe("summarizePoints", () => {
  const mockTxns = [
    {
      amount: 120,
      date: "2025-08-10T00:00:00Z",
      customer: { name: "Mason Thomas" },
    },
    {
      amount: 200,
      date: "2025-08-15T00:00:00Z",
      customer: { name: "Mason Thomas" },
    },
    {
      amount: 90,
      date: "2025-09-05T00:00:00Z",
      customer: { name: "Mason Thomas" },
    },
    {
      amount: 150,
      date: "2025-09-10T00:00:00Z",
      customer: { name: "Lucas Perez" },
    },
  ];

  it("groups by customer + month and sums correctly", () => {
    const result = summarizePoints(mockTxns);
    expect(result["Mason Thomas"]).toBeDefined();
    expect(result["Lucas Perez"]).toBeDefined();

    expect(result["Mason Thomas"].months["August 2025"]).toBeCloseTo(340.0, 2);
    expect(result["Lucas Perez"].months["September 2025"]).toBeCloseTo(150.0, 2);

    expect(result["Mason Thomas"].total).toBeCloseTo(380.0, 2);
  });
});