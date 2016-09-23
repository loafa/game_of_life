var Grid = function(square_dim, squares_per_row, canvas) {
	var that = Object.create(Grid.prototype);
	var pixel_dim = square_dim * squares_per_row;
	canvas.setAttribute("width", pixel_dim);
	canvas.setAttribute("height", pixel_dim);

	var ctx = canvas.getContext("2d");

	that.fillSquare = function(x, y) {
		ctx.fillStyle = "#000";
		ctx.fillRect(x*square_dim, y*square_dim, square_dim, square_dim);
	};

	that.resetGrid = function() {
		ctx.clearRect(0, 0, pixel_dim, pixel_dim);
		for (var i = 0; i <= squares_per_row; i++) {
			ctx.moveTo(0, square_dim * i);
		    ctx.lineTo(pixel_dim, square_dim * i);

		    ctx.moveTo(square_dim * i, 0);
		    ctx.lineTo(square_dim * i, pixel_dim);
		}

		ctx.strokeStyle = "#000";
		ctx.stroke();
	};

	that.dimension = function() { return pixel_dim; };

	that.resetGrid();
	
	Object.freeze(that);
	return that;
};
