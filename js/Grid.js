var Grid = function(width, height) {
	
	this.width = width;
	this.height = height;

	this.generate = function() {
		var nodes = [];

		for (x = 0; x < width; x++) {
			for (y = 0; y < height; y++) {
				nodes.push(new Node(x, y, this.isOuterWall(x, y) || this.isInnerWall()));
			}
		} 

		this.nodes = this.addExits(nodes);
	};

	this.addExits = function(nodes) {

		// Generate random entry/exit points
		entry  	= [controller.getMinMax(1, this.width - 2), 0];
		exit 	= [controller.getMinMax(1, this.width - 2), this.height -1];

		for (var i = 0; i < nodes.length; i++) {
			if ((nodes[i].x == entry[0]) && (nodes[i].y == entry[1])) {
				nodes[i].isEntry = true; 
				nodes[i].isWall = false; 
				break;
			}
		}

		for (var i = 0; i < nodes.length; i++) {
			if ((nodes[i].x == exit[0]) && (nodes[i].y == exit[1])) {
				nodes[i].isExit = true; 
				nodes[i].isWall = false; 
				break;
			}
		}

		return nodes;
	};



	this.getNode = function(x, y) {
		for (var i = 0; i < this.nodes.length; i++) {
			if ((this.nodes[i].x == x ) && (this.nodes[i].y == y )) 
				return this.nodes[i];
		}
	};

	
	this.canMoveUp = function(node) {
		return this.validMove(node.x, node.y + 1);
	};

	this.canMoveDown = function(node) {
		return this.validMove(node.x, node.y - 1);
	};
	
	this.canMoveLeft = function(node) {
		return this.validMove(node.x -1, node.y);
	};
		
	this.canMoveRight = function(node) {
		return this.validMove(node.x + 1, node.y);
	};
	

	this.validMove = function(x, y) {
		for (var i = 0; i < this.nodes.length; i++) {
			if ((this.nodes[i].x == x ) && 
				(this.nodes[i].y == y ) &&
				(!this.nodes[i].isWall) &&
				(!this.nodes[i].explored))
			return true;
		} return false;
	};

	// Simulates a wall
	// Returns false for all edge/outer nodes
	this.isOuterWall = function(w, h) {
		return ((w == 0) || (w == this.width - 1) || (h == 0) || h == (this.height - 1));
	};

	this.isInnerWall = function() {
		// Add model.nodeDensity as parameter later
		return Math.random() < model.wallDensity;
	};

}

Grid.prototype.toString = function gridToString() {
  	return  'Width: '  + this.width + '\n' +
  			'Height: ' + this.height + '\n' +
  			'Nodes: '  + this.nodes.length + '\n';
}