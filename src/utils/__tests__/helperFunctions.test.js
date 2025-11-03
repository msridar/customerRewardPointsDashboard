import { calculatePoints } from "../helperFunctions";

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
