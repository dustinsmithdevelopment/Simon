let pattern = [];
let userInput = [];
let score = 0;
let highScore = 0;

// Sleep utility function
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Flash each button in the pattern
async function playPattern() {
    for (let i = 0; i < pattern.length; i++) {
        const button = document.getElementById(pattern[i]);
        await flashButton(button);
        await sleep(300); // Delay between flashes
    }
}

// Flash a single button
async function flashButton(button) {
    button.classList.add('pressed');
    await sleep(500); // Duration of the flash
    button.classList.remove('pressed');
}
