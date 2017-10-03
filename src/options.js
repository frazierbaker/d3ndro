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
	internalNodeRadius: null,
	leafNodeRadius: null,
	labelSpace(parsedJSON) {
		return this.fontSize/2 * Math.max(...Object.keys(parsedJSON.leafLabels).map((key)=>key.length));
	},
	itemColor(...args) {
		return "#000";
	},
	mergeColor(...args) {
		return "#666";
	}
};