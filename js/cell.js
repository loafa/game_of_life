var Cell = function(x, y, isAlive) {
    var that = Object.create(Cell.prototype);
    that.getX = function() { return x; };
    that.getY = function() { return y; };
    that.isAlive = function() { return isAlive; };
    that.setAlive = function(alive) { isAlive = alive; }
    Object.freeze(that);
    return that;
};