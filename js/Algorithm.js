var Algorithm = function(type, grid) {
	
	this.grid 			= grid;
	this.type 			= type;
	this.settings 		= controller.getSettings();
	this.list 			= [];
	this.exploredList 	= [];
	this.count 			= 0;

	// Find the entrance and add the node to list so we can get started
	for (var i = 0; i < this.grid.nodes.length; i++) {
		if (this.grid.nodes[i].isEntry) {
			this.list.push(this.grid.nodes[i]);
			break;
		}
	} 

	// Send some stats to the view
	
	data = [
		this.list.length,
		this.exploredList.length,
		this.grid.nodes.length,
		this.grid.width,
		this.grid.height,
	]
	
	send(data);

	controller.printDetails(data);

	// Make this async so we can add a sleep timer
	// without ballsing it up with a recursive setTimeout
	this.run = async function() {
		this.startTime = Date.now();

		currentNode = this.list.pop();
		while (currentNode) {
			
			if (controller.stop) break;

			await this.sleep(this.settings.searchSpeed);

			// Send some stats to the view
			// because stats
			data = [
				this.list.length,
				this.exploredList.length,
				this.grid.nodes.length,
				this.grid.width,
				this.grid.height,
				(((Date.now() - this.startTime) /1000))
			]
			
			send(data);

			controller.printDetails(data);

			// If we our current node is not the exit then
			// we render the current tree and explore the node
			if (!currentNode.isExit) {
				this.explore(currentNode);
				
				currentNode.explored = true;
				
				view.renderNode(currentNode);
				
				for (i = 0; i < currentNode.children.length; i++) {
					view.renderNode(currentNode.children[i], "orange");
				}

			} else { //We found the exit.. let's do stats and render the path
				this.endTime = Date.now();
				
				data = [
					this.list.length,
					this.exploredList.length,
					this.grid.nodes.length,
					this.grid.width,
					this.grid.height,
					(((this.endTime - this.startTime) /1000))
				]
				
				send(data);

				controller.printDetails(data);

				view.renderFinalPath(currentNode);
				return true
			} 

			// Get the next node depending on our algorithm
			if (this.type == "BFS") 
				currentNode = this.list.shift();
			else if (this.type == "DFS") 
				currentNode = this.list.pop();

		} return false;
	};

	// LEFT > DOWN > RIGHT > UP
	this.explore = function(node) {
		if (this.grid.canMoveLeft(node)) {

			child = this.grid.getNode(node.x - 1, node.y);
			
			if (!child.queued) { // Check if child is already in the queue from a neighbouring block. 
				child.parent = node;
				node.children.push(child);
				this.list.push(child);
				child.queued = true;
			}	
		}  

		if (this.grid.canMoveDown(node)) {

			child = this.grid.getNode(node.x, node.y - 1);
			
			if (!child.queued) {
				child.parent = node;
				node.children.push(child);
				this.list.push(child);
				child.queued = true;
			}
		}  

		if (this.grid.canMoveRight(node)) {

			child = this.grid.getNode(node.x + 1, node.y);
			
			if (!child.queued) {
				child.parent = node;
				node.children.push(child);
				this.list.push(child);
				child.queued = true;
			}
		} 

		if (this.grid.canMoveUp(node)) {

			child = this.grid.getNode(node.x, node.y + 1);
			
			if (!child.queued) {
				child.parent = node;
				node.children.push(child);
				this.list.push(child);	
				child.queued = true;
			}
		} 			

		this.exploredList.push(node);
		node.explored = true;
	};

	this.sleep = function(ms) {
		return new Promise(resolve => setTimeout(resolve, ms));
	};

}