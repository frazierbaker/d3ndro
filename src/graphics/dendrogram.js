export default {
    renderDendrogram(parsedJSON, element=d3ndro.d3.select('body'), options=window.d3ndro.options) {
		const internalRadius = options.internalNodeRadius;
		const leafRadius = options.leafNodeRadius;		
		const spacing = options.spacing;
		const svgHeight = options.svgHeight;
		const fontSize = options.fontSize;
		const padding = options.padding;
		const labelSpace = options.labelSpace(parsedJSON);
		const height = svgHeight - padding*2 - labelSpace;
		const width = spacing*(Object.values(parsedJSON.leaves).length+1) + labelSpace;
		let svg = element
			.append('div')
				.attr('id', 'd3ndro')
				.style('overflow', options.svgOverflow(parsedJSON))
				.style('width', '100%')
				.style('height', '100%')
			.append('svg')
				.style('background', options.backgroundColor(parsedJSON))
				.style('width', width + "px")
				.style('font-size', options.fontSize)
				.style('height', svgHeight + "px")
			.append('g')
				.attr('id', 'd3ndro-box')
				.attr('transform', `translate(${padding},${padding})`)

		let clickCallback = options.collapsible ? d3ndro.interaction.toggleCollapse : d3ndro.interaction.toggleGroupHighlight;
			
		let axis = svg.append('g').classed('d3ndro-axis', true);
		let grid = svg.append('g').classed('d3ndro-grid', true);
		let internals = svg.append('g').classed('d3ndro-internal-nodes',true);
		let leaves = svg.append('g').classed('d3ndro-leaves',true);

		window.d3ndro.graphics.drawAxis(axis, grid, parsedJSON, spacing, height);
		window.d3ndro.graphics.drawLeaves(leaves, parsedJSON, spacing, height, leafRadius, !!options.highlightOnHover);	
		window.d3ndro.graphics.drawInternals(internals, parsedJSON, spacing, height, internalRadius, clickCallback);
    }
}