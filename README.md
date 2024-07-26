# Tic Tac Toe Application

This is a simple Tic Tac Toe application built using Next.js with client-side rendering (CSR). The application allows two players to play against each other or one player to play against a simple AI. The application includes essential unit tests to ensure its functionality.

## Features

- 3x3 Tic Tac Toe grid.
- Players can mark cells with "X" or "O".
- Alternates turns between two players or a player and AI.
- Detects win or draw conditions and displays an appropriate message.
- "Reset" button to start a new game.
- Toggle AI mode on or off.
- Animations for better user experience.

## Technologies Used

- **Next.js**: Framework for building the application.
- **React**: Library for building UI components.
- **Styled-components**: For styling the components.
- **TypeScript**: For type safety.
- **Jest and React Testing Library**: For unit testing.

## Getting Started

### Prerequisites

- Node.js
- npm

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/tic-tac-toe-app.git
   cd tic-tac-toe-app
   ```
2. Install the dependencies:
   ```bash
   npm install
   ```

### Running the Application

1. Start the development server:
   ```bash
   npm run dev
   ```
2. Open your browser and navigate to http://localhost:3000.

### Running the Tests

To run the unit tests, use the following command:

```bash
npm run test
```

## Approach and Design Decisions

### Functional Requirements

1. 3x3 Grid: The game grid is implemented using a Board component that renders a grid of cells. Each cell is a clickable area where players can mark their moves.

2. Player Turns: The game alternates turns between two players by maintaining a state that tracks the current player. The AI mode is toggled with a checkbox.

3. Win and Draw Detection: The game checks for win conditions by evaluating all possible lines (rows, columns, and diagonals) after each move. If a player wins or if the board is full (draw), a message is displayed.

4. Reset Functionality: A reset button clears the game state, allowing players to start a new game

### Technical Requirements

1. Next.js and React: The application is built with Next.js for its efficient SSR and React for component-based architecture.

2. State Management: The state is managed using React's useState hook. The state includes the game cells, the current player, and the AI mode.

3. Styling: Styled-components are used for styling to keep the styles scoped and maintainable.

4. TypeScript: TypeScript is used for type safety, ensuring more robust and maintainable code.

5. Unit Testing: Jest and React Testing Library are used for testing. Tests cover rendering of the grid, marking cells, detecting win/draw conditions, and the reset functionality.

### Additional Features

- AI Mode: A simple AI makes random moves to simulate playing against a computer. The AI move is triggered after the player's move if the AI mode is enabled.

- Animations: Animations are added to enhance the user experience, providing visual feedback for cell clicks and game messages.
