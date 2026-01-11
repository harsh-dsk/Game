const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");

let currentPlayer = "X";
let gameActive = true;

const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

cells.forEach(cell => {
    cell.addEventListener("click", handleClick);
});

function handleClick() {
    if (this.textContent !== "" || !gameActive) return;

    this.textContent = currentPlayer;
    checkResult();
}

function checkResult() {
    let won = false;

    for (let condition of winConditions) {
        const [a, b, c] = condition;
        if (
            cells[a].textContent &&
            cells[a].textContent === cells[b].textContent &&
            cells[a].textContent === cells[c].textContent
        ) {
            won = true;
            break;
        }
    }

    if (won) {
        statusText.textContent = `Player ${currentPlayer} wins!`;
        gameActive = false;
        return;
    }

    if ([...cells].every(cell => cell.textContent !== "")) {
        statusText.textContent = "It's a draw!";
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.textContent = `Player ${currentPlayer}'s turn`;
}

function restartGame() {
    currentPlayer = "X";
    gameActive = true;
    statusText.textContent = "Player X's turn";
    cells.forEach(cell => cell.textContent = "");
}
