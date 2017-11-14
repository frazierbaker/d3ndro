export default {
    hclust(jsondata, options=window.d3ndro.options) {
		const maxHeight = jsondata.maxHeight;
		let leaves = {};
		let leafLabels = {};
		jsondata.seq.map((label, i)=>{
			leaves[`${-(i+1)}`] = {
				text: label,
				id: -(i+1),
				leaf: true,
				color: options.itemColor(label, i),
				textColor: options.textColor(label, i),
				children: null,
				parent: null,
				distance: 0,
				order: jsondata.order.indexOf((i+1))+1,
				x(spacing=20) {
					return this.order * spacing;
				},
				y(height=400) {
					return height;
				}
			}
			leafLabels[label] = -(i+1);
		});
		
		let internalNodes = {};
		
		for(var i = 0; i< jsondata.merges.length; i++) {
			let merge = jsondata.merges[i];
			
			let self = {
				id: i+1,
				text: "",
				color: options.mergeColor(merge, i),
				leaf: false,
				parent: null,
				children: [],
				distance: merge[2],
				order: i+1,
				x(spacing=20) {
					if(this.children.length == 2) {
						let cid1 = this.children[0];
						let cid2 = this.children[1];
						let child1 = (cid1 < 0) ? leaves[cid1] : internalNodes[cid1];
						let child2 = (cid2 < 0) ? leaves[cid2] : internalNodes[cid2];
						return (child1.x(spacing) + child2.x(spacing))/2;
					}
					return this.order * spacing;
				},
				y(height=400) {
					return height-(this.distance * height/maxHeight);
					
				}
			};
			
			if(merge[0] < 0) {
				leaves[merge[0]].parent = self.id;
			} else {
				internalNodes[merge[0]].parent = self.id;
			}
			
			if(merge[1] < 0) {
				leaves[merge[1]].parent = self.id;
			} else {
				internalNodes[merge[1]].parent = self.id;
			}
			self.children.push(merge[0]);
			self.children.push(merge[1]);
			
			internalNodes[`${i+1}`] = self;
		};
		return {
			leaves,
			leafLabels,
			internalNodes,
			maxHeight,
			findNode(i) {
				return (i < 0) ? this.leaves[i] : this.internalNodes[i];
			},
			ancestry(i) {
				let node = this.findNode(i);
				if (!node) {
					return [];
				}
				let ancestors = this.ancestry(node.parent);
				ancestors.push(node);
				return ancestors;
			},
			progeny(i) {
				let node = this.findNode(i);
				if(!node || !node.children) {
					return [];
				}
				let descendants = this.progeny(node.children[0]).concat(this.progeny(node.children[1]));
				descendants.push(this.findNode(node.children[0]), this.findNode(node.children[1]));
				return descendants;
			}
		};
    }
};