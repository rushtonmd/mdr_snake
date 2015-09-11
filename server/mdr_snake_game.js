Meteor.startup(function() {

	initializeDefaultGame();
});

Meteor.methods({
	restartGame: function() {
		// Check argument types

		console.log("Restarting Game!");

		initializeDefaultGame();

	}, 
	updateSnake: function(direction){

		console.log("Updating Snake!");

		SnakeGame.Logic.updateSnake(direction);
	}
});

var initializeDefaultGame = function initializeDefaultGame() {



	SnakeGame.Collections.Snakes.remove({});
	SnakeGame.Collections.Snakes.insert({
		direction: "DOWN",
		position: [{
			x: 10,
			y: 1
		}, {
			x: 10,
			y: 2
		}, {
			x: 10,
			y: 3
		}]
	});

	// Create an obstacle
	SnakeGame.Logic.createObstacle();

	SnakeGame.Collections.GameStates.remove({});

	SnakeGame.Collections.GameStates.insert({
		running: true
	});

};