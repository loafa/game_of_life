// represents a cell in the game
// the cell is either alive or dead
// @param isAlive true iff cell is alive
var Cell = function(isAlive) {
    var that = Object.create(Cell.prototype);

    // @return true iff cell is alive
    that.isAlive = function() { return isAlive; };

    // @param alive if true, sets cell to alive. if false, sets cell to dead (bool)
    that.setAlive = function(alive) { isAlive = alive; }
    Object.freeze(that);
    return that;
};