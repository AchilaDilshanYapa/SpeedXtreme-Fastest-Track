let playerCar;
let gameArea;
let score = 0;
let gameLoop;
let obstacles = [];
let isGameOver = false;

// Initialize game elements
function init() {
    playerCar = document.getElementById('player-car');
    gameArea = document.getElementById('game-area');
    document.addEventListener('keydown', handleKeyPress);
    startGame();
}

// Handle keyboard controls
function handleKeyPress(e) {
    if (isGameOver) return;
    
    const left = playerCar.offsetLeft;
    const step = 20;
    
    if (e.key === 'ArrowLeft' && left > 0) {
        playerCar.style.left = (left - step) + 'px';
    }
    if (e.key === 'ArrowRight' && left < gameArea.offsetWidth - playerCar.offsetWidth) {
        playerCar.style.left = (left + step) + 'px';
    }
}

// Create obstacles
function createObstacle() {
    const obstacle = document.createElement('div');
    obstacle.className = 'obstacle';
    obstacle.style.left = Math.random() * (gameArea.offsetWidth - 40) + 'px';
    obstacle.style.top = '-60px';
    gameArea.appendChild(obstacle);
    obstacles.push(obstacle);
}

// Move obstacles
function moveObstacles() {
    obstacles.forEach((obstacle, index) => {
        const top = obstacle.offsetTop;
        if (top > gameArea.offsetHeight) {
            obstacle.remove();
            obstacles.splice(index, 1);
            score += 10;
            updateScore();
        } else {
            obstacle.style.top = (top + 5) + 'px';
            checkCollision(obstacle);
        }
    });
}

// Check for collisions
function checkCollision(obstacle) {
    const playerRect = playerCar.getBoundingClientRect();
    const obstacleRect = obstacle.getBoundingClientRect();
    
    if (!(playerRect.right < obstacleRect.left || 
          playerRect.left > obstacleRect.right || 
          playerRect.bottom < obstacleRect.top || 
          playerRect.top > obstacleRect.bottom)) {
        gameOver();
    }
}

// Update score display
function updateScore() {
    document.getElementById('score').textContent = `Score: ${score}`;
}

// Game over handling
function gameOver() {
    isGameOver = true;
    clearInterval(gameLoop);
    document.getElementById('game-over').classList.remove('hidden');
    document.getElementById('final-score').textContent = score;
}

// Restart game
function restartGame() {
    location.reload();
}

// Start game
function startGame() {
    score = 0;
    isGameOver = false;
    obstacles.forEach(obstacle => obstacle.remove());
    obstacles = [];
    document.getElementById('game-over').classList.add('hidden');
    
    gameLoop = setInterval(() => {
        if (Math.random() < 0.03) {
            createObstacle();
        }
        moveObstacles();
    }, 50);
}

// Initialize the game when the page loads
window.onload = init;