export default {
	drawInternals(internals, parsedJSON, spacing, height, internalRadius, clickCallback) {
		let radius = internalRadius;
		let internalUpdate = internals.selectAll('g')
			.data(Object.values(parsedJSON.internalNodes));
		let internalEnterGroup = internalUpdate.enter().append('g').attr("id", (d)=>`node${d.id}`);
		internalEnterGroup.append('path')
			.attr('d', (d)=> {
				let child1 = parsedJSON.findNode(d.children[0]);
				let c1x = child1.x(spacing);
				let c1y = child1.y(height);
				let lineData = [
					{x: c1x, y: c1y},
					{x: c1x, y: d.y(height)},
					{x: d.x(spacing), y: d.y(height)}
				];
				let lineF =  d3ndro.d3.line()
					.x((pt) => pt.x)
					.y((pt) => pt.y);
				return lineF(lineData);
			})
			.style('fill', 'none')
			.style('stroke', (d)=>d.color)
			.style('stroke-width', '1pt')
			.attr('id', (d) => `connect${d.children[0]}`);
		internalEnterGroup.append('path')
			.attr('d', (d)=> {
				let child2 = parsedJSON.findNode(d.children[1]);
				let c2x = child2.x(spacing);
				let c2y = child2.y(height);
				let lineData = [
					{x: d.x(spacing), y: d.y(height)},
					{x: c2x, y: d.y(height)},
					{x: c2x, y: c2y}
				];
				let lineF =  d3ndro.d3.line()
					.x((pt) => pt.x)
					.y((pt) => pt.y);
				return lineF(lineData);
			})
			.style('fill', 'none')
			.style('stroke', (d)=>d.color)
			.style('stroke-width', '1pt')
			.attr('id', (d) => `connect${d.children[1]}`);

		internalEnterGroup.append('rect')
			.style('fill',(d)=>d.color)
			.attr('x', (d, i)=>d.x(spacing) - radius) 
			.attr('y', (d)=>d.y(height) - radius)
			.attr('width', radius*2)
			.attr('height', radius*2)
			.on('click', (d) => clickCallback(d.id, parsedJSON));

		internalUpdate.exit().remove();
    }
}