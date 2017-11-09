export default {
	backgroundColor(...args) {
		return "#FFF";
	},
	svgOverflow(...args) {
		return "scroll";
	},
	fontSize: 16,
	spacing: 24,
	svgHeight: 400,
	padding: 24,
	internalNodeRadius: 4,
	leafNodeRadius: 5,
	labelSpace(parsedJSON) {
		return this.fontSize/2 * Math.max(...Object.keys(parsedJSON.leafLabels).map((key)=>key.length));
	},
	itemColor(...args) {
		return "#000";
	},
	textColor(...args) {
		return this.itemColor.call(this, args);
	},
	mergeColor(...args) {
		return "#666";
	}
};