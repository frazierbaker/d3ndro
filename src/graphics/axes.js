export default {
	drawAxis(axes, grid, parsedJSON, spacing, height) {
		const width = spacing*(Object.values(parsedJSON.leaves).length+1);
		grid.classed('d3ndro-grid', true);
		
		// Draw vertical axis bar
		axes.classed('d3ndro-axis', true)
			.append('path')
			.attr('d',`M0,0V${height}`);

		// Draw top tick with label
		axes.append('path')
			.attr('d', `M0,0H${spacing/2}`)
		axes.append('text')
			.attr('x', -spacing/2)
			.attr('y', 0)
			.text(parsedJSON.maxHeight)

		//Draw top gridline
		grid.append('path')
			.attr('d', `M0,0H${width}`)
			.classed('d3ndro-grid-extremity', true);

		for(var i = 0.1; i <= 0.9; i+=0.1) {
			// Draw intermediate ticks
			axes.append('path')
				.attr('d', `M0,${height * i}H${spacing/3}`);
			
			grid.append('path')
				.attr('d', `M0,${height * i}H${width}`)
				.classed('d3ndro-grid', true)
				.classed('d3ndro-grid-mid', i==0.5);
		}

		// Draw bottom tick with label
		axes.append('path')
			.attr('d', `M0,${height}H${spacing/2}`)
		axes.append('text')
			.attr('x', -spacing/2)
			.attr('y', height)
			.text('0')
		
		// Draw bottom gridline
		grid.append('path')
			.attr('d', `M0,${height}H${width}`)
			.classed('d3ndro-grid-extremity', true)
	}
};