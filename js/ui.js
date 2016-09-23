// interfaces between the UI and the game grid
var UI = function(game) {
	var that = Object.create(UI.prototype);
	if (game == undefined) {
		game = Game();
	};

	that.startButtonEvent = function() {
		// game.toggleState();
		if (!game.isRunning()){
			that.start();
		} else {
			that.stop();
		}
	};

	that.randomInit = function() {
		that.stop();
		game.randomInit();
	}

	that.emptyInit = function() {
		that.stop();
		game.emptyInit();
	}

	that.stop = function() {
		game.stop();
		$("#toggle").text("Start");
	}

	that.start = function() {
		game.start();
		$("#toggle").text("Stop");
	}


	$("#toggle").click(that.startButtonEvent);
	$("#random").click(that.randomInit);
	$("#empty").click(that.emptyInit);
	$("#grid").click(function(evt) { 
		game.toggleCell(evt.offsetX, evt.offsetY); 
	});
	Object.freeze(that);
	return that;
};

