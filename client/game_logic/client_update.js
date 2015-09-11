SnakeGame.GameLoop.Client.queueUpdates = function queueUpdates(numTicks) {

	SnakeGame.GameLoop.Client.lastTick = SnakeGame.GameLoop.Client.lastTick + SnakeGame.GameLoop.Client.tickLength; //Now lastTick is this tick.

	update(SnakeGame.GameLoop.Client.lastTick);

}

var update = function update(tick) {
	SnakeGame.GameLoop.Client.snake1 = SnakeGame.GameLoop.Client.snake1 || SnakeGame.Collections.Snakes.findOne();
	var snake = SnakeGame.GameLoop.Client.snake1;

	//SnakeGame.GameLoop.Client.snake1 = SnakeGame.Collections.Snakes.findOne();
	var snakePoints = snake.position;
	snakePoints.shift();
	var currentHead = snakePoints.slice(-1)[0];

	if (snake.direction === "DOWN") {
		snakePoints.push({
			x: currentHead.x,
			y: currentHead.y + 1
		});

	}

	if (snake.direction === "UP") {
		snakePoints.push({
			x: currentHead.x,
			y: currentHead.y - 1
		});

	}

	if (snake.direction === "LEFT") {
		snakePoints.push({
			x: currentHead.x - 1,
			y: currentHead.y
		});

	}

	if (snake.direction === "RIGHT") {
		snakePoints.push({
			x: currentHead.x + 1,
			y: currentHead.y
		});

	}

	SnakeGame.GameLoop.Client.snake1.position = snakePoints;

	chatStream.emit('snake1_update', SnakeGame.GameLoop.Client.snake1);

	// SnakeGame.Collections.Snakes.update(SnakeGame.GameLoop.Client.snake1._id, {
	// 	$set: {
	// 		position: snakePoints
	// 	}
	// });



}