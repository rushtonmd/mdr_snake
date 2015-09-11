// Use namespace SnakeGame.GameLoop.Client

Meteor.startup(function() {

	$(window).bind('resize', function() {
		resizeCanvas();
	});

	function resizeCanvas() {
		console.log("RESIZE!");
		var canvas = document.getElementById("gameboardcanvas");
		//canvas.width = window.innerHeight;
		//canvas.height = window.innerHeight;
		canvas.width = canvas.height = 600; // force canvas size for now
	}
	resizeCanvas();

	SnakeGame.GameLoop.Client.gameBoardCanvas = document.getElementById("gameboardcanvas");
	SnakeGame.GameLoop.Client.gameBoardContext = document.getElementById("gameboardcanvas").getContext("2d");

	SnakeGame.GameLoop.Client.startMainGameLoop = function startMainGameLoop() {
		console.log("Starting Game!");

		Meteor.call('restartGame', function(error, result) {
			if (error) {
				// handle error
			} else {
				// examine result
			}
		});

		SnakeGame.GameLoop.Client.lastTick = performance.now();
		SnakeGame.GameLoop.Client.lastRender = SnakeGame.GameLoop.Client.lastTick; //Pretend the first draw was on first update.
		SnakeGame.GameLoop.Client.tickLength = 100; //This sets your simulation to run at 20Hz (50ms)

		mainGameLoop(performance.now()); // Start the cycle
	};

	SnakeGame.GameLoop.Client.stopMainGameLoop = function startMainGameLoop() {

		console.log("Stopping Game!");

		SnakeGame.GameLoop.Client.snake1 = null;

		window.cancelAnimationFrame(SnakeGame.GameLoop.Client.stopMain);
	};

	var mainGameLoop = function mainGameLoop(tFrame) {

		SnakeGame.GameLoop.Client.stopMain = window.requestAnimationFrame(mainGameLoop);

		var nextTick = SnakeGame.GameLoop.Client.lastTick + SnakeGame.GameLoop.Client.tickLength;
		var numTicks = 0;

		//If tFrame < nextTick then 0 ticks need to be updated (0 is default for numTicks).
		//If tFrame = nextTick then 1 tick needs to be updated (and so forth).
		//Note: As we mention in summary, you should keep track of how large numTicks is.
		//If it is large, then either your game was asleep, or the machine cannot keep up.
		if (tFrame > nextTick) {
			var timeSinceTick = tFrame - SnakeGame.GameLoop.Client.lastTick;
			numTicks = Math.floor(timeSinceTick / SnakeGame.GameLoop.Client.tickLength);
		}

		if (numTicks >= 1) SnakeGame.GameLoop.Client.queueUpdates(numTicks);
		SnakeGame.GameLoop.Client.renderClient();
		SnakeGame.GameLoop.Client.lastRender = tFrame;
	};

});