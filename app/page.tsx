"use client";
import { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import Board from "./components/Board";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const Label = styled.label`
  display: flex;
  align-items: center;
  font-size: 16px;
  margin: 20px 0;
  gap: 6px;
`;

const Button = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 16px;
`;

const messageFadeIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

const Message = styled.p<{ type: "win" | "draw" }>`
  font-size: 24px;
  color: ${({ type }) => (type === "win" ? "green" : "red")};
  animation: ${messageFadeIn} 0.5s ease;
`;

const checkWinner = (cells: Array<string | null>) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
      return { winner: cells[a], line: lines[i] };
    }
  }
  return { winner: null, line: [] };
};

const getRandomMove = (cells: Array<string | null>) => {
  const emptyCells = cells
    .map((cell, i) => (cell ? null : i))
    .filter((i) => i !== null);
  return emptyCells[Math.floor(Math.random() * emptyCells.length)];
};

export default function Home() {
  const [cells, setCells] = useState<Array<string | null>>(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [isAiMode, setIsAiMode] = useState(false);
  const { winner, line } = checkWinner(cells);

  useEffect(() => {
    if (isAiMode && !xIsNext && !winner) {
      const aiMove = getRandomMove(cells);
      if (aiMove !== null) {
        const newCells = cells.slice();
        newCells[aiMove] = "O";
        setCells(newCells);
        setXIsNext(true);
      }
    }
  }, [cells, isAiMode, xIsNext, winner]);

  const handleClick = (i: number) => {
    if (cells[i] || winner) return;

    const newCells = cells.slice();
    newCells[i] = xIsNext ? "X" : "O";
    setCells(newCells);
    setXIsNext(!xIsNext);
  };
  
  const resetGame = () => {
    setCells(Array(9).fill(null));
    setXIsNext(true);
  };

  const handleAiModeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsAiMode(event.target.checked);
  };

  return (
    <Container>
      <Label>
        <input
          type="checkbox"
          checked={isAiMode}
          onChange={handleAiModeChange}
        />
        Play against AI
      </Label>
      <Board cells={cells} onClick={handleClick} winCells={line} />
      {winner ? (
        <Message type="win">{`Winner: ${winner}`}</Message>
      ) : cells.every(Boolean) ? (
        <Message type="draw">Draw!</Message>
      ) : (
        <p>{`Next Player: ${xIsNext ? "X" : "O"}`}</p>
      )}
      <Button onClick={resetGame} data-testid="reset-button">
        Reset
      </Button>
    </Container>
  );
}
