//define variables
let playerScore = 0;
let computerScore = 0;
let draw = 0;
let playerChoice = null;

//implementing
const checkScores = [];

//DOM: text
const score = document.querySelector(".score");
const roundStat = document.querySelector(".round-stat");

//DOM: buttons
const choiceButtons = document.querySelector(".game-board").querySelectorAll(".rps-choices");
console.log(choiceButtons);
const playButton = document.querySelector(".play-game-btn");
const playAgainButton = document.querySelector("#play-again-btn");
const backButton = document.querySelector("#back-btn");

for(let i=0; i < 3; i++) {
            choiceButtons[i].addEventListener('click', () => {
                playRound(playerChoice, getComputerChoice());
            })
        }

//onclick 
function getPlayerChoice(clickedId) {
    playerChoice = `${clickedId}`;
}

//game logic
function getComputerChoice() {
    let randomInt = Math.floor(Math.random() * 3); // get random int of 0,1 or 2 
    if(randomInt === 0) return "scissors";
    if(randomInt === 1) return "rock";
    if(randomInt === 2) return "paper";
}

function playRound(playerChoice, cChoice) {
    //draw
    if(playerChoice === cChoice) {
        roundStat.innerHTML=`It was a draw! You chose ${playerChoice} and the computer chose ${cChoice}!`;
        draw++;
    }
    //player wins
    else if(playerChoice === "rock" && cChoice === "scissors") {
        roundStat.innerHTML = `You won! You chose ${playerChoice} and the computer chose ${cChoice}!`;
        playerScore++;
    }

    else if(playerChoice === "paper" && cChoice === "rock") {
        roundStat.innerHTML = `You won! You chose ${playerChoice} and the computer chose ${cChoice}!`;
        playerScore++;
    }

    else if(playerChoice === "scissors" && cChoice === "paper") {
        roundStat.innerHTML = `You won! You chose ${playerChoice} and the computer chose ${cChoice}!`;
        playerScore++;
    }

    //computer wins 
    else {
        roundStat.innerHTML = `You lost! You chose ${playerChoice} and the computer chose ${cChoice}!`;
        computerScore++;
    }

    //display score to html
    score.innerHTML=`${playerScore}-${computerScore}`;

    //

    //check if game finish
    gameLogic();
}

function gameLogic() {
    
    //check if game started, so back button is disabled until game finishes
    if(playerScore > 0 || computerScore > 0 || draw > 0) {
        backButton.setAttribute("disabled", "");
    }

    if(playerScore == 5 || computerScore == 5) {
        for(let i=0; i < 3; i++) {
            choiceButtons[i].setAttribute("disabled", "");
        }
    
    //allow play again and back when game finishes
       playAgainButton.removeAttribute("disabled");
       backButton.removeAttribute("disabled");

    }
}

function playAgain() {
    playerScore=0; computerScore = 0; draw=0;

    score.innerHTML=`${playerScore}-${computerScore}`;

    
    for(let i=0; i < 3; i++) {
        choiceButtons[i].removeAttribute("disabled");
    }
}

