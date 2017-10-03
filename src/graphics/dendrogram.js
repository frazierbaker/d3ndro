export default {
    renderDendrogram(parsedJSON, options=window.d3ndro.options) {
		const internalRadius = options.internalNodeRadius;
		const leafRadius = options.leafNodeRadius;		
		const spacing = options.spacing;
		const svgHeight = options.svgHeight;
		const fontSize = options.fontSize;
		const padding = options.padding;
		const labelSpace = options.labelSpace(parsedJSON);
		const height = svgHeight - padding*2 - labelSpace;
		const width = spacing*(Object.values(parsedJSON.leaves).length+1) + labelSpace;
		let svg = d3.select('body')
			.append('div')
				.attr('id', 'd3ndro')
				.style('overflow', options.svgOverflow(parsedJSON))
			.append('svg')
				.style('background', options.backgroundColor(parsedJSON))
				.style('width', width)
				.style('font-size', options.fontSize)
				.style('height',svgHeight)
			.append('g')
				.attr('id', 'd3ndro-box')
				.attr('transform', `translate(${padding},${padding})`)

			
		let axis = svg.append('g').classed('d3ndro-axis', true);
		let grid = svg.append('g').classed('d3ndro-grid', true);
		let leaves = svg.append('g').classed('d3ndro-leaves',true);
		let internals = svg.append('g').classed('d3ndro-internal-nodes',true);

		window.d3ndro.graphics.drawAxis(axis, grid, parsedJSON, spacing, height);
		window.d3ndro.graphics.drawLeaves(leaves, parsedJSON, spacing, height, leafRadius);	
		window.d3ndro.graphics.drawInternals(internals, parsedJSON, spacing, height, internalRadius);
    }
}