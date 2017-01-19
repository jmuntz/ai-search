BFS = {
	init: function() {
		this.blocks 		= controller.getBlocks();
		this.settings 		= controller.getSettings();

		// Find the entrance and add the node to list so we can get started
		for (var i = 0; i < this.blocks.length; i++) {
			if (this.blocks[i].isEntry) {
				this.list.push(this.blocks[i]);
				break;
			}
		} this.run();
	},



	// LEFT > DOWN > RIGHT > UP
	explore: function(currentBlock) {
		if (this.canMoveLeft(currentBlock)) {
			child = this.fetchBlock(currentBlock.x - 1, currentBlock.y);
			if (!child.queued) { // Check if child is already in the queue from a neighbouring block. 
				child.parent = currentBlock;
				currentBlock.children.push(child);
				this.list.push(child);
				child.queued = true;
			}
		}  

		if (this.canMoveDown(currentBlock)) {
			child = this.fetchBlock(currentBlock.x, currentBlock.y - 1);
			if (!child.queued) {
				child.parent = currentBlock;
				currentBlock.children.push(child);
				this.list.push(child);
				child.queued = true;
			}
		}  

		if (this.canMoveRight(currentBlock)) {
			child = this.fetchBlock(currentBlock.x + 1, currentBlock.y);
			if (!child.queued) {
				child.parent = currentBlock;
				currentBlock.children.push(child);
				this.list.push(child);
				child.queued = true;
			}
		} 

		if (this.canMoveUp(currentBlock)) {
			child = this.fetchBlock(currentBlock.x, currentBlock.y + 1);
			if (!child.queued) {
				child.parent = currentBlock;
				currentBlock.children.push(child);
				this.list.push(child);	
				child.queued = true;
			}
		} 

		this.exploredList.push(currentBlock);
		currentBlock.explored = true;
	},

	
	canMoveUp: function(currentBlock) {
		return this.validMove(currentBlock.x, currentBlock.y + 1);
	},

	canMoveDown: function(currentBlock) {
		return this.validMove(currentBlock.x, currentBlock.y - 1);
	},
	
	canMoveLeft: function(currentBlock) {
		return this.validMove(currentBlock.x -1, currentBlock.y);
	},
		
	canMoveRight: function(currentBlock) {
		return this.validMove(currentBlock.x + 1, currentBlock.y);
	},

	validMove: function(x, y) {
		for (var i = 0; i < this.blocks.length; i++) {
			if ((this.blocks[i].x == x ) && 
				(this.blocks[i].y == y ) &&
				(!this.blocks[i].isWall) &&
				(!this.blocks[i].isMine) &&
				(!this.blocks[i].explored))
			return true;
		} return false;
	},
	
	fetchBlock: function(x, y) {
			for (var i = 0; i < this.blocks.length; i++) {
				if ((this.blocks[i].x == x ) && (this.blocks[i].y == y )) 
					return this.blocks[i];
			}
		},

	printList: function(list) {
		for (var i = 0; i < list.length; i++) {
			console.log(list[i].explored);
			console.log("[" + list[i].x + ", " + list[i].y + "]:" + list[i].queued);

		}	

		console.log("--------");
	},

	run: function() {

		if (currentBlock = this.list.shift()) {

			if (currentBlock.explored) {
				while (currentBlock.explored) 
					currentBlock = this.list.shift();
			}

			view.renderBlock("green", currentBlock);
			
			send(this.exploredList.length);

			if (!currentBlock.isExit) {

				
				view.renderTree(this.exploredList);
				this.explore(currentBlock);

				// Add a sleep so it can be chill

				this.printList(this.list);
				setTimeout(function() {
					BFS.run();
				}, this.settings.searchSpeed);

			} else { //We found the exit
				view.renderFinalPath(currentBlock);
				return;
				complete = true;
			}

				
			
		}

	}
}