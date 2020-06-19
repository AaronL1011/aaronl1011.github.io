const playerStatus = document.querySelector('#current-player');
const playerXWins = document.querySelector('#player-x-wins');
const playerOWins = document.querySelector('#player-o-wins');
const drawWins = document.querySelector('#draw-wins');

let computerEnabled = false;
function enableComputer() {
  computerEnabled = computerEnabled === false ? true : false;
  console.log(`Computer activated: ${computerEnabled}`);
  if (computerEnabled) {
    document.querySelector('#enable-computer-button').style.backgroundColor =
      'green';
  } else {
    document.querySelector('#enable-computer-button').style.backgroundColor =
      '#555555';
  }
}

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
  console.log(clickedCellIndex);
  if (gameState[clickedCellIndex] !== '' || !gameActive) {
    return;
  }

  handleCellPlayed(clickedCell, clickedCellIndex);
  handleResultValidation();

  if (computerEnabled === true && currentPlayer === 'O') {
    computerOpponent();
  }
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
  cockBlockedConditions = [];
  computerWinCondition = null;
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
    if (currentPlayer === 'X') {
      playerXWins.innerText++;
    } else if (currentPlayer === 'O') {
      playerOWins.innerText++;
    }
    gameActive = false;
    return;
  }

  let roundDraw = !gameState.includes('');
  if (roundDraw) {
    playerStatus.innerHTML = drawMessage();
    drawWins.innerText++;
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

document
  .querySelector('#enable-computer-button')
  .addEventListener('click', enableComputer);

let computerWinCondition = null;
function computerOpponent() {
  if (computerWinCondition === null) {
    computerWinCondition = setComputerWinCondition(false);
  }
  console.log(`The current condition is ${computerWinCondition}`);
  if (opponentAboutToWin()) {
    computerWinCondition = setComputerWinCondition(true);
  } else {
    for (cell of computerWinCondition) {
      if (gameState[cell] === 'X') {
        computerWinCondition = setComputerWinCondition(false);
      }
    }
  }
  for (cell of computerWinCondition) {
    if (gameState[cell] === '') {
      eventFire(document.getElementById(cell), 'click');
      break;
    }
  }
  // Repeat until game end
}

function setComputerWinCondition(cockblock) {
  // Initialise random winningCondition
  if (computerWinCondition === null) {
    selectedCondition = winningConditions[Math.floor(Math.random() * 8)];
    // Validate all index of the winningCondition within the current GameState do not include opponents letter
    if (
      computerWinCondition !== selectedCondition &&
      validateCondition(selectedCondition)
    ) {
      console.log(`A condition of ${selectedCondition} has been Initialised`);
      return selectedCondition;
    } else {
      return setComputerWinCondition(false);
    }
  }

  // Check if human to win next turn
  if (cockblock) {
    console.log('HUMAN ABOUT TO WIN! ELIMINATE!');
    return cockBlock();
  } else {
    // Check if round win impossible
    if (winPossible()) {
      selectedCondition = winningConditions[Math.floor(Math.random() * 8)];
      // Validate all index of the winningCondition within the current GameState do not include opponents letter
      if (validateCondition(selectedCondition)) {
        console.log('A new condition has been set due to an invalid condition');
        console.log(selectedCondition);
        return selectedCondition;
      } else {
        if (opponentAboutToWin()) {
          return setComputerWinCondition(true);
        } else {
          console.log('X in condition, choosing new condition');
          return setComputerWinCondition(false);
        }
      }
    } else {
      impossibleWinArray = [];
      for (i = 0; i < gameState.length - 1; i++) {
        if (gameState[i] === '') {
          impossibleWinArray.push(i);
        }
      }
      return impossibleWinArray;
    }
  }
  // If index of condition is taken by human player, switch winningCondition to closest similar condition.
}

function eventFire(el, etype) {
  if (el.fireEvent) {
    el.fireEvent('on' + etype);
  } else {
    var evObj = document.createEvent('Events');
    evObj.initEvent(etype, true, false);
    el.dispatchEvent(evObj);
  }
}

function validateCondition(conditionSet) {
  for (index of conditionSet) {
    if (gameState[index] === 'X') {
      return false;
    }
  }
  return true;
}

function winPossible() {
  totalConditionsIncludingX = 0;
  for (conditionSet of winningConditions) {
    for (index of conditionSet) {
      if (gameState[index] === 'X') {
        totalConditionsIncludingX++;
        break;
      }
    }
  }
  if (totalConditionsIncludingX === 8) {
    return false;
  }
  return true;
}

let cockBlockedConditions = [];
function cockBlock() {
  for (condition of winningConditions) {
    xCount = 0;
    for (index of condition) {
      if (gameState[index] === 'X') {
        xCount++;
      } else if (gameState[index] === 'O') {
        xCount--;
      }
    }
    if (xCount === 2 && !cockBlockedConditions.includes(condition)) {
      cockBlockedConditions.push(condition);
      return condition;
    }
  }
}

function opponentAboutToWin() {
  for (condition of winningConditions) {
    if (!cockBlockedConditions.includes(condition)) {
      xCount = 0;
      for (index of condition) {
        if (gameState[index] === 'X') {
          xCount++;
        }
        if (gameState[index] === 'O') {
          xCount--;
        }
      }
      if (xCount === 2) {
        return true;
      }
    }
  }
  return false;
}
