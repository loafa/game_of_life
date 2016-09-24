// creates a square grid for gameplay
// square_dim: dimension of each cell square (in pixels)
// squares_per_row: number of squares in each row/ column
// canvas: the HTML5 canvas object to create the grid in
//			(if not passed an object, will attach a canvas element named 'grid' to the doc)
var Grid = function(square_dim, squares_per_row, canvas) {
	var that = Object.create(Grid.prototype);

	// defaults. if not specified, we say that:
	// a square will be 20 x 20px
	// there will be 30 squares in every row and column
	// we create a canvas element called "grid", which will be used to draw all the game elements
	if (square_dim == undefined) { square_dim = 20; }
	if (squares_per_row == undefined) { squares_per_row = 30; }
	if (canvas == undefined) {
		if (document.getElementById("grid") == undefined){
			$('<canvas>').attr({ id: "grid" }).appendTo('body');
		}
		canvas = document.getElementById("grid");
	}

	// the dimension of the square in pixels
	var pixel_dim = square_dim * squares_per_row;

	// update the canvas to the appropriate dimensions to have a nice square grid
	canvas.setAttribute("width", pixel_dim);
	canvas.setAttribute("height", pixel_dim);

	// visual properties of Grid
	var ctx = canvas.getContext("2d");
	ctx.fillStyle = "black";
	ctx.strokeStyle = "black";
	ctx.lineWidth = 1.25;

	// fills the square at board coords (x, y)
	that.fillSquare = function(x, y) {
		ctx.fillRect(x*square_dim, y*square_dim, square_dim, square_dim);
	};

	// clears the square at board coords(x, y)
	that.clearSquare = function(x, y) {
		ctx.clearRect(x*square_dim, y*square_dim, square_dim, square_dim);
		that.drawGridLines(); // it's easier to redraw the grid lines to ensure a clean grid
	};

	// converts the passed (x, y) in pixels from the top left corner of the canvas to board coords
	that.convertToCoord = function(x, y) {
		return {"x" : Math.floor(x/ square_dim), "y": Math.floor(y/square_dim)};
	};

	// clears the grid
	that.resetGrid = function() {
		ctx.clearRect(0, 0, pixel_dim, pixel_dim);
		that.drawGridLines();
	};

	// draws the grid lines according to the parameters specified above (eg. squares_per_row)
	that.drawGridLines = function() {
		for (var i = 0; i <= squares_per_row; i++) {
			// draw horizontal lines
			ctx.moveTo(0, square_dim * i);
		    ctx.lineTo(pixel_dim, square_dim * i);

		    // draw vertical lines
		    ctx.moveTo(square_dim * i, 0);
		    ctx.lineTo(square_dim * i, pixel_dim);
		}

		ctx.stroke();
	}

	// returns the size of the grid in pixels
	that.dimension = function() { return pixel_dim; };

	// we prep the grid for use by drawing the lines before returning the object
	that.resetGrid();
	
	Object.freeze(that);
	return that;
};
