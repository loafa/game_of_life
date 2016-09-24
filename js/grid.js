// creates a grid for gameplay
// square_dim: dimension of each cell square (in pixels)
// squares_per_row: number of squares in each row/ column
// canvas: the HTML5 canvas object to create the grid in
//			(if not passed an object, will attach a canvas element named 'grid' to the doc)
var Grid = function(square_dim, squares_per_row, canvas) {
	var that = Object.create(Grid.prototype);

	if (square_dim == undefined) { square_dim = 20; }
	if (squares_per_row == undefined) { squares_per_row = 30; }
	if (canvas == undefined) {
		if (document.getElementById("grid") == undefined){
			$('<canvas>').attr({ id: "grid" }).appendTo('body');
		}
		canvas = document.getElementById("grid");
	}

	var pixel_dim = square_dim * squares_per_row;
	canvas.setAttribute("width", pixel_dim);
	canvas.setAttribute("height", pixel_dim);

	var ctx = canvas.getContext("2d");
	ctx.fillStyle = "black";
	ctx.strokeStyle = "black";
	ctx.lineWidth = 1.25;


	that.fillSquare = function(x, y) {
		ctx.fillRect(x*square_dim, y*square_dim, square_dim, square_dim);
	};

	that.clearSquare = function(x, y) {
		ctx.clearRect(x*square_dim, y*square_dim, square_dim, square_dim);
		that.drawGridLines();
	};

	that.convertToCoord = function(x, y) {
		return {"x" : Math.floor(x/ square_dim), "y": Math.floor(y/square_dim)};
	};

	that.resetGrid = function() {
		ctx.clearRect(0, 0, pixel_dim, pixel_dim);
		that.drawGridLines();
	};

	that.drawGridLines = function() {
		for (var i = 0; i <= squares_per_row; i++) {
			ctx.moveTo(0, square_dim * i);
		    ctx.lineTo(pixel_dim, square_dim * i);

		    ctx.moveTo(square_dim * i, 0);
		    ctx.lineTo(square_dim * i, pixel_dim);
		}

		ctx.stroke();
	}

	that.dimension = function() { return pixel_dim; };

	that.resetGrid();
	
	Object.freeze(that);
	return that;
};
