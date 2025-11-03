import { render, screen, fireEvent } from "@testing-library/react";
import Pagination from "../Pagination";

describe("Pagination", () => {
  const mockPageChange = jest.fn();

  it("renders and navigates pages", () => {
    render(<Pagination currentPage={1} totalPages={3} onPageChange={mockPageChange} />);
    expect(screen.getByText(/Page 1 of 3/)).toBeInTheDocument();

    fireEvent.click(screen.getByText(/Next →/));
    expect(mockPageChange).toHaveBeenCalledWith(2);
  });
});
