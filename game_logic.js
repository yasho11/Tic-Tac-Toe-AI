let playerText = document.getElementById('playerText');
let restartBtn = document.getElementById('restartBtn');
let boxes = Array.from(document.getElementsByClassName('box'));
let winnerIndicator = getComputedStyle(document.body).getPropertyValue('--primary');
const O_TEXT = "O";
const X_TEXT = "X";
const AI_TEXT = "AI"; // Add AI text

let currentPlayer = X_TEXT;
let spaces = Array(9).fill(null);

const startGame = () => {
    boxes.forEach(box => box.addEventListener('click', boxClicked));
    // Start the game with the player's turn
    playerText.textContent = `Current Player: ${currentPlayer}`;
}

function boxClicked(e) {
    const id = e.target.id;
    if (!spaces[id] && currentPlayer !== AI_TEXT) {
        spaces[id] = currentPlayer;
        e.target.innerText = currentPlayer;
        if (playerHasWon() !== false) {
            playerText.textContent = `Congratulations, ${currentPlayer} has won!`;
            let winning_blocks = playerHasWon();
            winning_blocks.map(box => boxes[box].style.backgroundColor = winnerIndicator);
        } else if (isBoardFull()) {
            playerText.textContent = "It's a draw!";
        } else {
            currentPlayer = currentPlayer === X_TEXT ? O_TEXT : X_TEXT;
            playerText.textContent = `Current Player: ${currentPlayer}`;
            // Call the AI's turn function after player's move
            if (currentPlayer === AI_TEXT) {
                makeAiMove();
            }
        }
    }
}



const winningcombos = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]
];

function playerHasWon() {
    for (const condition of winningcombos) {
        let [a, b, c] = condition;
        if (spaces[a] && spaces[a] === spaces[b] && spaces[a] === spaces[c]) {
            return [a, b, c];
        }
    }
    return false;
}

function isBoardFull() {
    return spaces.every(space => space !== null);
}

function makeAiMove() {
    // Implement a simple AI that makes a random move from available empty spaces
    const emptyIndices = spaces.reduce((acc, val, index) => (val === null ? acc.concat(index) : acc), []);
    if (emptyIndices.length > 0) {
        const randomIndex = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
        spaces[randomIndex] = AI_TEXT;
        boxes[randomIndex].innerText = AI_TEXT;
    }

    if (playerHasWon() !== false) {
        playerText.textContent = `Congratulations, ${AI_TEXT} has won!`;
        let winning_blocks = playerHasWon();
        winning_blocks.map(box => boxes[box].style.backgroundColor = winnerIndicator);
    } else if (isBoardFull()) {
        playerText.textContent = "It's a draw!";
    } else {
        currentPlayer = X_TEXT;
        playerText.textContent = `Current Player: ${currentPlayer}`;
    }
}

restartBtn.addEventListener('click', restart);

function restart() {
    spaces.fill(null);
    boxes.forEach(box => {
        box.innerText = '';
        box.style.backgroundColor = '';
    });
    playerText.textContent = 'Tic Tac Toe';
    currentPlayer = X_TEXT;
    startGame(); // Start the game again after restart
}

startGame();
