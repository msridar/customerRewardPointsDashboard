import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Autocomplete from "../Autocomplete";

describe("Autocomplete", () => {
  const mockSelect = jest.fn();
  const options = [
    { value: "Mason Thomas", label: "Mason Thomas" },
    { value: "Lucas Perez", label: "Lucas Perez" },
  ];

  it("renders input with label", () => {
    render(<Autocomplete label="User:" options={options} onSelect={mockSelect} />);
    expect(screen.getByText("User:")).toBeInTheDocument();
  });

  it("shows suggestions after typing 3 letters", async () => {
    render(<Autocomplete options={options} onSelect={mockSelect} />);
    const input = screen.getByPlaceholderText(/search/i);
    fireEvent.change(input, { target: { value: "Mas" } });
    await waitFor(() => expect(screen.getByText("Mason Thomas")).toBeInTheDocument());
  });

  it("calls onSelect when clicking suggestion", async () => {
    render(<Autocomplete options={options} onSelect={mockSelect} />);
    const input = screen.getByPlaceholderText(/search/i);
    fireEvent.change(input, { target: { value: "Mas" } });
    await waitFor(() => screen.getByText("Mason Thomas"));
    fireEvent.click(screen.getByText("Mason Thomas"));
    expect(mockSelect).toHaveBeenCalledWith("Mason Thomas");
  });
});
