Meteor.startup(function() {
	Meteor.setInterval(function() {

		var gameState = SnakeGame.Collections.GameStates.findOne();

		if (gameState && !gameState.running) return;

		// Detect Collision : head of snake and wall
		var snake1 = SnakeGame.Collections.Snakes.findOne();
		if (!snake1) return;
		var oneup = SnakeGame.Collections.Obstacles.findOne();
		var gState = SnakeGame.Collections.GameStates.findOne();
		var numSnakePoints = snake1.position.length;

		var position = snake1.position.pop();
		var numSnakePoints = snake1.position.length;

		//console.log(position);

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


		for (var i = 0; i < numSnakePoints; i++) {
			if (position.x === snake1.position[i].x && position.y === snake1.position[i].y) {
				console.log("Snake Hit!");

				SnakeGame.Collections.GameStates.update(gState._id, {
					$set: {
						running: false
					}
				});
			}
		}


		if (oneup && position.x === oneup.x && position.y === oneup.y) {
			console.log("One UP!");
			SnakeGame.Logic.createObstacle();
			SnakeGame.Logic.updateSnakeAfterOneup(0);
			// var gState = SnakeGame.Collections.GameStates.findOne();
			// SnakeGame.Collections.GameStates.update(gState._id, {
			// 	$set: {
			// 		running: false
			// 	}
			// });
		}



	}, 10000000); // Needs to be set to 10ms

	Meteor.setInterval(function() {

		//console.log(SnakeGame.Logic.createObstacle());
		//console.log(SnakeGame.Collections.Obstacles.find().count());

	}, 1000); // Needs to be set to 10ms
});