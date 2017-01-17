controller = {

	init: function() {
		this.generateBlocks();	
		view.init();
	},

	generateBlocks: function() {
		model.blocks = [];

		for (x = 0; x < model.minefieldSize; x++) {
			for (y = 0; y < model.minefieldSize; y++) {
				model.blocks.push(new Block(x, y, Math.random() < model.blockDensity, this.isWall(x, y, model.minefieldSize)));
			}
		} this.addExits();
	},

	addExits: function() {

		// Generate random entry/exit points
		entry  	= [this.getRandomIntInclusive(1, model.minefieldSize -2), 0];
		exit 	= [this.getRandomIntInclusive(1, model.minefieldSize -2), model.minefieldSize -1];

		for (var i = 0; i < model.blocks.length; i++) {
			if ((model.blocks[i].x == entry[0]) && (model.blocks[i].y == entry[1])) {
				model.blocks[i].isEntry = true; 
				model.blocks[i].isWall = false; 
				break;
			}
		}

		for (var i = 0; i < model.blocks.length; i++) {
			if ((model.blocks[i].x == exit[0]) && (model.blocks[i].y == exit[1])) {
				model.blocks[i].isExit = true; 
				model.blocks[i].isWall = false; 
				break;
			}
		}

		model.entry = entry;
		model.exit = exit;
	},

	getBlocks: function() {
		return model.blocks;
	},

	getEntry: function() {
		return model.entry;
	},

	getSettings: function() {
		return settings = {
			blockSize:  	model.blockSize,
			blockGap:  		model.blockGap,
			minefieldSize:  model.minefieldSize,
			blockDensity:  	model.blockDensity,
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
	}
}