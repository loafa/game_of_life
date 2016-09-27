// creates a square grid for gameplay
// square_dim: dimension of each cell square (in pixels)
// board_dim: number of squares in each row/ column
// canvas: the HTML5 canvas object to create the grid in
//			(if not passed an object, will attach a canvas element named 'grid' to the doc)
var Grid = function(square_dim, board_dim, canvas) {
	var that = Object.create(Grid.prototype);
	var DEFAULT_SQUARE_DIM = 20;
	var DEFAULT_BOARD_DIM = 30;

	// defaults. if not specified, we say that:
	// a square will be 20 x 20px
	// there will be 30 squares in every row and column
	// we create a canvas element called "grid", which will be used to draw all the game elements
	if (square_dim == undefined) { square_dim = DEFAULT_SQUARE_DIM; }
	if (board_dim == undefined) { board_dim = DEFAULT_BOARD_DIM; }
	if (canvas == undefined) {
		if (document.getElementById("grid") == undefined){
			$('<canvas>').attr({ id: "grid" }).appendTo('body');
		}
		canvas = document.getElementById("grid");
	}

	// the dimension of the square in pixels
	var pixel_dim = square_dim * board_dim;

	// update the canvas to the appropriate dimensions to have a nice square grid
	canvas.setAttribute("width", pixel_dim);
	canvas.setAttribute("height", pixel_dim);

	// visual properties of Grid
	var ctx = canvas.getContext("2d");
	ctx.fillStyle = "black";
	ctx.strokeStyle = "black";
	ctx.lineWidth = 1.25;

	// fills the square at board coords (x, y)
	// @param x the board coord x. int in range [0, board_dim)
	// @param y the board coord y. int in range [0, board_dim)
	that.fillSquare = function(x, y) {
		ctx.fillRect(x*square_dim, y*square_dim, square_dim, square_dim);
	};

	// clears the square at board coords(x, y)
	// @param x the board coord x. int in range [0, board_dim)
	// @param y the board coord y. int in range [0, board_dim)
	that.clearSquare = function(x, y) {
		ctx.clearRect(x*square_dim, y*square_dim, square_dim, square_dim);
		that.drawGridLines(); // it's easier to redraw the grid lines to ensure a clean grid
	};

	// converts the passed (x, y) in pixels from the top left corner of the canvas to board coords
	// @param x the pixel coords x from top left corner of grid. int in range [0, pixel_dim)
	// @param y the pixel coords y from top left corner of grid. int in range [0, pixel_dim)
	that.convertToCoord = function(x, y) {
		return {"x" : Math.floor(x/ square_dim), "y": Math.floor(y/square_dim)};
	};

	// clears the grid
	that.resetGrid = function() {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		that.drawGridLines();
	};

	// draws the grid lines according to the parameters specified above (eg. board_dim)
	that.drawGridLines = function() {
		for (var i = 0; i <= board_dim; i++) {
			// draw horizontal lines
			ctx.moveTo(0, square_dim * i);
		    ctx.lineTo(pixel_dim, square_dim * i);

		    // draw vertical lines
		    ctx.moveTo(square_dim * i, 0);
		    ctx.lineTo(square_dim * i, pixel_dim);
		}

		ctx.stroke();
	}

	// @return the size of the grid in pixels
	that.dimension = function() { return pixel_dim; };

	// we prep the grid for use by drawing the lines before returning the object
	that.resetGrid();
	
	Object.freeze(that);
	return that;
};
