controller = {

	init: async function() {
		view.initControls();
		view.loadAssets();

		while (!view.assetsLoaded) {
			await view.sleep(200);
			console.log(view.assetsLoaded)
		}
		console.log('Assets loaded.');
		this.stop = true;

		grid = new Grid(model.gridSize[0], model.gridSize[1]);

		grid.generate();

		view.init();
		view.printDetails(model);
		view.render(grid);

		this.grid = grid;
		console.log("Loading complete.");
	},

	getSettings: function() {
		return settings = {
			nodeSize:  	 	model.nodeSize,
			nodeGap:  		model.nodeGap,
			gridSize:  		model.gridSize,
			wallDensity:  	model.wallDensity,
			searchSpeed: 	model.searchSpeed
		}
	},

	getMinMax: function(min, max) {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min + 1)) + min;
	},

	setAlgo: function(algo) {
		model.algo = algo;
		console.log("Setting algo: " + algo);
	},

	setGridHeight: function(height) {
		model.gridSize[1] = height;
	},

	setGridWidth: function(width) {
		model.gridSize[0] = width;
	},

	setNodeSize: function(num) {
		model.nodeSize = parseInt(num);
	},

	getAlgo: function() {
		return model.algo;
	},

	printDetails: function(data) {
		view.printDetails(data);
	},

	getModel: function() {
		return model;
	},

	search: function(algo) {
		controller.stop = false;
		algo = algo.toUpperCase();
		if ((algo === "BFS") || (algo === "DFS")) {
			this.algorithm = new Algorithm(algo, this.grid); 
		 	
		 	this.algorithm.run();

		} else {
			console.log("Algorithm (" + algo + ") not supported. Stopping."); 	
		} 
	}
}