function Block(x, y, isMine = false, isWall = false) {
  	this.x = x;
  	this.y = y;
  	this.explored = false;
  	this.children = [];

  	if (isWall) 
  		isMine = false;
  	
  	this.isMine = isMine;
  	this.isWall = isWall;
}	



function send(msg) {
	var details = document.getElementById("details");
	details.innerHTML += "<br>" + msg;
}


function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}



controller.init();