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
		game.listInit(PULSAR_PRESET);
	}

	// initialize game state with a pentadecathlon
	// https://en.wikipedia.org/wiki/File:I-Column.gif
	that.pentaInit = function() {
		that.stop();
		game.listInit(PENTADECATHLON_PRESET);
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

