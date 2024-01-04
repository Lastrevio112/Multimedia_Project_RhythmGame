window.onload = function () {
    alert("Welcome to the Rhythm Tapper Game!\n\nHow to Play:\n- Click the 'Play' button to start the game.\n- Use keys 'A', 'S', 'K', and 'L' to remove tiles in the corresponding rows.\n- Your goal is to tap the falling tiles to the beat of the music.\n- Each successful tap increases your score.\n- If a tile reaches the bottom without being tapped, it's game over.\n- Challenge yourself to achieve the highest score.");

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
    highScoreDisplay.textContent = "High Score: " + highScore;

    const audioPath = './resources/DragosteaDinTei.mp3';
    const audio = new Audio();

    function getRandomTime() {
        return Math.floor(Math.random() * (60 - 20 + 1)) + 20;
    }

	function gameLoop() {
		if (isGameRunning && !isGamePaused) {
			ctx.clearRect(0, 0, canvas.width, canvas.height);

			tiles.forEach(tile => {
				tile.update();
				tile.draw();

				if (tile.isAtBottom()) {
					gameOver();
				}
			});

			tiles = tiles.filter(tile => !tile.isAtBottom());

			const columnOccupied = [false, false, false, false];
			tiles.forEach(tile => {
				const column = Math.floor(tile.x / tile.width);
				columnOccupied[column] = true;
			});

			const numberOfTiles = tiles.length;

			if (numberOfTiles === 0) {
				tiles.push(new Tile());
			}

			if (Math.random() < 0.01 && !columnOccupied.every(occupied => occupied) && numberOfTiles < 4) {
				tiles.push(new Tile());
			}

			requestAnimationFrame(gameLoop);
		}
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

        if (score > highScore) {
            highScore = score;
            localStorage.setItem("highScore", highScore);
            highScoreDisplay.textContent = "High Score: " + highScore;
        }

        alert("Game Over! Your score: " + score);
    }

    window.addEventListener("keydown", handleKeyDown);

    function handleKeyDown(event) {
        if (isGameRunning && !isGamePaused) {
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

function removeTileFromRow(row) {
    let lastTileIndex = -1;
    let maxY = -1;

    for (let i = 0; i < tiles.length; i++) {
        const tile = tiles[i];
        const tileRow = Math.floor(tile.x / tile.width);

        if (tileRow === row && tile.y > maxY && !tile.isAtBottom()) {
            maxY = tile.y;
            lastTileIndex = i;
        }
    }

    if (lastTileIndex !== -1) {
        const removedTile = tiles.splice(lastTileIndex, 1)[0];
        score++;
        scoreDisplay.textContent = "Score: " + score;
    }
}


	playButton.addEventListener("click", () => {
		if (!isGameRunning) {
			audio.currentTime = getRandomTime();

			audio.addEventListener("loadedmetadata", () => {
				setTimeout(() => {
					isGameRunning = true;
					isGamePaused = false;
					score = 0;
					scoreDisplay.textContent = "Score: " + score;

					audio.play()
						.then(() => {
							playButton.textContent = "Pause";
							gameLoop();
						})
						.catch(error => console.error("Error starting audio playback:", error));
				}, 2000);
			});

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
            setTimeout(() => {
                isGameRunning = true;
                isGamePaused = false;
                score = 0;
                scoreDisplay.textContent = "Score: " + score;

                highScoreDisplay.textContent = "High Score: " + highScore;

                tiles = [];

                gameLoop();
            }, 2000);
        }
    });

    function init() {
        audio.src = audioPath;
        audio.load();
        isGameRunning = true;
        isGamePaused = false;
        gameLoop();
    }

	class Tile {
		constructor() {
			this.width = canvas.width / 4;
			this.height = 50;
			this.x = Math.floor(Math.random() * 4) * this.width;
			this.y = -this.height;
			this.speed = 2;
		}

		update() {
			this.y += this.speed;
		}

		draw() {
			ctx.fillStyle = "black";
			ctx.fillRect(this.x, this.y, this.width, this.height);

			ctx.strokeStyle = "gray";
			ctx.lineWidth = 2;

			for (let i = 1; i < 4; i++) {
				const dividerX = i * (canvas.width / 4);
				ctx.beginPath();
				ctx.moveTo(dividerX, 0);
				ctx.lineTo(dividerX, canvas.height);
				ctx.stroke();
			}
		}

		isAtBottom() {
			return this.y + this.height >= canvas.height;
		}
	}
};
