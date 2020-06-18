const playerStatus = document.querySelector('#current-player');

let gameActive = true;

let currentPlayer = 'X';

const currentPlayerTurn = () =>
  `It is currently player ${currentPlayer}'s turn`;

const winningMessage = () => `Player ${currentPlayer} has won!`;
const drawMessage = () => `Game ended in a draw!`;

playerStatus.innerText = currentPlayerTurn();

let gameState = ['', '', '', '', '', '', '', '', ''];

function cellClick(clickedCellEvent) {
  const clickedCell = clickedCellEvent.target;

  const clickedCellIndex = parseInt(
    clickedCell.getAttribute('data-cell-index')
  );

  if (gameState[clickedCellIndex] !== '' || !gameActive) {
    return;
  }

  handleCellPlayed(clickedCell, clickedCellIndex);
  handleResultValidation();
}

function handleCellPlayed(clickedCell, clickedCellIndex) {
  gameState[clickedCellIndex] = currentPlayer;
  if (currentPlayer === 'X') {
    xSymbol = document.createElement('img');
    xSymbol.setAttribute('src', 'img/ex.png');
    xSymbol.style.height = '150px';
    clickedCell.appendChild(xSymbol);
  } else if (currentPlayer === 'O') {
    oSymbol = document.createElement('img');
    oSymbol.setAttribute('src', 'img/oh.png');
    oSymbol.style.height = '150px';
    clickedCell.appendChild(oSymbol);
  }
}

function resetBoard() {
  gameActive = true;
  currentPlayer = 'X';
  gameState = ['', '', '', '', '', '', '', '', ''];
  playerStatus.innerHTML = currentPlayerTurn();
  document
    .querySelectorAll('.board-cell')
    .forEach((cell) => (cell.innerHTML = ''));
}

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

function handleResultValidation() {
  let roundWon = false;
  for (let i = 0; i <= 7; i++) {
    const winCondition = winningConditions[i];
    let a = gameState[winCondition[0]];
    let b = gameState[winCondition[1]];
    let c = gameState[winCondition[2]];
    if (a === '' || b === '' || c === '') {
      continue;
    }
    if (a === b && b === c) {
      roundWon = true;
      break;
    }
  }
  if (roundWon) {
    playerStatus.innerHTML = winningMessage();
    gameActive = false;
    return;
  }

  let roundDraw = !gameState.includes('');
  if (roundDraw) {
    playerStatus.innerHTML = drawMessage();
    gameActive = false;
    return;
  }

  handlePlayerChange();
}

function handlePlayerChange() {
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  playerStatus.innerHTML = currentPlayerTurn();
}

document
  .querySelectorAll('.board-cell')
  .forEach((cell) => cell.addEventListener('click', cellClick));

document
  .querySelector('#game-reset-button')
  .addEventListener('click', resetBoard);
