// modulo function that can deal with negative numbers
// @param x integer we want to take the modulo of (any integer)
// @param y the number we're mod-ing by (int), must be > 0
// @return the modded value of x (in range [0, y))
var mod = function(x, y) {
	while (x < 0) { x += y; } 
	return x % y; 
};

