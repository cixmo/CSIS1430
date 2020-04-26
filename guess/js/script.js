const confGuessMax = 10;
const confNumberMax = 100;
const confWideRange = 10;

let gameNumber = 0;
let gameState = 0;
let gameCount = 0;
let gameGuessCount = 0;
let gameGuessLeft = 0;
let userPrevious = [];
let userGuess;

function onLoad() {
    if (gameState == 0){
        document.getElementById('viewport-start').style.display = 'flex';
        document.getElementById('viewport-game').style.display = 'none';
        document.getElementById('viewport-stop').style.display = 'none';
        document.getElementById("form-heading").innerHTML = "Choose a number between 1 and " + confNumberMax + ".";
    } else if (gameState == 1) {
        document.getElementById('viewport-start').style.display = 'none';
        document.getElementById('viewport-game').style.display = 'flex';
        document.getElementById('viewport-stop').style.display = 'none';
    } else if (gameState == 2) {
        document.getElementById('viewport-start').style.display = 'none';
        document.getElementById('viewport-game').style.display = 'none';
        document.getElementById('viewport-stop').style.display = 'flex';
    }
}

function gameReset() {
    gameState = 1;
    gameCount = gameCount + 1;
    gameClear();
    gameNumber = (Math.floor(Math.random() * confNumberMax) + 1);
    onLoad();
}

function gameClear() {
    gameGuessLeft = confGuessMax;
    gameGuessCount = 0;
    while (userPrevious.length) { userPrevious.pop(); };
    document.getElementById("hud-1").innerHTML = gameGuessCount;
    document.getElementById("hud-2").innerHTML = gameGuessLeft;
    document.getElementById("hud-3").innerHTML = gameCount;
    document.getElementById("return-heading").innerHTML = `Start Your Engine!`;
    document.getElementById("return-message").innerHTML = `A new number was randomly selected between 1 and 100.`;
    document.getElementById("previous-results").innerHTML = `No Guesses Yet`;
}

function gameOver(type) {
    gameState = 2;
    gameClear();
    document.getElementById("hud-1").innerHTML = gameGuessCount;
    document.getElementById("hud-2").innerHTML = gameGuessLeft;
    document.getElementById("hud-3").innerHTML = gameCount;
    if (type == 'loss') {
        document.getElementById("stop-heading").innerHTML = `You Lose, Game Over.`
        document.getElementById("stop-message").innerHTML = `The number was ` + gameNumber + `.`;
    } else if (type == 'win') {
        document.getElementById("stop-heading").innerHTML = `Congratulations! You Won!`
        document.getElementById("stop-message").innerHTML = `The winning number was ` + gameNumber + `.`;
    }
    gameNumber = null;
    onLoad();
}

function gameProcess(type) {
    gameGuessCount = gameGuessCount + 1;
    gameGuessLeft = gameGuessLeft - 1;
    document.getElementById("hud-1").innerHTML = gameGuessCount;
    document.getElementById("hud-2").innerHTML = gameGuessLeft;
    userPrevious.push(userGuess);
    document.getElementById("previous-results").innerHTML = userPrevious.join(', ');
    userGuess = null;
    if (type == "xhigh") {
        document.getElementById("return-heading").innerHTML = "Way too High!";
        document.getElementById("return-message").innerHTML = "The number you selected was way too high above the selected number.";
    } else if (type == "xlow") {
        document.getElementById("return-heading").innerHTML = "Way too Low!";
        document.getElementById("return-message").innerHTML = "The number you selected was way too low above the selected number.";
    } else if (type == "high") {
        document.getElementById("return-heading").innerHTML = "High but Getting Close!";
        document.getElementById("return-message").innerHTML = "The number you selected was too high above the selected number.";
    } else if (type == "low") {
        document.getElementById("return-heading").innerHTML = "Low but Getting Close!";
        document.getElementById("return-message").innerHTML = "The number you selected was too low above the selected number.";
    }
}

function game() {
    userGuess = +document.getElementById("input-num").value;
    document.getElementById("input-num").value = "";
    if (gameNumber == null) {
        gameReset();  
    } else {
        switch(true) {
            case userGuess == undefined:
            case userGuess == null:
            case userGuess <= 0:
                document.getElementById("return-heading").innerHTML = "Invalid Input";
                document.getElementById("return-message").innerHTML = "The number you selected was not considered valid input.  Choose between 1 and " + confNumberMax + ".";
                break;
            case userPrevious.includes(userGuess) == true:
                document.getElementById("return-heading").innerHTML = "Number already chosen";
                document.getElementById("return-message").innerHTML = "The number you selected was already previously chosen in this round.  Choose between 1 and " + confNumberMax + ".";
                break;
            case gameGuessLeft == 0:
                gameOver("loss");
                break;
            case userGuess > confNumberMax:
                document.getElementById("return-heading").innerHTML = "Input Out for Range";
                document.getElementById("return-message").innerHTML = "The number you selected was out of the pool range.  Choose between 1 and " + confNumberMax + ".";
                break;
            case userGuess >= gameNumber + confWideRange:
                gameProcess("xhigh");
                break;
            case userGuess <= gameNumber - confWideRange:
                gameProcess("xlow");
                break;
            case userGuess > gameNumber:
                gameProcess("high");
                break;
            case userGuess < gameNumber:
                gameProcess("low");
                break;
            default:
                gameOver('win');
                break;
        }
    }

}
