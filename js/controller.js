controller = {

	init: function() {
		this.generateNodes();	
		view.init();
	},

	

	getNodes: function() {
		return model.nodes;
	},

	getEntry: function() {
		return model.entry;
	},

	getSettings: function() {
		return settings = {
			nodeSize:  	model.nodesize,
			nodeGap:  		model.nodeGap,
			minefieldSize:  model.minefieldSize,
			nodeDensity:  	model.nodeDensity,
			searchSpeed: 	model.searchSpeed
		}
	},

	getRandomIntInclusive: function(min, max) {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min + 1)) + min;
	},

	isWall: function(x, y, minefieldSize) {
		return ((x == 0) || (x == model.minefieldSize -1) || (y == 0) || y == (model.minefieldSize -1));
	},

	fetchnode: function(x, y) {
		for (var i = 0; i < this.nodes.length; i++) {
			if ((this.nodes[i].x == x ) && (this.nodes[i].y == y )) 
				return this.nodes[i];
		}
	},

	// LEFT > DOWN > RIGHT > UP
	explore: function(node) {
		if (this.canMoveLeft(node)) {
			child = controller.fetchBlock(node.x - 1, node.y);
			if (!child.queued) { // Check if child is already in the queue from a neighbouring block. 
				child.parent = node;
				node.children.push(child);
				this.list.push(child);
				child.queued = true;
			}	
		}  

		if (this.canMoveDown(node)) {
			child = controller.fetchBlock(node.x, node.y - 1);
			if (!child.queued) {
				child.parent = node;
				node.children.push(child);
				this.list.push(child);
				child.queued = true;
			}
		}  

		if (this.canMoveRight(node)) {
			child = controller.fetchBlock(node.x + 1, node.y);
			if (!child.queued) {
				child.parent = node;
				node.children.push(child);
				this.list.push(child);
				child.queued = true;
			}
		} 

		if (this.canMoveUp(node)) {
			child = controller.fetchBlock(node.x, node.y + 1);
			if (!child.queued) {
				child.parent = node;
				node.children.push(child);
				this.list.push(child);	
				child.queued = true;
			}
		} 

		this.exploredList.push(node);
		node.explored = true;
	},

	canMoveUp: function(node) {
		return this.validMove(node.x, node.y + 1);
	},

	canMoveDown: function(node) {
		return this.validMove(node.x, node.y - 1);
	},
	
	canMoveLeft: function(node) {
		return this.validMove(node.x -1, node.y);
	},
		
	canMoveRight: function(node) {
		return this.validMove(node.x + 1, node.y);
	}
	

	validMove: function(x, y) {
		for (var i = 0; i < this.nodes.length; i++) {
			if ((this.nodes[i].x == x ) && 
				(this.nodes[i].y == y ) &&
				(!this.nodes[i].isWall) &&
				(!this.nodes[i].isMine) &&
				(!this.nodes[i].explored))
			return true;
		} return false;
	},
}