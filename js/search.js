BFS = {
	init: function() {
		this.nodes 			= controller.getNodes();
		this.settings 		= controller.getSettings();
		this.list 			= [];
		this.exploredList 	= [];

		// Find the entrance and add the node to list so we can get started
		for (var i = 0; i < this.nodes.length; i++) {
			if (this.nodes[i].isEntry) {
				this.list.push(this.nodes[i]);
				break;
			}
		} this.run();
	},



	

	

	run: function() {

		if (currentNode = this.list.shift()) {

			if (currentNode.explored) {
				while (currentNode.explored) 
					currentNode = this.list.shift();
			}

			view.renderNode("green", currentNode);
			
			send(this.exploredList.length);

			if (!currentNode.isExit) {

				
				view.renderTree(this.exploredList);
				controller.explore(currentNode);

				// Add a sleep so it can be chill

				view.printList(this.list);
				setTimeout(function() {
					BFS.run();
				}, this.settings.searchSpeed);

			} else { //We found the exit
				view.renderFinalPath(currentNode);
				return;
				complete = true;
			}

				
			
		}

	}
}