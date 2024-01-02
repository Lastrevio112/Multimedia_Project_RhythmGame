// Variables
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const playButton = document.getElementById("playButton");
const restartButton = document.getElementById("restartButton");
const scoreDisplay = document.getElementById("scoreDisplay");

let isGameRunning = false;
let score = 0;


const audioPath = 'ENTER HERE AUDIO PATH TO DRAGOSTEA DIN TEI LATER'; //MODIFICATI AICI

// Game Loop
function gameLoop() {
    if (isGameRunning) {
        // Clear canvas and draw game elements
        // Check if player tapped/clicked in rhythm with the music and update score

        requestAnimationFrame(gameLoop);
    }
}


function startGame() {
    document.getElementById('gameCanvas').style.display = 'block';
    init();
}


// Event Listeners
playButton.addEventListener("click", () => {
    if (!isGameRunning) {
        isGameRunning = true;
        audio.play();
        gameLoop();
    }
});

restartButton.addEventListener("click", () => {
    if (confirm("Do you want to restart the game?"))
        location.reload();
});


canvas.addEventListener("click", () => {
    if (isGameRunning) {
        // Check if click is in rhythm with the music and update score
    }
});


// Initialize game
function init() {
    // Set up game elements
    // Load audio
    audio.src = audioPath;
    audio.load();
    audio.play();
    isGameRunning = true;
    gameLoop();
}