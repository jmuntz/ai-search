var Node = function(x, y, Grid, isMine = false, isWall = false) {
  	this.x = x;
  	this.y = y;
  	this.explored = false;
  	this.children = [];

  	if (isWall) 
  		isMine = false;
  	
  	this.isMine = isMine;
  	this.isWall = isWall;
}