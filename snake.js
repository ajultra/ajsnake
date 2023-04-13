const canvas = document.getElementById('game');
const context = canvas.getContext('2d');
const box = 15;
let snake = [{ x: 9 * box, y: 10 * box }];
let food = {
  x: Math.floor(Math.random() * 20) * box,
  y: Math.floor(Math.random() * 20) * box,
};
let direction = 'RIGHT';

document.addEventListener('keydown', updateDirection);

function updateDirection(event) {
  const key = event.key.toUpperCase();
  if (key === 'ARROW_UP' && direction !== 'DOWN') direction = 'UP';
  if (key === 'ARROW_DOWN' && direction !== 'UP') direction = 'DOWN';
  if (key === 'ARROW_LEFT' && direction !== 'RIGHT') direction = 'LEFT';
  if (key === 'ARROW_RIGHT' && direction !== 'LEFT') direction = 'RIGHT';
}

function draw() {
  context.fillStyle = 'black';
  context.fillRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < snake.length; i++) {
    context.fillStyle = 'lime';
    context.fillRect(snake[i].x, snake[i].y, box, box);
  }

  context.fillStyle = 'red';
  context.fillRect(food.x, food.y, box, box);

  let newX = snake[0].x;
  let newY = snake[0].y;

  if (direction === 'UP') newY -= box;
  if (direction === 'DOWN') newY += box;
  if (direction === 'LEFT') newX -= box;
  if (direction === 'RIGHT') newX += box;

  if (newX === food.x && newY === food.y) {
    food = {
      x: Math.floor(Math.random() * 20) * box,
      y: Math.floor(Math.random() * 20) * box,
    };
  } else {
    snake.pop();
  }

  const newHead = { x: newX, y: newY };
  snake.unshift(newHead);

  for (let i = 1; i < snake.length; i++) {
    if (snake[i].x === newX && snake[i].y === newY) {
      clearInterval(game);
      alert('Game Over');
    }
  }

  if (newX < 0 || newX >= canvas.width || newY < 0 || newY >= canvas.height) {
    clearInterval(game);
    alert('Game Over');
  }
}

const game = setInterval(draw, 100);
```

Now, let's add touch support:

1. Add event listeners for touch events:

```javascript
document.addEventListener('touchstart', handleTouchStart);
document.addEventListener('touchmove', handleTouchMove);
```

2. Implement `handleTouchStart` and `handleTouchMove` functions:

```javascript
let touchStartX = null;
let touchStartY = null;

function handleTouchStart(event) {
  touchStartX = event.touches[0].clientX;
  touchStartY = event.touches[0].clientY;
}

function handleTouchMove(event) {
  event.preventDefault();
  if (!touchStartX || !touchStartY) return;

  const touchEndX = event.touches[0].clientX;
  const touchEndY = event.touches[0].clientY;
  const diffX = touchStartX - touchEndX;
  const diffY = touchStartY - touchEndY;

  if (Math.abs(diffX) > Math.abs(diffY)) {
    direction = diffX > 0 && direction !== 'RIGHT' ? 'LEFT' : 'RIGHT';
  } else {
    direction = diffY > 0 && direction !== 'DOWN' ? 'UP' : 'DOWN';
  }

  touchStartX = null;
  touchStartY = null;
}
```

This code adds touch event listeners and updates the game direction based on the swipe direction.

Now you have a simple Snake game with touch support. To improve it further, you can add CSS styles, a game loop, and other enhancements.
```

**JavaScript (snake.js):**

```javascript
const canvas = document.getElementById('game');
const context = canvas.getContext('2d');
const box = 15;
let snake = [{ x: 9 * box, y: 10 * box }];
let food = {
  x: Math.floor(Math.random() * 20) * box,
  y: Math.floor(Math.random() * 20) * box,
};
let direction = 'RIGHT';

document.addEventListener('keydown', updateDirection);

function updateDirection(event) {
  const key = event.key.toUpperCase();
  if (key === 'ARROW_UP' && direction !== 'DOWN') direction = 'UP';
  if (key === 'ARROW_DOWN' && direction !== 'UP') direction = 'DOWN';
  if (key === 'ARROW_LEFT' && direction !== 'RIGHT') direction = 'LEFT';
  if (key === 'ARROW_RIGHT' && direction !== 'LEFT') direction = 'RIGHT';
}

function draw() {
  context.fillStyle = 'black';
  context.fillRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < snake.length; i++) {
    context.fillStyle = 'lime';
    context.fillRect(snake[i].x, snake[i].y, box, box);
  }

  context.fillStyle = 'red';
  context.fillRect(food.x, food.y, box, box);

  let newX = snake[0].x;
  let newY = snake[0].y;

  if (direction === 'UP') newY -= box;
  if (direction === 'DOWN') newY += box;
  if (direction === 'LEFT') newX -= box;
  if (direction === 'RIGHT') newX += box;

  if (newX === food.x && newY === food.y) {
    food = {
      x: Math.floor(Math.random() * 20) * box,
      y: Math.floor(Math.random() * 20) * box,
    };
  } else {
    snake.pop();
  }

  const newHead = { x: newX, y: newY };
  snake.unshift(newHead);

  for (let i = 1; i < snake.length; i++) {
    if (snake[i].x === newX && snake[i].y === newY) {
      clearInterval(game);
      alert('Game Over');
    }
  }

  if (newX < 0 || newX >= canvas.width || newY < 0 || newY >= canvas.height) {
    clearInterval(game);
    alert('Game Over');
  }
}

const game = setInterval(draw, 100);
```

Now, let's add touch support:

1. Add event listeners for touch events:

```javascript
document.addEventListener('touchstart', handleTouchStart);
document.addEventListener('touchmove', handleTouchMove);
```

2. Implement `handleTouchStart` and `handleTouchMove` functions:

```javascript
let touchStartX = null;
let touchStartY = null;

function handleTouchStart(event) {
  touchStartX = event.touches[0].clientX;
  touchStartY = event.touches[0].clientY;
}

function handleTouchMove(event) {
  event.preventDefault();
  if (!touchStartX || !touchStartY) return;

  const touchEndX = event.touches[0].clientX;
  const touchEndY = event.touches[0].clientY;
  const diffX = touchStartX - touchEndX;
  const diffY = touchStartY - touchEndY;

  if (Math.abs(diffX) > Math.abs(diffY)) {
    direction = diffX > 0 && direction !== 'RIGHT' ? 'LEFT' : 'RIGHT';
  } else {
    direction = diffY > 0 && direction !== 'DOWN' ? 'UP' : 'DOWN';
  }

  touchStartX = null;
  touchStartY = null;
}