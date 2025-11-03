import "@testing-library/jest-dom";

if (typeof global === "undefined" && typeof globalThis !== "undefined") {
  window.global = globalThis;
}