let randomNumber = Math.floor(Math.random() * 100) + 1;

const guesses = document.querySelector(".guesses");
const lastResult = document.querySelector(".last-result");
const lowOrHi = document.querySelector(".low-or-hi");

const guessSubmit = document.querySelector(".guess-submit");
const guessField = document.querySelector("#guess-field");

let guessCount = 1;
let resetButton;

function checkGuess(event) {
    event.preventDefault();
    const userGuess = Number(guessField.value);

    const guessResult = document.createElement("p");
    guessResult.textContent = `Guess ${guessCount}: ${userGuess} - `;

    if (isNaN(userGuess) || userGuess < 1 || userGuess > 100) {
        guessResult.textContent +=
            "Please enter a valid number between 1 and 100.";
        guessResult.style.backgroundColor = "#ffc75f";
    } else if (userGuess === randomNumber) {
        guessResult.textContent += "Correct!";
        guessResult.style.backgroundColor = "#328032";
        setGameOver();
    } else if (guessCount === 10) {
        guessResult.style.backgroundColor = "#ff8282";
        guessResult.textContent += "Game over!";
        setGameOver();
    } else {
        guessResult.style.backgroundColor = "#ff8282";
        if (userGuess < randomNumber) {
            guessResult.textContent += " Too low.";
        } else {
            guessResult.textContent += " Too high.";
        }
        guessCount++;
    }

    lastResult.prepend(guessResult);
    guessField.value = "";
    guessField.focus();
}

guessSubmit.addEventListener("click", checkGuess);

function setGameOver() {
    guessField.disabled = true;
    guessSubmit.disabled = true;
    resetButton = document.createElement("button");
    resetButton.textContent = "Start new game";
    guesses.prepend(resetButton);
    resetButton.addEventListener("click", resetGame);
}

function resetGame() {
    guessCount = 1;

    const resetParas = document.querySelectorAll(".result-paras p");
    for (const resetPara of resetParas) {
        resetPara.textContent = "";
    }

    resetButton.remove();
    guessField.disabled = false;
    guessSubmit.disabled = false;
    guessField.value = "";
    guessField.focus();

    lastResult.style.backgroundColor = "white";

    randomNumber = Math.floor(Math.random() * 100) + 1;
}
