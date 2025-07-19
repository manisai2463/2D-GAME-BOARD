const board = document.getElementById("game-board");
const scoreDisplay = document.getElementById("score");
const boardSize = 20;
const cells = [];
let snake = [42];
let direction = 1;
let food = null;
let score = 0;
let gameOver = false;

function createBoard() {
  for (let i = 0; i < boardSize * boardSize; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    board.appendChild(cell);
    cells.push(cell);
  }
}

function draw() {
  cells.forEach(cell => cell.className = "cell");
  snake.forEach(i => cells[i].classList.add("snake"));
  if (food !== null) cells[food].classList.add("food");
}

function generateFood() {
  do {
    food = Math.floor(Math.random() * (boardSize * boardSize));
  } while (snake.includes(food));
}

function move() {
  const head = snake[0];
  const x = head % boardSize;
  const y = Math.floor(head / boardSize);
  let newHead = head + direction;

  // Boundary check
  if (
    (direction === 1 && x === boardSize - 1) ||
    (direction === -1 && x === 0) ||
    (direction === boardSize && y === boardSize - 1) ||
    (direction === -boardSize && y === 0) ||
    snake.includes(newHead)
  ) {
    alert("Game Over! Final Score: " + score);
    gameOver = true;
    return;
  }

  snake.unshift(newHead);
  if (newHead === food) {
    score += 10;
    scoreDisplay.textContent = `Score: ${score}`;
    generateFood();
  } else {
    snake.pop();
  }

  draw();
}

document.addEventListener("keydown", e => {
  if (e.key === "ArrowUp" && direction !== boardSize) direction = -boardSize;
  else if (e.key === "ArrowDown" && direction !== -boardSize) direction = boardSize;
  else if (e.key === "ArrowLeft" && direction !== 1) direction = -1;
  else if (e.key === "ArrowRight" && direction !== -1) direction = 1;
});

createBoard();
generateFood();
draw();
setInterval(() => {
  if (!gameOver) move();
}, 200);
