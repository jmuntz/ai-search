var Node = function(x, y, isWall = false) {
	this.x = x;
	this.y = y;
	this.explored = false;
	this.children = [];
	this.parent = null;

	this.isWall = isWall;
}