var Node = function(x, y, isWall = false) {
	this.isWall 	= isWall;
	this.x 			= x;
	this.y 			= y;
	this.explored 	= false;
	this.children 	= [];
	this.parent 	= null;
	this.colour 	= '#ff8c00';
	this.isEntry 	= false;
	this.isExit 	= false;

}