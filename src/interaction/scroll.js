export default {
	scrollToLabel(label, parsedJSON, options = window.d3ndro.options) {
		return window.d3ndro.interaction.scrollToLeaf(parsedJSON.leafLabels[label], parsedJSON, options);
	},

	scrollToLeaf(id, parsedJSON, options = window.d3ndro.options) {
        let leaf = parsedJSON.findNode(id);
        
        // Fire event:
        d3ndro.$('#d3ndro').trigger('d3ndro:scroll', [leaf, parsedJSON, options]);

		if (!leaf) {
			return false;
		}
		if(options.collapsible) {
			window.d3ndro.interaction.uncollapsePath(id, parsedJSON);
		}
		let svgParent = d3ndro.d3.select('div#d3ndro');
		let offset = leaf.x(options.spacing) - svgParent.node().getBoundingClientRect().width/2;
		let interpolationX = d3ndro.d3.interpolateNumber(svgParent.node().scrollLeft, offset);
		let interpolationY = d3ndro.d3.interpolateNumber(svgParent.node().scrollTop, options.svgHeight);
		svgParent.transition()
			.duration(750)
			.ease(d3ndro.d3.easeSinOut)
			.tween("scroll", ()=> (t)=> {
				svgParent.node().scrollLeft = interpolationX(t);
				svgParent.node().scrollTop = interpolationY(t);
			}).on('end', () => {
				window.d3ndro.interaction.flash(leaf, parsedJSON, options.spacing);
			});
		return true;
    }
};
