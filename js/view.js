function send(str) {
	var log = document.getElementById("log");
	tmp = log.innerHTML;
	log.innerHTML = str + "<br>" + tmp;
	// for (var i = arr.length - 1; i >= 0; i--) {
	// 	log.innerHTML += arr[i] + "<br>";
	// }
}


view = {
	init: function() {
		this.canvas 	= document.getElementById("canvas");
		this.ctx	 	= this.canvas.getContext('2d');
		this.settings 	= controller.getSettings();

		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
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
			await this.sleep(20);
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

	initControls: function() {
		document.getElementById("grid-height").value = 20;
		document.getElementById("grid-width").value = 20;
		document.getElementById("node-size").value = 10;
	},

	printDetails: function(data) {
		console.log(data);
		size 		= controller.getModel().gridSize;
		total_nodes = data[3] * data[4];
		explored 	= 0;

		str = "<span>Nodes in queue:</span> " + data[0] + "<br>" +
		"<span>Explored:</span> " + data[1] + "<br>" +
		"<span>Total nodes:</span> " + data[3] * data[4] + "<br>" +
		"<span>Grid size:</span> " + data[3] + " x " + data[4] + "<br>" +
		"<span>Time taken:</span> " + data[5] + "s";

		document.getElementById("details").innerHTML = str;

	},

	sleep: function(ms) {
		return new Promise(resolve => setTimeout(resolve, ms));
	}
}

view.initControls();