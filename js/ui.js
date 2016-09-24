// interfaces between the UI and the game grid
var UI = function(game) {
	var that = Object.create(UI.prototype);
	// default: default game
	if (game == undefined) {
		game = Game();
	};

	// toggles the game state (running -> paused/ stopped, paused -> running)
	that.toggleGameState = function() {
		if (!game.isRunning()){
			that.start();
		} else {
			that.stop();
		}
	};

	// initialize game state with a pulsar
	// https://en.wikipedia.org/wiki/File:Game_of_life_pulsar.gif
	that.pulsarInit = function() {
		that.stop();
		game.listInit([[8, 11], [8, 17], [9, 11], [9, 17], [10, 11], [10, 12], [10, 16], [10, 17], 
			[12, 7], [12, 8], [12, 9], [12, 12], [12, 13], [12, 15], [12, 16], [12, 19], [12, 20], 
			[12, 21], [13, 9], [13, 11], [13, 13], [13, 15], [13, 17], [13, 19], [14, 11], [14, 12], 
			[14, 16], [14, 17], [16, 11], [16, 12], [16, 16], [16, 17], [17, 9], [17, 11], [17, 13], 
			[17, 15], [17, 17], [17, 19], [18, 7], [18, 8], [18, 9], [18, 12], [18, 13], [18, 15], 
			[18, 16], [18, 19], [18, 20], [18, 21], [20, 11], [20, 12], [20, 16], [20, 17], [21, 11], 
			[21, 17], [22, 11], [22, 17]]);
	}

	// initialize game state with a pentadecathlon
	// https://en.wikipedia.org/wiki/File:I-Column.gif
	that.pentaInit = function() {
		that.stop();
		game.listInit([[13, 12], [13, 13], [13, 14], [13, 15], [13, 16], [13, 17], [14, 11], 
			[14, 18], [15, 10], [15, 19], [16, 11], [16, 18], [17, 12], [17, 13], [17, 14], 
			[17, 15], [17, 16], [17, 17]]);
	}

	// initialize random game state (any cell is live with 25% probability)
	that.randomInit = function() {
		that.stop();
		game.randomInit();
	}

	// initialize an entirely dead game state
	that.emptyInit = function() {
		that.stop();
		game.emptyInit();
	}

	// stop the game
	that.stop = function() {
		game.stop();
		$("#start-stop").text("Start");
	}

	// start the game
	that.start = function() {
		game.start();
		$("#start-stop").text("Stop");
	}


	$("#start-stop").click(that.toggleGameState);
	$("#random").click(that.randomInit);
	$("#empty").click(that.emptyInit);
	$("#grid").click(function(evt) {
		// only allow user to add a live cell when the game isn't running
		if (!game.isRunning()){
			game.toggleCell(evt.offsetX, evt.offsetY); 
		} 
	});
	$("#pulsar").click(that.pulsarInit);
	$("#pentadecathlon").click(that.pentaInit);

	Object.freeze(that);
	return that;
};

