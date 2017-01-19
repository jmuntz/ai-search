view = {
	init: function() {
		console.log("View initializing.");
		
		this.canvas 	= document.getElementById("canvas");
		this.ctx	 	= this.canvas.getContext('2d');
		this.settings 	= controller.getSettings();
		
		this.render();
		
	},

	render: function() {
		var blocks  	= controller.getBlocks();
		
		for (var i = 0; i < blocks.length; i++) {
		
			if (blocks[i].isMine) {
				colour = "red";
			} else if ((blocks[i].isEntry) || (blocks[i].isExit)) {
				colour = "#a858ff";
			} else if (blocks[i].isWall) {
				colour = "black";
			} else colour = "#6d6ddf";

			this.renderBlock(colour, blocks[i]);
		}
	},

	renderTree: function(tree) {
		for (var i = 0; i < tree.length; i++) {
			this.renderBlock("black", tree[i]);

			for (var k = 0; k < tree[i].children.length; k++) {
				this.renderBlock("orange", tree[i].children[k])
			}
		}
	},

	renderBlock: function(block, colour) {
		this.ctx.fillStyle = colour;
		this.ctx.fillRect(
			block.x * (this.settings.blockSize + this.settings.blockGap), 
			block.y * (this.settings.blockSize + this.settings.blockGap), 
			this.settings.blockSize,
			this.settings.blockSize
		);
	},

	renderFinalPath: async function(exitBlock) {
		while (!exitBlock.isEntry) {
			view.renderBlock(exitBlock, "pink");
			exitBlock = exitBlock.parent;
			await sleep(50);
		} view.renderBlock(exitBlock, "pink");
	},
}