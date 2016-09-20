var Cell = function(x, y, initState) {
	var that = Object.create(Cell.prototype);
	that.getX = function() { return x; };
	that.getY = function() { return y; };

	Object.freeze(that);
	return that;
};