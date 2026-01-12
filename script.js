const ROWS = 6;
const COLS = 7;

let board = [];
let currentPlayer = "red";
let gameOver = false;
let moves = 0;

const boardDiv = document.getElementById("board");
const statusText = document.getElementById("status");

function createBoard() {
  board = [];
  boardDiv.innerHTML = "";
  currentPlayer = "red";
  gameOver = false;
  moves = 0;
  statusText.textContent = "Player RED's Turn";

  for (let r = 0; r < ROWS; r++) {
    board[r] = [];
    for (let c = 0; c < COLS; c++) {
      board[r][c] = null;
      const cell = document.createElement("div");
      cell.className = "cell";
      cell.dataset.col = c;
      cell.addEventListener("click", handleMove);
      boardDiv.appendChild(cell);
    }
  }
}

function handleMove(e) {
  if (gameOver) return;

  const col = parseInt(e.target.dataset.col);

  for (let r = ROWS - 1; r >= 0; r--) {
    if (board[r][col] === null) {
      board[r][col] = currentPlayer;
      moves++;
      renderBoard();

      if (checkWin(r, col)) {
        statusText.textContent = `🎉 ${currentPlayer.toUpperCase()} Wins!`;
        gameOver = true;
        return;
      }

      if (moves === ROWS * COLS) {
        statusText.textContent = "🤍 It's a Draw!";
        gameOver = true;
        return;
      }

      currentPlayer = currentPlayer === "red" ? "yellow" : "red";
      statusText.textContent = `Player ${currentPlayer.toUpperCase()}'s Turn`;
      return;
    }
  }
}

function renderBoard() {
  const cells = document.querySelectorAll(".cell");
  let i = 0;

  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      cells[i].className = "cell";
      if (board[r][c]) {
        cells[i].classList.add(board[r][c]);
      }
      i++;
    }
  }
}

function checkWin(row, col) {
  return (
    countDirection(row, col, 0, 1) + countDirection(row, col, 0, -1) > 2 || // Horizontal
    countDirection(row, col, 1, 0) > 2 || // Vertical
    countDirection(row, col, 1, 1) + countDirection(row, col, -1, -1) > 2 || // Diagonal /
    countDirection(row, col, 1, -1) + countDirection(row, col, -1, 1) > 2   // Diagonal \
  );
}

function countDirection(r, c, dr, dc) {
  let count = 0;
  const player = board[r][c];

  r += dr;
  c += dc;

  while (
    r >= 0 &&
    r < ROWS &&
    c >= 0 &&
    c < COLS &&
    board[r][c] === player
  ) {
    count++;
    r += dr;
    c += dc;
  }

  return count;
}

function resetGame() {
  createBoard();
}

createBoard();
