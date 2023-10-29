// Variables
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const startButton = document.getElementById("startButton");
const scoreDisplay = document.getElementById("scoreDisplay");

let isGameRunning = false;
let score = 0;
let selectedSong = '';


// Audio
const audioPaths = {
    song1: 'path/to/song1.mp3',
    song2: 'path/to/song2.mp3',
    song3: 'path/to/song3.mp3'
};


// Game Loop
function gameLoop() {
    if (isGameRunning) {
        // Clear canvas and draw game elements
        // Check if player tapped/clicked in rhythm with the music and update score

        requestAnimationFrame(gameLoop);
    }
}


function startGame(song) {
    selectedSong = song;
    document.getElementById('menu').style.display = 'none';
    document.getElementById('gameCanvas').style.display = 'block';
    document.getElementById('backButton').style.display = 'block';
    init();
}


// Event Listeners
startButton.addEventListener("click", () => {
    if (!isGameRunning) {
        isGameRunning = true;
        audio.play();
        gameLoop();
    }
});

document.getElementById('backButton').addEventListener('click', () => {
    isGameRunning = false;
    audio.pause();
    document.getElementById('menu').style.display = 'block';
    document.getElementById('gameCanvas').style.display = 'none';
    document.getElementById('backButton').style.display = 'none';
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
    audio.src = audioPaths[selectedSong];
    audio.load();
    audio.play();
    isGameRunning = true;
    gameLoop();
}


//FUNCTION CALLS:
init();
