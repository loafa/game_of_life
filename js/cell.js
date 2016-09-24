// represents a cell in the game
// the cell is located at board coordiates (x, y) and is either alive or dead (isAlive)
var Cell = function(x, y, isAlive) {
    var that = Object.create(Cell.prototype);
    that.isAlive = function() { return isAlive; };
    that.setAlive = function(alive) { isAlive = alive; }
    Object.freeze(that);
    return that;
};