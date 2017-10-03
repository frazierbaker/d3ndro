export default {
	highlight(d, parsedJSON, spacing) {
        // Fire event:
        $('#d3ndro').trigger('d3ndro:highlight', [d, parsedJSON, spacing]);

		parsedJSON.ancestry(d.id).map((node) => {
			d3.select(`#node${node.id} circle`)
				.style('stroke', node.color)
				.style('stroke-width', spacing / 5);
			d3.select(`#connect${node.id}`)
				.style('stroke-width', spacing / 5)
		})
	},

	
	flash(d, parsedJSON, spacing) {
        // Fire event:
        $('#d3ndro').trigger('d3ndro:flash', [d, parsedJSON, spacing,]);

		let relatedNodes = parsedJSON.ancestry(d.id);
		d3.select(`#node${d.id}`).transition()
			.ease(d3.easeCircleIn)
			.duration(2000)
			.tween("flash", () => (t)=>{
				relatedNodes.map((node) => {
					d3.select(`#node${node.id} circle`)
						.style('stroke', node.color)
						.style('stroke-width', (1-t)*(spacing / 5));
					d3.select(`#node${node.id} text`)
						.style('stroke', node.color)
						.style('stroke-width', (1-t)*(2));
					d3.select(`#connect${node.id}`)
						.style('stroke-width', (1-t)*(spacing / 5 - 1) + 1);
				});
			});
	},

	unhighlight(d, parsedJSON) {
        // Fire event:
        $('#d3ndro').trigger('d3ndro:unhighlight', [d, parsedJSON]);

		parsedJSON.ancestry(d.id).map((node) => {
			d3.select(`#connect${node.id}`)
				.style('stroke-width', 1);
			d3.select(`#node${node.id} circle`)
				.style('stroke', 'none')
				.style('stroke-width', 0);
		})
    },
};