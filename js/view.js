view = {
	init: function() {
		console.log("View initializing.");
		
		this.canvas 	= document.getElementById("canvas");
		this.ctx	 	= this.canvas.getContext('2d');
		this.settings 	= controller.getSettings();
		
		this.render();
		
	},

	render: function() {
		console.log("View rendering.");

		var ctx 		= this.ctx;
		var settings 	= this.settings;
		var blocks  	= controller.getBlocks();
		
		for (var i = 0; i < blocks.length; i++) {
		
			if (blocks[i].isMine) {
				ctx.fillStyle = "red";
			} else if ((blocks[i].isEntry) || (blocks[i].isExit)) {
				ctx.fillStyle = "#a858ff";
			} else if (blocks[i].isWall) {
				ctx.fillStyle = "black";
			} else ctx.fillStyle = "#6d6ddf";

			ctx.fillRect(
				blocks[i].x * (settings.blockSize + settings.blockGap), 
				blocks[i].y * (settings.blockSize + settings.blockGap), 
				settings.blockSize,
				settings.blockSize
			);
		}
	},

	renderGreen: function(block) {
		var settings  = this.settings;
		var ctx 	  = this.ctx;

		ctx.fillStyle = "green";

		ctx.fillRect(
			block.x * (settings.blockSize + settings.blockGap), 
			block.y * (settings.blockSize + settings.blockGap), 
			settings.blockSize,
			settings.blockSize
		);
	},

	renderTree: function(tree) {
		var settings  = this.settings;
		var ctx 	  = this.ctx;

		for (var i = 0; i < tree.length; i++) {
			ctx.fillStyle = "black";
			ctx.fillRect(
				tree[i].x * (settings.blockSize + settings.blockGap), 
				tree[i].y * (settings.blockSize + settings.blockGap), 
				settings.blockSize,
				settings.blockSize
			);
			
			for (var k = 0; k < tree[i].children.length; k++) {
				ctx.fillStyle = "orange";
				ctx.fillRect(
					tree[i].children[k].x * (settings.blockSize + settings.blockGap), 
					tree[i].children[k].y * (settings.blockSize + settings.blockGap), 
					settings.blockSize,
					settings.blockSize
				);
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

		// if (!exitBlock.isEntry) {
		// 	setTimeout(function() {
		// 		view.renderBlock(exitBlock, "pink");
		// 		view.renderFinalPath(exitBlock.parent);
		// 	}, 50);
		// } else {
		// 	this.renderBlock(exitBlock, "pink");
		// }

		while (!exitBlock.isEntry) {
			view.renderBlock(exitBlock, "pink");
			exitBlock = exitBlock.parent;
			await sleep(50);
		} view.renderBlock(exitBlock, "pink");

	},
}



async function demo() {
  console.log('Taking a break...');
  await sleep(2000);
  console.log('Two second later');
}