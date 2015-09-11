SnakeGame.Logic.detectCollisionWithWall = function detectCollisionWithWall(snake1) {

	console.log("Detect Collision With Wall");
	//console.log(snake1.position);


	var gState = SnakeGame.Collections.GameStates.findOne();
	var position = snake1.position.slice(0);
	position = position.pop();
	//console.log(snake1.position);

	if (position.x < 0 || position.x >= SnakeGame.Settings.numberOfGridSpacesAcross) {
		console.log("Collision!");

		SnakeGame.Collections.GameStates.update(gState._id, {
			$set: {
				running: false
			}
		});
	}

	if (position.y < 0 || position.y >= SnakeGame.Settings.numberOfGridSpacesAcross) {
		console.log("Collision!");

		SnakeGame.Collections.GameStates.update(gState._id, {
			$set: {
				running: false
			}
		});
	}
};

SnakeGame.Logic.detectCollisionWithOneUp = function detectCollisionWithOneUp(snake) {

	console.log("Detect Collision OneUp");
	//console.log(snake.position);
	var oneup = SnakeGame.Collections.Obstacles.findOne();
	var position = snake.position.slice(0);
	position = position.pop();
	//snake.position.push(position);

	if (oneup && position.x === oneup.x && position.y === oneup.y) {
		console.log("One UP!");

		chatStream.emit('snake1_oneup');
		//SnakeGame.Logic.updateSnakeAfterOneup(snake);
		SnakeGame.Logic.createObstacle();
		//console.log(snake.position);


	}

};



SnakeGame.Logic.createObstacle = function createObstacle() {
	// Game Board is 20 x 20

	// Remove all the ONEUP obstacles
	SnakeGame.Collections.Obstacles.remove({
		type: "ONEUP"
	});

	var emptyList = [];
	var snake = SnakeGame.Collections.Snakes.findOne();

	if (!snake) return;

	var snakePoints = snake.position;
	var numSnakePoints = snakePoints.length;
	var allSnakePoints = [];

	for (var i = 0; i < numSnakePoints; i++) {
		allSnakePoints.push(snakePoints[i].x + snakePoints[i].y * SnakeGame.Settings.numberOfGridSpacesAcross);
	}

	var pArrayLength = Math.pow(SnakeGame.Settings.numberOfGridSpacesAcross, 2);
	for (var i = 0; i < pArrayLength; i++) {
		if (allSnakePoints.indexOf(i) < 0) emptyList.push(i);
	}

	var oPointNum = emptyList[Math.floor(Math.random() * pArrayLength)];
	var oPoint = {
		type: "ONEUP",
		x: oPointNum % SnakeGame.Settings.numberOfGridSpacesAcross,
		y: Math.floor(oPointNum / SnakeGame.Settings.numberOfGridSpacesAcross)
	}

	return SnakeGame.Collections.Obstacles.insert(oPoint);

};



SnakeGame.Logic.updateSnakeAfterOneup = function updateSnakeAfterOneup(snake) {



	console.log("Updating after One up!");
	console.log(snake.position);
	//SnakeGame.GameLoop.Client.snake1 = SnakeGame.GameLoop.Client.snake1 || SnakeGame.Collections.Snakes.findOne();
	var snakePoints = snake.position;
	var currentHead = snakePoints.slice(-1)[0];
	console.log(snake.position);

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

	snake.position = snakePoints;
	console.log(snake.position);

	chatStream.emit('snake1_update', snake);

	// SnakeGame.Collections.Snakes.remove({});

	// SnakeGame.Collections.Snakes.insert({
	// 	direction: SnakeGame.GameLoop.Client.snake1.direction,
	// 	position: snakePoints

	// }, function(error, num) {
	// 	console.log("snake updated! " + error + " : " + num)
	// });

	// console.log(SnakeGame.Collections.Snakes.findOne().position);

};


SnakeGame.Logic.updateSnake = function updateSnake(newDirection) {
	SnakeGame.GameLoop.Client.snake1 = SnakeGame.Collections.Snakes.findOne();

	if ((SnakeGame.GameLoop.Client.snake1.direction === "UP" || SnakeGame.GameLoop.Client.snake1.direction === "DOWN") && (newDirection === "UP" || newDirection === "DOWN")) return;
	if ((SnakeGame.GameLoop.Client.snake1.direction === "RIGHT" || SnakeGame.GameLoop.Client.snake1.direction === "LEFT") && (newDirection === "RIGHT" || newDirection === "LEFT")) return;

	var snakePoints = SnakeGame.GameLoop.Client.snake1.position;
	snakePoints.shift();
	var currentHead = snakePoints.slice(-1)[0];

	if (newDirection === "DOWN") {
		snakePoints.push({
			x: currentHead.x,
			y: currentHead.y + 1
		});

	}

	if (newDirection === "UP") {
		snakePoints.push({
			x: currentHead.x,
			y: currentHead.y - 1
		});

	}

	if (newDirection === "LEFT") {
		snakePoints.push({
			x: currentHead.x - 1,
			y: currentHead.y
		});

	}

	if (newDirection === "RIGHT") {
		snakePoints.push({
			x: currentHead.x + 1,
			y: currentHead.y
		});

	}

	SnakeGame.Collections.Snakes.update(SnakeGame.GameLoop.Client.snake1._id, {
		$set: {
			direction: newDirection,
			position: snakePoints
		}
	});

}