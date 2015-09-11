// Get arrow key presses
// Not passing a value allows server to be authoritative
Meteor.startup(function() {
	window.addEventListener("keydown", function(e) {
		switch (e.keyCode) {
			case 37:
				//Meteor.call('LEFT');
				changeSnakeDirection('LEFT');
				break;
			case 38:
				//Meteor.call('UP');
				changeSnakeDirection('UP');
				break;
			case 39:
				//Meteor.call('RIGHT');
				changeSnakeDirection('RIGHT');
				break;
			case 40:
				//Meteor.call('DOWN');
				changeSnakeDirection('DOWN');
				break;
		}
	});

});


var changeSnakeDirection = function changeSnakeDirection(direction) {;
	console.log("Changing snake direction to: " + direction);

	//Meteor.call('updateSnake', direction);

	//return;

	//var snake = SnakeGame.Collections.Snakes.findOne();
	SnakeGame.GameLoop.Client.snake1 = SnakeGame.GameLoop.Client.snake1 || SnakeGame.Collections.Snakes.findOne();
	var snake = (SnakeGame.GameLoop.Client.snake1 || SnakeGame.Collections.Snakes.findOne());

	// Don't change direction if it is impossible
	if (snake.direction === direction) return;

	if ((snake.direction === "UP" || snake.direction === "DOWN") && (direction === "UP" || direction === "DOWN")) return;
	if ((snake.direction === "RIGHT" || snake.direction === "LEFT") && (direction === "RIGHT" || direction === "LEFT")) return;


	SnakeGame.GameLoop.Client.snake1.direction = direction;


	chatStream.emit('snake1_update', SnakeGame.GameLoop.Client.snake1);

	// SnakeGame.Collections.Snakes.update(snake._id, {
	// 	$set: {
	// 		direction: direction
	// 	}
	// });

	//Session.set('direction', direction);


};


// counter starts at 0
Session.setDefault('direction', "");

Template.hello.helpers({
	direction: function() {
		return Session.get('direction');
	}
});

Template.hello.events({
	'click .start': function() {
		// increment the counter when button is clicked
		//Session.set('direction', Session.get('counter') + 1);
		console.log("START");
		chatStream.emit('chat', "Start this bitch!");
		SnakeGame.GameLoop.Client.startMainGameLoop();
		//SnakeGame.GameLoop.Client.stopMainGameLoop();
	},
	'click .stop': function() {
		// increment the counter when button is clicked
		//Session.set('direction', Session.get('counter') + 1);
		SnakeGame.GameLoop.Client.stopMainGameLoop();
		//SnakeGame.GameLoop.Client.stopMainGameLoop();
	}
});

Tracker.autorun(function() {
	var status = SnakeGame.Collections.GameStates.find().fetch();

	if (status.length <= 0) return;

	console.log(status[0].running);
	if (!status[0].running) {
		console.log("KILLED!");
		SnakeGame.GameLoop.Client.stopMainGameLoop();
	}

});