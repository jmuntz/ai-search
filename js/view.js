const 	brick_asset = new Image();
		brick_asset.src = 'img/brick.jpg';
const 	grass_asset = new Image();
		grass_asset.src = 'img/grass.jpg';		

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

	loadAssets: async function() {
		count = 0;

		while ((!brick_asset.complete || !grass_asset) && count < 10) {
			await this.sleep(200);
			count++;
		}

		this.assetsLoaded = true;
	},

	render: function(grid) {
		for (var i = 0; i < grid.nodes.length; i++) {
			this.renderNode(grid.nodes[i]);
		}
	},


	renderNode: function(node, colour = false) {
		if (!colour)  {
			texture = this.getNodeColour(node);

			if (typeof texture === 'object' && !Array.isArray(texture) && texture !== null) {
				this.ctx.drawImage(
					texture, 
					node.x * (this.settings.nodeSize + this.settings.nodeGap), 
					node.y * (this.settings.nodeSize + this.settings.nodeGap), 
					this.settings.nodeSize, this.settings.nodeSize
				);

			} else {
				this.ctx.fillStyle = texture;	
				this.ctx.fillRect(
					node.x * (this.settings.nodeSize + this.settings.nodeGap), 
					node.y * (this.settings.nodeSize + this.settings.nodeGap), 
					this.settings.nodeSize,
					this.settings.nodeSize
				);
			}


		} else {
			this.ctx.fillStyle = colour;

			this.ctx.fillRect(
				node.x * (this.settings.nodeSize + this.settings.nodeGap), 
				node.y * (this.settings.nodeSize + this.settings.nodeGap), 
				this.settings.nodeSize,
				this.settings.nodeSize
			);
		}

		
		
	},

	renderFinalPath: async function(exitNode) {
		while (!exitNode.isEntry && !controller.stop) {
			view.renderNode(exitNode, "purple");
			exitNode = exitNode.parent;
			await this.sleep(20);
		} view.renderNode(exitNode, "purple");
	},

	getNodeColour: function(node) {
		if ((node.isEntry) || (node.isExit)) {
			colour = "pink"; 		//orange
			console.log("PINK")
		} else if (node.isWall) {
			colour = brick_asset;
		} else if (node.explored) {
			colour = "#7990bf"; 		//bluish purple / explored
		} else colour = grass_asset;
		return colour;
	},

	initControls: function() {
		document.getElementById("grid-height").value = 20;
		document.getElementById("grid-width").value = 20;
		document.getElementById("node-size").value = 10;
	},

	printDetails: function(data) {
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
	

	
