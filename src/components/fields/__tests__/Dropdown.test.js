import { render, screen, fireEvent } from "@testing-library/react";
import Dropdown from "../Dropdown";

describe("Dropdown", () => {
  const mockChange = jest.fn();
  const options = [
    { value: "All", label: "All" },
    { value: "August", label: "August" },
  ];

  it("renders label and options", () => {
    render(
      <Dropdown
        label="Month:"
        options={options}
        value="All"
        onChange={mockChange}
      />
    );
    expect(screen.getByText("Month:")).toBeInTheDocument();
    expect(screen.getByDisplayValue("All")).toBeInTheDocument();
  });

  it("calls onChange when value changes", () => {
    render(
      <Dropdown
        label="Month:"
        options={options}
        value="All"
        onChange={mockChange}
      />
    );
    fireEvent.change(screen.getByRole("combobox"), {
      target: { value: "August" },
    });
    expect(mockChange).toHaveBeenCalledWith("August");
  });
});
