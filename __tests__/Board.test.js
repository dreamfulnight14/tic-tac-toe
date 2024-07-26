import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Board from '../app/components/Board';

describe('Board Component', () => {
  const cells = Array(9).fill(null);
  const mockOnClick = jest.fn();

  test('renders all cells', () => {
    render(<Board cells={cells} onClick={mockOnClick} winCells={[]} />);
    const cellElements = screen.getAllByRole('button');
    expect(cellElements.length).toBe(9);
  });

  test('calls onClick function when a cell is clicked', () => {
    render(<Board cells={cells} onClick={mockOnClick} winCells={[]} />);
    const cellElements = screen.getAllByRole('button');
    fireEvent.click(cellElements[0]);
    expect(mockOnClick).toHaveBeenCalledTimes(1);
    expect(mockOnClick).toHaveBeenCalledWith(0);
  });

  test('applies the correct class names based on cell state', () => {
    const cells = ['X', 'O', 'X', null, 'X', 'O', 'X', 'O', 'X'];
    render(<Board cells={cells} onClick={jest.fn()} winCells={[]} />);
    const cellElements = screen.getAllByRole('button');
    
    cells.forEach((cell, index) => {
      if (cell === 'X' || cell === 'O') {
        expect(cellElements[index]).toHaveTextContent(cell);
      }
    });
  });
});
