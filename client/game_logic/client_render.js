// Use namespace SnakeGame.GameLoop.Client

var renderSettings = function renderSettings() {
	return {
		numberOfGridSpacesAcross: SnakeGame.Settings.numberOfGridSpacesAcross,
		canvasWidth: SnakeGame.GameLoop.Client.gameBoardCanvas.width,
		canvasHeight: SnakeGame.GameLoop.Client.gameBoardCanvas.height
	}
};

SnakeGame.GameLoop.Client.renderClient = function renderClient() {

	if (!SnakeGame.Collections.GameStates.findOne().running) return;

	var ctx = SnakeGame.GameLoop.Client.gameBoardContext;
	ctx.clearRect(0, 0, renderSettings().canvasWidth, renderSettings().canvasHeight);

	var gridSize = renderSettings().canvasWidth / renderSettings().numberOfGridSpacesAcross;

	renderOneup(ctx, gridSize);
	renderSnake(ctx, gridSize);

};

var renderSnake = function renderSnake(ctx, gridSize) {

	SnakeGame.GameLoop.Client.snake1 = SnakeGame.GameLoop.Client.snake1 || SnakeGame.Collections.Snakes.findOne();
	var snake = SnakeGame.GameLoop.Client.snake1;
	var snakePoints = snake.position;
	var numSnakePoints = snakePoints.length;

	
	ctx.fillStyle = "#FF0000";
	for (var i = 0; i < numSnakePoints; i++) {
		ctx.fillRect(snakePoints[i].x * gridSize, snakePoints[i].y * gridSize, gridSize, gridSize);
	}

};

var renderOneup = function renderOneup(ctx, gridSize) {
	var oneup = SnakeGame.Collections.Obstacles.findOne();
	if (oneup) {
		ctx.fillStyle = "#00FF00";
		ctx.fillRect(oneup.x * gridSize, oneup.y * gridSize, gridSize, gridSize);
	}
};