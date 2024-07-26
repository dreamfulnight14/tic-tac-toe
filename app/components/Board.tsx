import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from {
    background-color: #FFF;
  }
  to {
    background-color: #FFF;
  }
`;

const highlightWin = keyframes`
  0% {
    background-color: #d4edda;
  }
  50% {
    background-color: #a5d6a7;
  }
  100% {
    background-color: #d4edda;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 100px);
  grid-template-rows: repeat(3, 100px);
  gap: 10px;
`;

const Cell = styled.div<{ $win: boolean }>`
  width: 100px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  border: 1px solid #000;
  cursor: pointer;
  animation: ${fadeIn} 0.5s ease;
  background-color: ${({ $win }) => ($win ? '#d4edda' : 'transparent')};
  animation: ${({ $win }) => ($win ? highlightWin : fadeIn)} 1s ease infinite;

  &:hover {
    background-color: #f0f0f0;
  }
`;

interface BoardProps {
  cells: Array<string | null>;
  onClick: (i: number) => void;
  winCells: Array<number>;
}

export default function Board({ cells, onClick, winCells }: BoardProps) {
  return (
    <Grid>
      {cells.map((cell, i) => (
        <Cell role="button" key={i} onClick={() => onClick(i)} $win={winCells.includes(i)}>
          {cell}
        </Cell>
      ))}
    </Grid>
  );
}
