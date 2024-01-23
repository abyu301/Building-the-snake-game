const gameBoard = document.getElementById("game-board");

let snake = [{ x: 10, y: 10 }];
let food = { x: 5, y: 5 };
let direction = "right";

function draw() {
    gameBoard.innerHTML = "";

    // Draw snake
    snake.forEach(segment => {
        const snakeElement = document.createElement("div");
        snakeElement.classList.add("snake");
        snakeElement.style.left = segment.x * 20 + "px";
        snakeElement.style.top = segment.y * 20 + "px";
        gameBoard.appendChild(snakeElement);
    });

    // Draw food
    const foodElement = document.createElement("div");
    foodElement.classList.add("food");
    foodElement.style.left = food.x * 20 + "px";
    foodElement.style.top = food.y * 20 + "px";
    gameBoard.appendChild(foodElement);
}

function move() {
    const head = { ...snake[0] };

    switch (direction) {
        case "up":
            head.y -= 1;
            break;
        case "down":
            head.y += 1;
            break;
        case "left":
            head.x -= 1;
            break;
        case "right":
            head.x += 1;
            break;
    }

    snake.unshift(head);

    // Check if snake eats food
    if (head.x === food.x && head.y === food.y) {
        generateFood();
    } else {
        snake.pop();
    }
}

function generateFood() {
    food = {
        x: Math.floor(Math.random() * 15),
        y: Math.floor(Math.random() * 15)
    };

    // Ensure food does not appear on the snake
    while (snake.some(segment => segment.x === food.x && segment.y === food.y)) {
        food = {
            x: Math.floor(Math.random() * 15),
            y: Math.floor(Math.random() * 15)
        };
    }
}

function handleKeyPress(event) {
    switch (event.key) {
        case "ArrowUp":
            direction = "up";
            break;
        case "ArrowDown":
            direction = "down";
            break;
        case "ArrowLeft":
            direction = "left";
            break;
        case "ArrowRight":
            direction = "right";
            break;
    }
}

document.addEventListener("keydown", handleKeyPress);

function gameLoop() {
    move();
    draw();
}

setInterval(gameLoop, 200);
