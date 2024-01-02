window.onload = function () {
    const canvas = document.getElementById("gameCanvas");
    const ctx = canvas.getContext("2d");
    const playButton = document.getElementById("playButton");
    const restartButton = document.getElementById("restartButton");
    const scoreDisplay = document.getElementById("scoreDisplay");

    let isGameRunning = false;
    let score = 0;

    const audioPath = './resources/DragosteaDinTei.mp3';
    const audio = new Audio(); // Audio object

    // Function to generate a random time between 30 and 90 seconds
    function getRandomTime() {
        return Math.floor(Math.random() * (90 - 30 + 1)) + 30;
    }

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
            // Set a random starting time for the audio
            audio.currentTime = getRandomTime();
    
            // Listen for the loadedmetadata event to ensure the audio is ready
            audio.addEventListener("loadedmetadata", () => {
                console.log("Attempting to play audio at time:", audio.currentTime);
    
                isGameRunning = true;
                audio.play()
                    .then(() => {
                        console.log("Audio playback started");
                        playButton.textContent = "Pause";
                    })
                    .catch(error => console.error("Error starting audio playback:", error));
    
                gameLoop();
            });
    
            // Load the audio
            audio.src = audioPath;
            audio.load();
        } else {
            if (audio.paused) {
                audio.play();
                playButton.textContent = "Pause";
            } else {
                audio.pause();
                playButton.textContent = "Play";
            }
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
        isGameRunning = true;
        gameLoop();
    }
};
