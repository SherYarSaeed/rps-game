'use strict';



let rock            = document.getElementById("rock-btn");
let paper           = document.getElementById("paper-btn");
let scissors        = document.getElementById("scissors-btn");
let playerImage     = document.getElementById("player-choice-img");
let computerImage   = document.getElementById("computer-choice-img");
let splashScreen    = document.getElementById("splash");
let gameScreen      = document.getElementById("game"); 
let gameOverScreen  = document.getElementById("game-over");
let roundStatus     = document.getElementById("round-status");
let buttons         = document.getElementById("player-choice-btn");
let winnerStatus    = document.getElementById("winner-status");


//
//Game Object

const game = {
    title: "Rock Paper Scissors",
    playerName: "",
    playerChoice: "",
    playerScore: 0,
    scoreToWin: 0,
    gameOver: false,
    gameWinner: "",
    currentScreen: "splash",
    computerChoices: ["rock", "paper", "scissors"],
    computerDecision: "",
    computerScore: 0,

    updateScore: function(){
        let playerScoreDiplay = document.getElementById("player-score");
        let computerScoreDiplay = document.getElementById("computer-score");

        playerScoreDiplay.innerHTML = "Player : " + this.playerScore;
        computerScoreDiplay.innerHTML = "Computer : " + this.computerScore;

    },
    startGame: function(){
        this.currentScreen = "game";
        splashScreen.classList.add("hide");
        gameScreen.classList.remove("hide");

        if(this.playerName === ""){
            document.getElementById("diplay-player-name").classList.add('hide');
        }

        let radioButtons  = document.querySelector('input[name="rounds"]:checked');
        game.scoreToWin = radioButtons.value;
        console.log(game.scoreToWin);

    },
    submitPlayerName: function(){
        let inputPlayerName     = document.getElementById("input-player-name");
        let displayPlayerName   = document.getElementById("display-player-name");
        let inputButton         = document.getElementById("submit-name-btn");
        this.playerName         = inputPlayerName.value;

        displayPlayerName.innerHTML = "Player Name: " + this.playerName;
        inputButton.classList.add('hide');
        inputPlayerName.classList.add('hide');
    },
    choicesMade: function(choice){ //player picks 1 of the 3 options and is met with a win, lose, or draw
        this.playerChoice = choice;
        let computerChoice = getRandomItem(this.computerChoices);
        this.computerDecision = computerChoice;

        playerImage.classList.remove("paper");
        playerImage.classList.remove("scissors");
        playerImage.classList.remove("rock");
        playerImage.classList.add(choice);

        computerImage.classList.remove("paper");
        computerImage.classList.remove("scissors");
        computerImage.classList.remove("rock");
        computerImage.classList.add(computerChoice);
        
        if(this.playerChoice === "rock"){
            this.rockPlay();
        }else if (this.playerChoice === "paper"){
            this.paperPlay();
        }else{
            this.scissorsPlay();
        }
        this.checkWin();
    },
    winnerDecided: function(){
        this.gameOver = true;

        if(game.gameWinner == "player"){
                winnerStatus.innerHTML = "Player has won the game!";
        }else{
            winnerStatus.innerHTML ="Computer has won the game!";
        }

        buttons.classList.add('hide');
        gameOverScreen.classList.remove('hide');
    },
    checkWin: function(){
        if(this.playerScore == game.scoreToWin){
            this.gameWinner = "player";
            this.winnerDecided();
        }else if(this.computerScore == game.scoreToWin){
            this.gameWinner = "computer";
            this.winnerDecided();
        }else{
            return;
        }
    },
    rockPlay: function(){
        switch (this.computerDecision) {
            case 'paper':
                roundStatus.innerHTML = "rock loses against paper, 1 point to computer!";
                this.computerScore++;
                this.updateScore();
                break;
            case 'scissors':
                roundStatus.innerHTML = "rock wins against scissors, 1 point to player!";
                this.playerScore++;
                this.updateScore();
                break;
            default:
                roundStatus.innerHTML = "it's a draw! no points awarded.";
                
        }
    },
    paperPlay: function(){
        switch (this.computerDecision) {
            case 'scissors':
                roundStatus.innerHTML = "paper loses against scissors, 1 point to computer!";
                this.computerScore++;
                this.updateScore();
                break;
            case 'rock':
                roundStatus.innerHTML = "paper wins against rock, 1 point to player!";
                this.playerScore++;
                this.updateScore();
                break;
            default:
                roundStatus.innerHTML = "it's a draw! no points awarded.";
                
        }
    },
    scissorsPlay: function(){
        switch (this.computerDecision) {
            case 'rock':
                roundStatus.innerHTML = "scissors loses against rock, 1 point to computer!";
                this.computerScore++;
                this.updateScore();
                break;
            case 'paper':
                roundStatus.innerHTML = "scissors wins against paper, 1 point to player!";
                this.playerScore++;
                this.updateScore();
                break;
            default:
                roundStatus.innerHTML = "it's a draw! no points awarded.";
                
        }
    },
    resetGame: function(){
        game.playerScore = 0;
        game.computerScore = 0;
        game.gameOver = false;
        game.gameWinner = "";
        roundStatus.innerHTML = "";

        buttons.classList.remove('hide');
        gameOverScreen.classList.add('hide');

        game.updateScore();
    },
    returnToMain: function (){
        game.resetGame();
        document.getElementById("display-player-name").innerHTML = "";

        let inputButton     = document.getElementById("submit-name-btn");
        let inputPlayerName = document.getElementById("input-player-name");

        inputButton.classList.remove('hide');
        inputPlayerName.classList.remove('hide');
        splashScreen.classList.remove("hide");
        gameScreen.classList.add("hide");

    }
}


function getRandomItem(array) {
    const randomIndex = Math.floor(Math.random()*array.length);
    const item = array[randomIndex];

    return item;
}


    // Event listeners 


    // for us to input name
    document.getElementById("submit-name-btn").addEventListener('click', game.submitPlayerName);

    // check game start
    document.getElementById("start-btn").addEventListener('click', game.startGame);

    // reset game
    document.getElementById("play-again-btn").addEventListener('click', game.resetGame);

    //go back to main menu
    document.getElementById("main-menu-btn").addEventListener('click', game.returnToMain);
