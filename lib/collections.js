SnakeGame.Collections.Snakes = new Mongo.Collection("snakes");

// Only allow inserting of images from a logged in user
SnakeGame.Collections.Snakes.allow({
	insert: function(userId, file) {
		return true;
	},
	update: function(userId, file, fields, modifier) {
		return true;
	},
	remove: function(userId, file) {
		return true;
	}
});

SnakeGame.Collections.GameStates = new Mongo.Collection("gamestates"); 

SnakeGame.Collections.Obstacles = new Mongo.Collection("obstacles");
