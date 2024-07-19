//define variables
let playerScore = 0;
let computerScore = 0;
let draws = 0;
let playerChoice = undefined;
let scoreDataKey = 0;
let totalWinScore = 0;
let totalLossesScore = 0;
let totalGamesScore = 0;

//traversalKey saved in local storage will be used to traverse through scores
scoreDataKey = +localStorage.getItem("dataTraversalKey");
totalWinScore = +localStorage.getItem("totalWinsKey");
totalLossesScore = +localStorage.getItem("totalLossesKey");
totalGamesScore = +localStorage.getItem("totalGamesKey");


//implementing
const scoresTable = document.querySelector("#scores-table")
const checkScoresButton = document.querySelector("#check-score-board-btn");
const clearScoresButton = document.querySelector("#clear-score-btn");

//DOM: text
const score = document.querySelector(".score");
const roundStat = document.querySelector(".round-stat");
const totalGames = document.querySelector("#total-games");
const totalWins= document.querySelector("#total-wins");
const totalLosses = document.querySelector("#total-losses");

//DOM: buttons
const playerChoiceButtons = document.querySelectorAll(".player-rps-choices");
const computerChoiceDivs = document.querySelectorAll(".enemy-rps-choices");
const playButton = document.querySelector(".play-game-btn");
const playAgainButton = document.querySelector("#play-again-btn");
const backButton = document.querySelector("#back-btn");

console.log(playerChoiceButtons);
//need bug fix: shows warning on other pages
for(let i=0; i < 3; i++) {
            playerChoiceButtons[i].addEventListener('click', () => {
                playRound(playerChoice, getComputerChoice());
            });
        }

//onclick 
function getPlayerChoice(clickedId) {
    playerChoice = `${clickedId}`;
}

//know which choice to light up
//params for roundStatus: "draw", "win", "lost"
function changeColorOfChoices(roundStatus, winningChoice, losingChoice) {
    // if player wins: player green, computer red
    if (roundStatus === "win") {
        for(let i=0; i < 3; i++) {
            if(playerChoiceButtons[i].id === winningChoice) {
                playerChoiceButtons[i].style.backgroundColor = "lightgreen";
            }
        } 

        for(let i=0; i < 3; i++) {
            if(computerChoiceDivs[i].id === losingChoice) {
                computerChoiceDivs[i].style.backgroundColor = "rgb(255,100,100)";
            }
        }
    }

    if (roundStatus === "lost") {
        for(let i=0; i < 3; i++) {
            if(playerChoiceButtons[i].id === losingChoice) {
                playerChoiceButtons[i].style.backgroundColor = "rgb(255,100,100)";
            }
        }

        for(let i=0; i < 3; i++) {
            if(computerChoiceDivs[i].id === winningChoice) {
                computerChoiceDivs[i].style.backgroundColor = "lightgreen";
            }
        }
    }

    //if draw player defaults to winning choice
    if(roundStatus === "draw") {
        for(let i=0; i < 3; i++) {
            if(playerChoiceButtons[i].id === winningChoice) {
                playerChoiceButtons[i].style.backgroundColor = "grey";
            }
        }

        for(let i=0; i < 3; i++) {
            if(computerChoiceDivs[i].id === losingChoice) {
                computerChoiceDivs[i].style.backgroundColor = "grey";
            }
        }

    }


}

//game logic
function getComputerChoice() {
    let randomInt = Math.floor(Math.random() * 3); // get random int of 0,1 or 2 
    if(randomInt === 0) return "scissors";
    if(randomInt === 1) return "rock";
    if(randomInt === 2) return "paper";
}

function playRound(playerChoice, cChoice) {
    
    //recolor everything before playing round
    for(let i=0; i < 3; i++) {
        playerChoiceButtons[i].style.backgroundColor = "rgb(239,239,239)";
        computerChoiceDivs[i].style.backgroundColor = "rgb(239,239,239";
    }

    //draw
    if(playerChoice === cChoice) {
        roundStat.innerHTML=`It was a draw! You chose ${playerChoice} and the computer chose ${cChoice}!`;
        draws++;
        changeColorOfChoices("draw", playerChoice, cChoice);

    }
    //player wins
    else if(playerChoice === "rock" && cChoice === "scissors") {
        roundStat.innerHTML = `You won! You chose ${playerChoice} and the computer chose ${cChoice}!`;
        playerScore++;
        changeColorOfChoices("win", playerChoice, cChoice);
    }

    else if(playerChoice === "paper" && cChoice === "rock") {
        roundStat.innerHTML = `You won! You chose ${playerChoice} and the computer chose ${cChoice}!`;
        playerScore++;
        changeColorOfChoices("win", playerChoice, cChoice);
    }

    else if(playerChoice === "scissors" && cChoice === "paper") {
        roundStat.innerHTML = `You won! You chose ${playerChoice} and the computer chose ${cChoice}!`;
        playerScore++;
        changeColorOfChoices("win", playerChoice, cChoice);
    }

    //computer wins 
    else {
        roundStat.innerHTML = `You lost! You chose ${playerChoice} and the computer chose ${cChoice}!`;
        computerScore++;
        changeColorOfChoices("lost", cChoice, playerChoice);
    }

    //display score to html
    score.innerHTML=`${playerScore}-${computerScore}`;

    //check if game finish
    gameLogic();
}

