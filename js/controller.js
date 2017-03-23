controller = {

	init: function() {
		this.stop = true;

		grid = new Grid(model.gridSize[0], model.gridSize[1]);

		grid.generate();

		view.init();
		view.render(grid);

		this.grid = grid;
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

	search: function(type) {
		controller.stop = false;
		if ((type === "BFS") || (type === "DFS")) {
			this.algorithm = new Algorithm(type, this.grid); 
		 	
		 	this.algorithm.run();

		} else {
			console.log("Algorithm not supported. Stopping."); 	
		} 
	}
}