//Global variables
let randomNumber;
let attempts = 0;
let wins = 0;
let losses = 0;

initializeGame();

document.querySelector("#resetBtn").addEventListener("click", initializeGame);

function initializeGame() {
    randomNumber = Math.floor(Math.random() * 99) + 1;
    console.log("randomNumber: " + randomNumber);
    attempts = 0;

     // hiding the Reset button
    document.querySelector("#resetBtn").style.display = "none";

    // showing the Guess button
    document.querySelector("#guessBtn").style.display = "inline";
  
    let playerGuess = document.querySelector("#playerGuess");
    playerGuess.focus(); // adding focus to textbox
    playerGuess.value = ""; // clearing the textbox

    let feedback = document.querySelector("#feedback");
    feedback.textContent = "";

    // clearing previous guesses
    document.querySelector("#previousGuesses").textContent = "";

    // clearing attempts left
    document.querySelector("#attemptsLeft").textContent = 7 - attempts;

    //adding focus to textbox
    document.querySelector("#playerGuess").focus();

    //Event Listeners
    document.querySelector("#guessBtn").addEventListener("click", checkGuess);
}

function checkGuess() {
    let feedback = document.querySelector("#feedback");
    feedback.textContent = "";
    let playerGuess = document.querySelector("#playerGuess").value;
    console.log("PlayerGuess: " + playerGuess);
    if (playerGuess < 1 || playerGuess > 99) {
        feedback.textContent = "Enter a number between 1 and 99";
        feedback.style.color = "red";
        return;
    }
    attempts++;
    console.log("Attempts: " + attempts);
    feedback.style.color = "orange";
    if (playerGuess == randomNumber) {
        wins++;
        document.querySelector("#wins").textContent = wins;
        feedback.textContent = "You guessed it! You Won!";
        feedback.style.color = "darkgreen";
        gameOver();
    } else {
        document.querySelector("#previousGuesses").textContent += playerGuess + " ";
        document.querySelector("#attemptsLeft").textContent = 7 - attempts;
        if (attempts == 7) {
            losses++;
            document.querySelector("#losses").textContent = losses;
            feedback.textContent = "Sorry, you lost! The number was " + randomNumber;
            feedback.style.color = "red";
            gameOver();
        } else if (playerGuess > randomNumber) {
            feedback.textContent = "Guess was high";
        } else {
            feedback.textContent = "Guess was low";
        }
    }
}

function gameOver() {
    let guessBtn = document.querySelector("#guessBtn");
    let resetBtn = document.querySelector("#resetBtn");
    guessBtn.style.display = "none";    // Hides Guess button
    resetBtn.style.display = "inline";  // Displays Reset button
}

// document.querySelector("h1").style.color = "red";