function gameLogic() {
    //check if game started, so back button is disabled until game finishes
    if(playerScore > 0 || computerScore > 0 || draws > 0) {
        backButton.setAttribute("disabled", "");
        playAgainButton.setAttribute("disabled", "");
    }

    if(playerScore == 5 || computerScore == 5) {
        for(let i=0; i < 3; i++) {
            playerChoiceButtons[i].setAttribute("disabled", "");
            computerChoiceDivs[i].style.opacity = 0.5;
        }
    
        //update score
        updateScoreData();

        //allow play again and back when game finishes
       playAgainButton.removeAttribute("disabled");
       backButton.removeAttribute("disabled");

    }
}

function playAgain() {
    playerScore=0; computerScore = 0; draws=0;

    score.innerHTML=`${playerScore}-${computerScore}`;

    
    for(let i=0; i < 3; i++) {
        playerChoiceButtons[i].style.backgroundColor="rgb(239,239,239)";
        computerChoiceDivs[i].style.backgroundColor="rgb(239,239,239)";
        playerChoiceButtons[i].removeAttribute("disabled");
        computerChoiceDivs[i].style.opacity = 1;
    }
}

//update score

function updateScoreData() {

    //determine win or lose
    if(playerScore === 5) {
        gameStatus="win";
        totalWinScore++;
    }
    if(computerScore === 5) {
        gameStatus = "lost";
        totalLossesScore++;
    } 

    totalGamesScore++;

    // get date once a game finish
    let utcDate = new Date().toString();

    let scoreData = {
        status: gameStatus,
        score: `${playerScore}-${computerScore}`,
        draws: draws,
        time: utcDate.substring(16,24),
        date: utcDate.substring(4,15),
    }

    //save score data and update traversal key
    localStorage.setItem(`scoreKey${scoreDataKey}`, JSON.stringify(scoreData));
    scoreDataKey++;
    localStorage.setItem("dataTraversalKey", `${scoreDataKey}`);

    localStorage.setItem("totalWinsKey", `${totalWinScore}`);
    localStorage.setItem("totalLossesKey", `${totalLossesScore}`);
    localStorage.setItem("totalGamesKey", `${totalGamesScore}`);


}

//pushing data to DOM

function pushScoreDataToDOM() {

    totalGames.innerText = totalGamesScore;
    totalWins.innerText = totalWinScore;
    totalLosses.innerText = totalLossesScore;

    if(scoreDataKey == 0) {
        alert("Hey, you haven't played a single game yet! go play one first!")
    }

    checkScoresButton.setAttribute("disabled", "");

    for(let i= scoreDataKey - 1; i >= 0; i--) {
        //convert the string stored in local storage to an object
        const scoreDataObject = JSON.parse(localStorage.getItem(`scoreKey${i}`));

        const newTR = document.createElement("tr");
        
        const gameNumberDataElement= document.createElement("td");
        gameNumberDataElement.innerText = i + 1;
        newTR.append(gameNumberDataElement);

        const statusDataElement = document.createElement("td");
        statusDataElement.innerText= scoreDataObject.status;
        newTR.append(statusDataElement);
        //check if win or loss and increment accordingly

        const scoreDataElement = document.createElement("td");
        scoreDataElement.innerText = scoreDataObject.score;
        newTR.append(scoreDataElement);
        
        const drawsDataElement = document.createElement("td");
        drawsDataElement.innerText = scoreDataObject.draws;
        newTR.append(drawsDataElement);

        const timeDataElement = document.createElement("td");
        timeDataElement.innerText = scoreDataObject.time; 
        newTR.append(timeDataElement);

        const dateDataElement = document.createElement("td");
        dateDataElement.innerText = scoreDataObject.date;
        newTR.append(dateDataElement);

        scoresTable.append(newTR);
    }


}

//testing: doesn't work yet 

/*
function checkIfPageIsScores() {
    window.onload = () => {
        if(document.title.innerText==="RPS Scores") {
            pushScoreDataToDOM();
        }
    }
}
*/

function clearScores() {

    if(scoreDataKey === 0 ) {
        clearScoresButton.setAttribute("disabled", "");
        return;
    }

    if(confirm("Are you sure you want to clear your scores? They will be lost FOREVER!")) {
    }

    else return;

    localStorage.clear();
    //reload page
    window.location.reload();

}
