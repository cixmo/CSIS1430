let gameBoard = ["", "", "", "", "", "" ,"", "", ""];
// [0] Rounds, [1] P1 Wins, [2] P2 Wins, [3] Draws
let gameCounter = [0, 0, 0, 0];
let gameState = 0; // 0:START 1:ACTIVE 2:END
let namePlayer1 = "";
let namePlayer2 = "";
let gameCurrentPlayer = 1;
let dataRoundStatus = 0;
let testData = [0, "", ""];

function onLoad() {
    let start = new Audio('game_start.mp3');
    start.play();
}

function gameUpdateMessage(type) {
    let currentPlayer;
    if (gameCurrentPlayer == 1) {
        currentPlayer = namePlayer1;
    } else if (gameCurrentPlayer == 2) {
        currentPlayer = namePlayer2;
    }
    if (type == 'switch') {
        document.querySelector(".message").innerText = "R=" + gameCounter[3] + " T=" + currentPlayer;
        return;
    }
    if (type == 'win') {
        document.querySelector(".data-p" + gameCurrentPlayer + "-wins").innerText = "w=" + gameCounter[gameCurrentPlayer];
        document.querySelector(".message").innerText = currentPlayer + ` WON!`;
        document.querySelector(".restart-message").innerText = currentPlayer + ` HAS WON!`;
        return;
    }
    if (type == 'draw') {
        document.querySelector(".data-draws").innerText = gameCounter[3];
        document.querySelector(".message").innerText = `DRAW!`;
        document.querySelector(".restart-message").innerText = `THERE WAS A DRAW!`;
        return;
    }
}

function gameUpdatePlayer () {
    if (gameCurrentPlayer == 0 || gameCurrentPlayer == 2) {
        gameCurrentPlayer = 1;
        gameUpdateMessage('switch');
    } else if (gameCurrentPlayer == 1) {
        gameCurrentPlayer = 2;
        gameUpdateMessage('switch');
    }
    return;
}

function gameUpdateCell(cell, cellIndex) {
    gameBoard[cellIndex] = gameCurrentPlayer;
    document.getElementById("cell-" + cellIndex).className = 'cell marker-p' + gameCurrentPlayer;
    return;
}

function gameProcessEvent() {
    let roundWon = false;
    let roundDraw = !gameBoard.includes("");
    let winPattern = [];
    const patterns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (let index = 0; index <= 7; index++) {
        const pattern = patterns[index];
        let x = gameBoard[pattern[0]];
        let y = gameBoard[pattern[1]];
        let z = gameBoard[pattern[2]];
        console.log("Testing Pattern: " + x + ", " + y + ", ");
        if (x === '' || y === '' || z === '') {
            continue;
        }
        
        if (x === y && y === z) {
            winPattern = pattern;
            roundWon = true;
            break
        }
    }

    if (roundWon) {
        for (let cell = 0; cell <= 2; cell++) {
            document.getElementById("cell-" + winPattern[cell]).className = 'win-p' + gameCurrentPlayer;
        }
        for (let i = 0; i <= 8; i++) {
            document.getElementById("cell-" + i).removeEventListener("click", handleClickEvent);
        }
        gameCounter[gameCurrentPlayer] = gameCounter[gameCurrentPlayer] + 1;
        gameCounter[3] = gameCounter[3] + 1;
        gameState = 2;
        gameUpdateMessage('win');
        gameUpdateDisplay();
        return;
    }

    if (roundDraw) {
        gameCounter[3] = gameCounter[3] + 1;
        gameState = 2;
        gameUpdateMessage('draw');
        gameUpdateDisplay();
        return;
    }
    gameUpdatePlayer();
}

function game() {
    const inputPlayer1 = document.getElementById('input-p1').value;
    const inputPlayer2 = document.getElementById('input-p2').value;
    let intro = new Audio('round_begin.mp3');

    if (testData[1] === "" && inputPlayer1 === "" ) {
        namePlayer1 = "Player 1"
    } else if (testData[1] != "") {
        namePlayer1 = testData[1];
    } else if (inputPlayer1 != "") {
        namePlayer1 = inputPlayer1;
    }

    if (testData[2] === "" && inputPlayer2 === "" ) {
        namePlayer2 = "Player 2"
    } else if (testData[2] != "") {
        namePlayer2 = testData[2];
    } else if (inputPlayer2 != "") {
        namePlayer2 = inputPlayer2;
    }

    for (i = 0; i < 9; i++) {
        let cell = "cell-" + i; 
        document.getElementById(cell).removeEventListener('click', handleClickEvent);
        document.getElementById(cell).className = 'cell';
        document.getElementById(cell).addEventListener('click', handleClickEvent);
    }
    
    intro.play();
    gameUpdateMessage('switch');
    gameState = 1;
    gameUpdateDisplay();
    return;
}

function gameUpdateDisplay() {
    const start = document.getElementById("cont-start");
    const active = document.getElementById("cont-active");
    const restart = document.getElementById("restart");
    const info = document.querySelector(".info");
    let roundover = new Audio('round_over.mp3');
    start.style.display = 'none';
    active.style.display = 'none';
    restart.style.display = 'none';
    info.style.display = 'none';
    
    if (gameState === 0) {
        start.style.display = 'flex';
        return;
    } else if (gameState === 1) {
        active.style.display = 'flex';
        info.style.display = 'flex';
        document.querySelector(".data-draws").innerText = gameCounter[3];
        document.querySelector(".data-p1-wins").innerText = "w=" + gameCounter[1];
        document.querySelector(".data-p2-wins").innerText = "w=" + gameCounter[2];
        document.querySelector(".data-p1-name").innerText = namePlayer1;
        document.querySelector(".data-p2-name").innerText = namePlayer2;
        return;
    } else if (gameState === 2) {
        roundover.play();
        restart.classList.add('restart-in');
        restart.style.display = 'flex';
    }
}

function gameClear() {
    document.getElementById("restart").classList.remove('restart-in');
    document.getElementById("restart").classList.add('restart-out');
    gameBoard = ["", "", "", "", "", "" ,"", "", ""];
    currentPlayer = 1;
    for (let cell = 0; cell <= 8; cell++) {
        document.getElementById("cell-" + cell).className = 'cell';
    }
    game();
}


function handleClickEvent(event) {
    let gunshot = new Audio('gunshot.mp3');
    const cell = event.target;
    const cellIndex = parseInt(cell.getAttribute("data-cell-index"));
    gunshot.play();
    document.getElementById("cell-" + cellIndex).removeEventListener("click", handleClickEvent);
    gameUpdateCell(cell, cellIndex);
    gameProcessEvent();
}