import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Home from "../app/page";

// Mock Board component
jest.mock("../app/components/Board", () => ({ cells, onClick }) => (
  <div>
    {cells.map((cell, index) => (
      <button
        key={index}
        onClick={() => onClick(index)}
        data-testid={`cell-${index}`}
      >
        {cell}
      </button>
    ))}
  </div>
));

describe("Home component", () => {
  test("renders initial state correctly", () => {
    render(<Home />);
    expect(screen.getByText(/Next Player: X/i)).toBeInTheDocument();
    expect(screen.getByText(/Reset/i)).toBeInTheDocument();
    for (let i = 0; i < 9; i++) {
      expect(screen.getByTestId(`cell-${i}`)).toBeInTheDocument();
      expect(screen.getByTestId(`cell-${i}`)).toHaveTextContent("");
    }
  });

  test("handles player move and AI move", () => {
    render(<Home />);
    const firstCell = screen.getByTestId("cell-0");

    fireEvent.click(firstCell);
    expect(firstCell).toHaveTextContent("X");

    setTimeout(() => {
      // Since AI move is random, we just need to check that an 'O' is placed in one of the empty cells
      const aiMoveCell = Array.from({ length: 9 }, (_, i) =>
        screen.getByTestId(`cell-${i}`)
      ).filter((cell) => cell.textContent === "O")[0];
      expect(aiMoveCell).toHaveTextContent("O");
    }, 100);
  });

  test("handles game reset", () => {
    render(<Home />);

    // Simulate a move
    fireEvent.click(screen.getByTestId("cell-0")); // X
    fireEvent.click(screen.getByTestId("reset-button")); // Reset game

    for (let i = 0; i < 9; i++) {
      expect(screen.getByTestId(`cell-${i}`)).toHaveTextContent("");
    }
    expect(screen.getByText(/Next Player: X/i)).toBeInTheDocument();
  });

  test("displays winner message", () => {
    render(<Home />);

    // Simulate moves to make 'X' win
    fireEvent.click(screen.getByTestId("cell-0")); // X
    fireEvent.click(screen.getByTestId("cell-1")); // AI O
    fireEvent.click(screen.getByTestId("cell-4")); // X
    fireEvent.click(screen.getByTestId("cell-2")); // AI O
    fireEvent.click(screen.getByTestId("cell-8")); // X (winning move)

    expect(screen.getByText(/Winner: X/i)).toBeInTheDocument();
  });
});
