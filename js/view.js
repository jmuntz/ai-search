function send(arr) {
	var details = document.getElementById("details");
	
	details.innerHTML = ""; //reset the div content
	
	for (var i = arr.length - 1; i >= 0; i--) {
		details.innerHTML += arr[i] + "<br>";
	}
}


view = {
	init: function() {
		this.canvas 	= document.getElementById("canvas");
		this.ctx	 	= this.canvas.getContext('2d');
		this.settings 	= controller.getSettings();
	},

	render: function(grid) {
		for (var i = 0; i < grid.nodes.length; i++) {
			this.renderNode(grid.nodes[i]);
		}
	},

	renderTree: function(tree) {
		for (var i = 0; i < tree.length; i++) {
			this.renderNode(tree[i]);
			for (var k = 0; k < tree[i].children.length; k++) {
				if (!tree[i].children[k].explored) this.renderNode(tree[i].children[k], "orange");
			}
		}
	},

	renderNode: function(node, colour = false) {
		if (!colour) 
		 	 this.ctx.fillStyle = this.getNodeColour(node);
		else this.ctx.fillStyle = colour;

		this.ctx.fillRect(
			node.x * (this.settings.nodeSize + this.settings.nodeGap), 
			node.y * (this.settings.nodeSize + this.settings.nodeGap), 
			this.settings.nodeSize,
			this.settings.nodeSize
		);
	},

	renderFinalPath: async function(exitNode) {
		while (!exitNode.isEntry && !controller.stop) {
			view.renderNode(exitNode, "#52ff9c");
			exitNode = exitNode.parent;
			await this.sleep(50);
		} view.renderNode(exitNode, "#52ff9c");
	},

	getNodeColour: function(node) {
		if ((node.isEntry) || (node.isExit)) {
			colour = "#ff8c00";
		} else if (node.isWall) {
			colour = "#000000";
		} else if (node.explored) {
			colour = "#7990bf";
		} else colour = "#c1cde6";

		return colour;
	},

	sleep: function(ms) {
		return new Promise(resolve => setTimeout(resolve, ms));
	}
}