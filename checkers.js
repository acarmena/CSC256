const SIZE = 8;
const boardElement = document.querySelector('#board');
const statusElement = document.querySelector('#status');
let board = [];
let turn = 'red';
let selected = null;
let legalMoves = [];
let gameOver = false;

function newGame() {
  board = Array.from({ length: SIZE }, () => Array(SIZE).fill(null));
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < SIZE; col++) if ((row + col) % 2) board[row][col] = { color: 'charcoal', king: false };
  }
  for (let row = 5; row < SIZE; row++) {
    for (let col = 0; col < SIZE; col++) if ((row + col) % 2) board[row][col] = { color: 'red', king: false };
  }
  turn = 'red'; selected = null; legalMoves = []; gameOver = false;
  render(); setStatus("Red's turn — select a piece");
}

function directions(piece) {
  if (piece.king) return [[-1,-1],[-1,1],[1,-1],[1,1]];
  return piece.color === 'red' ? [[-1,-1],[-1,1]] : [[1,-1],[1,1]];
}

const inside = (row, col) => row >= 0 && row < SIZE && col >= 0 && col < SIZE;

function movesFor(row, col, capturesOnly = false) {
  const piece = board[row][col];
  if (!piece) return [];
  const moves = [];
  directions(piece).forEach(([dr, dc]) => {
    const nextRow = row + dr, nextCol = col + dc;
    const jumpRow = row + dr * 2, jumpCol = col + dc * 2;
    if (!capturesOnly && inside(nextRow, nextCol) && !board[nextRow][nextCol]) {
      moves.push({ row: nextRow, col: nextCol, capture: null });
    }
    if (inside(jumpRow, jumpCol) && board[nextRow]?.[nextCol]?.color !== piece.color && board[nextRow]?.[nextCol] && !board[jumpRow][jumpCol]) {
      moves.push({ row: jumpRow, col: jumpCol, capture: { row: nextRow, col: nextCol } });
    }
  });
  return capturesOnly ? moves.filter(move => move.capture) : moves;
}

function availableCaptures(color) {
  const captures = [];
  board.forEach((row, r) => row.forEach((piece, c) => {
    if (piece?.color === color && movesFor(r, c, true).length) captures.push({ row: r, col: c });
  }));
  return captures;
}

function handleSquare(row, col) {
  if (gameOver) return;
  const destination = legalMoves.find(move => move.row === row && move.col === col);
  if (selected && destination) return makeMove(destination);

  const piece = board[row][col];
  if (!piece || piece.color !== turn) return;
  const forced = availableCaptures(turn);
  if (forced.length && !forced.some(position => position.row === row && position.col === col)) {
    setStatus(`${label(turn)} must capture — choose a pulsing piece`); return;
  }
  selected = { row, col };
  legalMoves = movesFor(row, col, forced.length > 0);
  setStatus(legalMoves.length ? `${label(turn)}: choose a glowing square` : 'That piece has no legal moves');
  render();
}

function makeMove(move) {
  const piece = board[selected.row][selected.col];
  board[move.row][move.col] = piece;
  board[selected.row][selected.col] = null;
  if (move.capture) board[move.capture.row][move.capture.col] = null;
  if ((piece.color === 'red' && move.row === 0) || (piece.color === 'charcoal' && move.row === 7)) piece.king = true;

  if (move.capture) {
    const moreCaptures = movesFor(move.row, move.col, true);
    if (moreCaptures.length) {
      selected = { row: move.row, col: move.col };
      legalMoves = moreCaptures;
      setStatus(`${label(turn)} captures again!`);
      render(); return;
    }
  }
  turn = turn === 'red' ? 'charcoal' : 'red';
  selected = null; legalMoves = [];
  const remaining = countPieces(turn);
  if (!remaining || !hasAnyMove(turn)) return endGame(turn === 'red' ? 'charcoal' : 'red');
  setStatus(`${label(turn)}'s turn — select a piece`);
  render();
}

function hasAnyMove(color) {
  return board.some((row, r) => row.some((piece, c) => piece?.color === color && movesFor(r, c).length));
}
function countPieces(color) { return board.flat().filter(piece => piece?.color === color).length; }
function label(color) { return color === 'red' ? 'Red' : 'Charcoal'; }
function setStatus(message) { statusElement.textContent = message; }
function endGame(winner) { gameOver = true; selected = null; legalMoves = []; setStatus(`${label(winner)} wins! Select New Game to play again.`); render(); }

function render() {
  boardElement.replaceChildren();
  const forced = gameOver ? [] : availableCaptures(turn);
  for (let row = 0; row < SIZE; row++) for (let col = 0; col < SIZE; col++) {
    const square = document.createElement('button');
    square.type = 'button'; square.className = `square ${(row + col) % 2 ? 'dark' : 'light'}`;
    square.setAttribute('role', 'gridcell');
    square.setAttribute('aria-label', `Row ${row + 1}, column ${col + 1}`);
    const move = legalMoves.find(item => item.row === row && item.col === col);
    if (move) {
      square.classList.add('valid');
      if (move.capture) square.classList.add('capture');
    }
    const piece = board[row][col];
    if (piece) {
      const token = document.createElement('span');
      token.className = `piece ${piece.color}${piece.king ? ' king' : ''}`;
      if (selected?.row === row && selected?.col === col) token.classList.add('selected');
      if (forced.some(position => position.row === row && position.col === col)) token.classList.add('forced');
      token.setAttribute('aria-label', `${label(piece.color)}${piece.king ? ' king' : ''}`);
      square.appendChild(token);
    }
    square.addEventListener('click', () => handleSquare(row, col));
    boardElement.appendChild(square);
  }
  document.querySelector('#red-count').textContent = countPieces('red');
  document.querySelector('#charcoal-count').textContent = countPieces('charcoal');
  document.querySelector('#red-player').classList.toggle('active', turn === 'red' && !gameOver);
  document.querySelector('#charcoal-player').classList.toggle('active', turn === 'charcoal' && !gameOver);
}

document.querySelector('#restart').addEventListener('click', newGame);
newGame();
