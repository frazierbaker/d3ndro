export default {
    leafClick(d, parsedJSON, spacing, height) {
        // Only for exposing event
		d3ndro.$('#d3ndro').trigger('d3ndro:leaf:click', [d, parsedJSON, spacing, height]);
	},

	toggleCollapse(id, parsedJSON) {
		let shouldCollapse = !d3ndro.d3.select(`#node${id}`).classed('d3ndro-collapsed');
		if (shouldCollapse) {
			window.d3ndro.interaction.collapse(id, parsedJSON);
		} else {
			window.d3ndro.interaction.uncollapse(id, parsedJSON);
		}
	},

	collapse(id, parsedJSON) {
		let mainElement = d3ndro.d3.select(`#node${id}`);
		
        // Fire event:
        d3ndro.$('#d3ndro').trigger('d3ndro:collapse', [mainElement, parsedJSON]);

		mainElement.classed("d3ndro-collapsed", true);
		parsedJSON.progeny(id).map((node) => {
			let element = d3ndro.d3.select(`#node${node.id}`)
				.classed("d3ndro-invisible", true);
			let collapseLvl = +element.attr('data-d3ndro-collapseLvl');
			collapseLvl = collapseLvl ? collapseLvl+1 : 1;
			element.attr('data-d3ndro-collapseLvl', collapseLvl);
		})
	},

	uncollapsePath(id, parsedJSON) {
        // Not firing an event here because uncollapsePath
        // is called by other functions that expose events.
		parsedJSON.ancestry(id).map((node) => {
			let element = d3ndro.d3.select(`#node${node.id}`);
			element.classed("d3ndro-collapsed", false)
				.classed("d3ndro-invisible", false)
				.attr('data-d3ndro-collapseLvl', 0);
		})
	},

	uncollapse(id, parsedJSON) {
		let mainElement = d3ndro.d3.select(`#node${id}`);

        // Fire event:
        d3ndro.$('#d3ndro').trigger('d3ndro:uncollapse', [mainElement, parsedJSON]);

		mainElement.classed("d3ndro-collapsed", false);
		parsedJSON.progeny(id).map((node) => {
			let element = d3ndro.d3.select(`#node${node.id}`);
			let collapseLvl = +element.attr('data-d3ndro-collapseLvl');
			collapseLvl = collapseLvl ? collapseLvl-1 : 0;
			element.attr('data-d3ndro-collapseLvl', collapseLvl);
			if (collapseLvl == 0) {
				element.classed("d3ndro-invisible", false);
			}
		});
    }
};