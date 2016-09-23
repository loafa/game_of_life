// a coordinate is 0-indexed, starting at the top left corner of the board
var Coord = function(x, y) {
    var that = Object.create(Coord.prototype);
    that.getX = function() { return x; };
    that.getY = function() { return y; };
    Object.freeze(that);
    return that;
}

var Cell = function(x, y, isAlive) {
    var that = Object.create(Cell.prototype);
    that.getX = function() { return x; };
    that.getY = function() { return y; };
    that.isAlive = function() { return isAlive; };
    that.setAlive = function(alive) { isAlive = alive; }
    // that.print = function() { console.log(coord.getX() + " " + coord.getY() + " " + that.isAlive()); };
    Object.freeze(that);
    return that;
};