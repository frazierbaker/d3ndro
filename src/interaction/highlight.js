export default {
	highlight(d, parsedJSON, spacing) {
        // Fire event:
        d3ndro.$('#d3ndro').trigger('d3ndro:highlight', [d, parsedJSON, spacing]);

		parsedJSON.ancestry(d.id).map((node) => {
			d3ndro.d3.select(`#node${node.id} circle`)
				.style('stroke', node.color)
				.style('stroke-width', spacing / 5);
				d3ndro.d3.select(`#connect${node.id}`)
				.style('stroke-width', spacing / 5)
		})
	},

	
	flash(d, parsedJSON, spacing) {
        // Fire event:
        d3ndro.$('#d3ndro').trigger('d3ndro:flash', [d, parsedJSON, spacing,]);

		let relatedNodes = parsedJSON.ancestry(d.id);

		d3ndro.d3.select(`#node${d.id}`).transition()
			.ease(d3ndro.d3.easeCircleIn)
			.duration(2000)
			.tween("flash", () => (t)=>{
				d3ndro.d3.select(`#node${d.id} circle`)
					.style('stroke', t > 0.8 ? "#000" : d.color)
					.style('stroke-width', (1-t)*(spacing / 5)+0.25);
				d3ndro.d3.select(`#node${d.id} text`)
					.style('stroke', "#000")
					.style('stroke-width', (1-t)*(2)+0.25);
				relatedNodes.map((node) => {
						d3ndro.d3.select(`#connect${node.id}`)
						.style('stroke-width', (1-t)*(spacing / 5 - 1) + 1);
				});
			}).on('end', ()=> {
				d3ndro.d3.selectAll('.d3ndro-group-highlighted-path')
					.style('stroke-width', '3pt');
			});
	},

	unhighlight(d, parsedJSON) {
        // Fire event:
        d3ndro.$('#d3ndro').trigger('d3ndro:unhighlight', [d, parsedJSON]);

		parsedJSON.ancestry(d.id).map((node) => {
			d3ndro.d3.select(`#connect${node.id}`)
				.style('stroke-width', 1);
				d3ndro.d3.select(`#node${node.id} circle`)
				.style('stroke', 'none')
				.style('stroke-width', 0);
		})
	},
	
	toggleGroupHighlight(id, parsedJSON, color="#7D7") {
        // Fire event:
		d3ndro.$('#d3ndro').trigger('d3ndro:groupHighlight', [id, parsedJSON, color]);
		
		let boolValue = !(d3ndro.d3.select(`#node${id}`).attr('data-d3ndro-group-highlighted') === "true")
		d3ndro.d3.select(`#node${id}`)
			.attr('data-d3ndro-group-highlighted', boolValue.toString())
		parsedJSON.progeny(id).map((node)=>{
			let parentNode = parsedJSON.findNode(node.parent);
			d3ndro.d3.select(`#connect${node.id}`)
				.classed('d3ndro-group-highlighted-path', boolValue)
				.style('stroke', boolValue ? color : parentNode.color)
				.style('stroke-width', boolValue ? '3pt' : '1pt');
				d3ndro.d3.select(`#node${node.id} rect`)
				.classed('d3ndro-group-highlighted', boolValue)
		})
	}
};