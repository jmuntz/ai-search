view = {
	init: function() {
		console.log("View initializing.");
		
		this.canvas 	= document.getElementById("canvas");
		this.ctx	 	= this.canvas.getContext('2d');
		this.settings 	= controller.getSettings();
		
		this.render();
		
	},

	render: function() {
		var node  	= controller.getNode();
		
		for (var i = 0; i < node.length; i++) {
		
			if (node[i].isMine) {
				colour = "red";
			} else if ((node[i].isEntry) || (node[i].isExit)) {
				colour = "#a858ff";
			} else if (node[i].isWall) {
				colour = "black";
			} else colour = "#6d6ddf";

			this.renderNode(node[i], colour);
		}
	},

	renderTree: function(tree) {
		for (var i = 0; i < tree.length; i++) {
			this.renderNode(tree[i], "black");

			for (var k = 0; k < tree[i].children.length; k++) {
				this.renderNode(tree[i].children[k], "orange")
			}
		}
	},

	renderNode: function(node, colour) {
		this.ctx.fillStyle = colour;
		this.ctx.fillRect(
			node.x * (this.settings.nodeSize + this.settings.nodeGap), 
			node.y * (this.settings.nodeSize + this.settings.nodeGap), 
			this.settings.nodeSize,
			this.settings.nodeSize
		);
	},

	renderFinalPath: async function(exitNode) {
		while (!exitNode.isEntry) {
			view.renderNode(exitNode, "pink");
			exitNode = exitNode.parent;
			await sleep(50);
		} view.renderNode(exitNode, "pink");
	},

	printList: function(list) {
		for (var i = 0; i < list.length; i++) {
			console.log(list[i].explored);
			console.log("[" + list[i].x + ", " + list[i].y + "]:" + list[i].queued);

		}	

		console.log("--------");
	},
}