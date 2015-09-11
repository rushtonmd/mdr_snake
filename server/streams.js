chatStream = new Meteor.Stream('chat');

chatStream.permissions.write(function() {
  return true;
});

chatStream.permissions.read(function() {
  return true;
});

chatStream.on('chat', function(message) {
  console.log("Chat: " + message);
});

chatStream.on('snake1_update', function(snake) {
  console.log("Snake1 Update");

  // Check collission wth walls
  SnakeGame.Logic.detectCollisionWithWall(snake);

  // Check collision with self

  // Check colission with 1-up
  SnakeGame.Logic.detectCollisionWithOneUp(snake);

});