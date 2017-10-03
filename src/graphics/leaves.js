export default {
    drawLeaves(leaves, parsedJSON, spacing, height, leafRadius) {
		let radius = leafRadius ? leafRadius : spacing / 4;
		let leafUpdate = leaves.selectAll('g')
			.data(Object.values(parsedJSON.leaves));
		let leafEnterGroup = leafUpdate.enter().append('g').attr("id", (d)=>`node${d.id}`);                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             
		leafEnterGroup.append('text')
			.text((d) => d.text)
			.style('fill', (d)=> d.color)
			.attr('transform', (d)=>`translate(${d.x(spacing) - spacing/4},${10 + d.y(height)}) rotate(90)`);
		leafEnterGroup.append('circle')
			.style('fill',(d)=>d.color)
			.style('stroke','none')
			.attr('r', radius)
			.attr('cx', (d, i)=>d.x(spacing)) 
			.attr('cy', (d)=>d.y(height))
			.on('mouseenter', (d) => {
				d3ndro.interaction.highlight(d, parsedJSON, spacing);	
			}).on('mouseleave', (d) => {
				d3ndro.interaction.unhighlight(d, parsedJSON);
			}).on('click', (d) => {
				d3ndro.interaction.leafClick(d, parsedJSON, spacing, height);
			})
		leafUpdate.exit().remove();
    }
};