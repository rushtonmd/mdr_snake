chatStream = new Meteor.Stream('chat');

chatStream.on('chat', function(message) {
	console.log("Chat: " + message);
});

chatStream.on('snake1_update', function(snake1) {
	console.log("Updating snake1!");
	SnakeGame.GameLoop.Client.snake1 = snake1;
});

chatStream.on('snake1_oneup', function() {
	console.log("OneUp snake1!");
	updateSnakeAfterOneup(SnakeGame.GameLoop.Client.snake1);

});


var updateSnakeAfterOneup = function updateSnakeAfterOneup(snake) {

	console.log("Updating after One up!");
	//console.log(snake.position);
	//SnakeGame.GameLoop.Client.snake1 = SnakeGame.GameLoop.Client.snake1 || SnakeGame.Collections.Snakes.findOne();
	var snakePoints = snake.position;
	var currentHead = snakePoints.slice(-1)[0];
	//console.log(snake.position);

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

	//snake.position = snakePoints;
	//console.log(snake.position);

	//chatStream.emit('snake1_update', snake);


};