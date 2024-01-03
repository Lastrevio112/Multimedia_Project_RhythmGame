window.onload = function () {
    const canvas = document.getElementById("gameCanvas");
    const ctx = canvas.getContext("2d");
    const playButton = document.getElementById("playButton");
    const restartButton = document.getElementById("restartButton");
    const scoreDisplay = document.getElementById("scoreDisplay");
    const highScoreDisplay = document.getElementById("highScoreDisplay");

    let isGameRunning = false;
    let isGamePaused = false;
    let score = 0;
    let tiles = [];
    let highScore = localStorage.getItem("highScore") || 0;

    const audioPath = './resources/DragosteaDinTei.mp3';
    const audio = new Audio(); // Audio object

    // Function to generate a random time between 30 and 90 seconds
    function getRandomTime() {
        return Math.floor(Math.random() * (90 - 30 + 1)) + 30;
    }

    // Game Loop
    function gameLoop() {
        if (isGameRunning && !isGamePaused) {
            // Clear canvas and draw game elements
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Update and draw tiles
            tiles.forEach(tile => {
                tile.update();
                tile.draw();

                // Check if tile reached the bottom
                if (tile.isAtBottom()) {
                    gameOver();
                }
            });

            // Remove tiles that have reached the bottom
            tiles = tiles.filter(tile => !tile.isAtBottom());

            // Check if a new tile should be added
            if (Math.random() < 0.02) {
                tiles.push(new Tile());
            }

            requestAnimationFrame(gameLoop);
        }
    }

    function startGame() {
        document.getElementById('gameCanvas').style.display = 'block';
        init();
    }

    function pauseGame() {
        isGamePaused = true;
        audio.pause();
    }

    function resumeGame() {
        isGamePaused = false;
        audio.play();
        gameLoop();
    }

    function gameOver() {
        isGameRunning = false;
        isGamePaused = true;
        audio.pause();

        // Update high score if needed
        if (score > highScore) {
            highScore = score;
            localStorage.setItem("highScore", highScore);
            highScoreDisplay.textContent = "High Score: " + highScore;
        }

        alert("Game Over! Your score: " + score);
    }

    // Event listener for keydown events
    window.addEventListener("keydown", handleKeyDown);

    // Handle keydown event
    function handleKeyDown(event) {
        if (isGameRunning && !isGamePaused) {
            // Check the pressed key and remove corresponding tiles
            switch (event.key) {
                case "a":
                    removeTileFromRow(0);
                    break;
                case "s":
                    removeTileFromRow(1);
                    break;
                case "k":
                    removeTileFromRow(2);
                    break;
                case "l":
                    removeTileFromRow(3);
                    break;
                default:
                    break;
            }
        }
    }

    // Function to remove a tile from the specified row
    function removeTileFromRow(row) {
        tiles = tiles.filter(tile => {
            if (Math.floor(tile.x / tile.width) === row && !tile.isAtBottom()) {
                // Player removed a tile from the correct row
                score++;
                scoreDisplay.textContent = "Score: " + score;
                return false; // Filter out the removed tile
            } else {
                return true; // Keep tiles that are not in the specified row or have reached the bottom
            }
        });
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
                isGamePaused = false;
                score = 0;
                scoreDisplay.textContent = "Score: " + score;

                audio.play()
                    .then(() => {
                        console.log("Audio playback started");
                        playButton.textContent = "Pause";
                        gameLoop();
                    })
                    .catch(error => console.error("Error starting audio playback:", error));
            });

            // Load the audio
            audio.src = audioPath;
            audio.load();
        } else {
            if (isGamePaused) {
                resumeGame();
                playButton.textContent = "Pause";
            } else {
                pauseGame();
                playButton.textContent = "Play";
            }
        }
    });

    restartButton.addEventListener("click", () => {
        if (confirm("Do you want to restart the game?")) {
            location.reload();
        }
    });

    // Initialize game
    function init() {
        // Set up game elements
        // Load audio
        audio.src = audioPath;
        audio.load();
        isGameRunning = true;
        isGamePaused = false;
        gameLoop();
    }

    // Tile class
    class Tile {
        constructor() {
            this.width = canvas.width / 4;
            this.height = 50;
            this.x = Math.floor(Math.random() * 4) * this.width;
            this.y = -this.height;
            this.speed = 3;
        }

        update() {
            this.y += this.speed;
        }

        draw() {
            ctx.fillStyle = "black";
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }

        isAtBottom() {
            return this.y + this.height >= canvas.height;
        }
    }
};
