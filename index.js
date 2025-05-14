const possibleButtons = ['red', 'green', 'blue', 'yellow'];
const sounds = {
    'red':new Audio('sounds/red.mp3'),
    'green':new Audio('sounds/green.mp3'),
    'blue':new Audio('sounds/blue.mp3'),
    'yellow':new Audio('sounds/yellow.mp3'),
    'wrong':new Audio('sounds/wrong.mp3'),
};

let gameActive = false;
let pattern = [];
let userInput = [];
let score = 0;
let highScore = 0;

// Start game on keydown
$(document).keydown(function () {
    startGame();
});

const instructionHeader = $("#instruction-header");

// Start game logic
async function startGame() {
    if (!gameActive) {
        $('body').css('background-color', 'black');
        gameActive = true;
        score = 0;
        pattern = [];
        userInput = [];
        await addButton();
        await playPattern();
        instructionHeader.text("Score: 0\tHigh Score: " + highScore);
    }
}

// Add a new button to the sequence
async function addButton() {
    const buttonToAdd = possibleButtons[Math.floor(Math.random() * possibleButtons.length)];
    pattern.push(buttonToAdd);
}

// Log user input and check correctness
async function logInput(clickedNode) {
    let clickedItem = '';
    for (const color of possibleButtons) {
        if (clickedNode.classList.contains(color)) {
            clickedItem = color;
            break;
        }
    }
    await flashButton( clickedNode,100)
    userInput.push(clickedItem);
    const currentStep = userInput.length - 1;

    if (pattern[currentStep] === clickedItem) {
        if (userInput.length === pattern.length) {
            score++;
            highScore = Math.max(score, highScore);
            instructionHeader.text("Score: "+ score + "\tHigh Score: " + highScore);
            userInput = [];
            await sleep(500);
            await addButton();
            await playPattern();
        }
    } else {
        endGame();
    }
}

// End the game
function endGame() {
    gameActive = false;
    instructionHeader.text('Game Over! Your score is: ' + score + '. High score: ' + highScore + ". Press any key to restart.");
    pattern = [];
    userInput = [];
    score = 0;
    $('body').css('background-color', 'red');
}

// Utility to delay execution
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Play the pattern visually
async function playPattern() {
    for (let color of pattern) {
        const button = document.getElementById(color);
        await flashButton(button);
        await sleep(300);
    }
}

// Flash one button
async function flashButton(button, time = 500) {
    button.classList.add('pressed');
    const sound = sounds[button.id].cloneNode();
    sound.play();
    await sleep(time);
    button.classList.remove('pressed');
}

// Bind click handlers to all color buttons
for (let color of possibleButtons) {
    console.log(color);
    document.getElementById(color).addEventListener('click', function () {
        if (gameActive) {
            logInput(this);
        }else {
            startGame();
        }
    });
}
