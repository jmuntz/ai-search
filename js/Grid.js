var Grid = function(size) {

	this.generateNodes: function() {
		model.nodes = [];

		for (x = 0; x < model.minefieldSize; x++) {
			for (y = 0; y < model.minefieldSize; y++) {
				model.nodes.push(new Node(x, y, Math.random() < model.nodeDensity, this.isWall(x, y, model.minefieldSize)));
			}
		} this.addExits();
	};

	this.addExits: function() {

		// Generate random entry/exit points
		entry  	= [this.getRandomIntInclusive(1, model.minefieldSize -2), 0];
		exit 	= [this.getRandomIntInclusive(1, model.minefieldSize -2), model.minefieldSize -1];

		for (var i = 0; i < model.nodes.length; i++) {
			if ((model.nodes[i].x == entry[0]) && (model.nodes[i].y == entry[1])) {
				model.nodes[i].isEntry = true; 
				model.nodes[i].isWall = false; 
				break;
			}
		}

		for (var i = 0; i < model.nodes.length; i++) {
			if ((model.nodes[i].x == exit[0]) && (model.nodes[i].y == exit[1])) {
				model.nodes[i].isExit = true; 
				model.nodes[i].isWall = false; 
				break;
			}
		}

		model.entry = entry;
		model.exit = exit;
	};

}