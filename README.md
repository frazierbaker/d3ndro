# d3ndro &nbsp; [![](https://data.jsdelivr.com/v1/package/npm/d3ndro/badge)](https://www.jsdelivr.com/package/npm/d3ndro) [![License: CC BY 4.0](https://licensebuttons.net/l/by/4.0/80x15.png)](https://creativecommons.org/licenses/by/4.0/)
Interactive Hierarchical Clustering Vizualization Using D3 &amp; R.

## Features<a name="features"></a>
 - Collapsible d3ndrogram (see [Configuration](#Configuration))
 - Colored leaf nodes (per datum via callback)
 - Colored text labels
 - Quick Scrolling Navigation
 - Simple Integration with R's `hclust` function

## Installation<a name="Installation"></a>
Installing is as simple as including this in your html document:
```
<script src="https://cdn.jsdelivr.net/npm/d3ndro@1.0.0/dist/d3ndro.js"></script>
```

Alternatively, if you use `npm`, you can install it using the following command:
```
npm install d3ndro
```

## Demonstration<a name="Demo"></a>
You can see a demonstration of this library by cloning the repo and running any simple webserver in the root directory.  I personally prefer python's SimpleHTTPServer.

```python -m SimpleHTTPServer 8888```

Then open `http://localhost:8888/demo` in your favorite web browser.

## Usage<a name="Usage"></a>
This visualization tool is meant to be used in conjunction with R's hclust function.  See `src/hclust2json.R` for an hclust2json function that exports d3ndro-compatible JSON.

Once you have generated the JSON from R, you'll need to bring it into your web page using d3.  If you aren't using d3 elsewhere in your project, you can use `d3ndro.d3` to access d3's functions.  See the [demo](#Demo) source code for an example.

## Configuration<a name="Configuration"></a>
### Options<a name="Options"></a>
The d3ndro package offers easy configuration options available through `d3ndro.options`.  To set, just edit the global `d3ndro.options` object before calling any other functions.  I recommend placing configuration options in the same script tag that you use to include d3ndro if you use a script tag to include d3ndro.

Here is a table of all of the options for d3ndro.  To see default functiond definitions, look at src/options.js.

|Option|Description|Default|
|------|-----------|-------|
|d3ndro.options.<strong>backgroundColor</strong>|Function returning the background color for the d3ndrogram plot.  Function can take parsedJSON as a parameter.|See src/options.js|
|d3ndro.options.<strong>collapsible</strong>|Determines whether internal tree nodes should collapse children into them when clicked (and uncollapse when clicked again).|`undefined // (false)`|
|d3ndro.options.<strong>fontSize</strong>|Font size for leaf labels and axes text.|`16`|
|d3ndro.options.<strong>highlightOnHover</strong>|Determines whether the path through the tree to the current leaf node should be highlighted when the mouse is over the leaf node|`undefined // (false)`|
|d3ndro.options.<strong>internalNodeRadius</strong>|Size of the internal (non-leaf) nodes in the tree.|`4`|
|d3ndro.options.<strong>itemColor</strong>|Function to determine color of leaf nodes.  Can take datum (d) as an argument. See the [demo](#Demo) for more deatils.|See src/options.js|
|d3ndro.options.<strong>labelSpace</strong>|Function returning space allocated for each leaf node/label in pixels.  Function can take parsedJSON as a parameter.|See src/options.js|
|d3ndro.options.<strong>leafNodeRadius</strong>|Radius of the leaf node circles in pixels.|`5`|
|d3ndro.options.<strong>mergeColor</strong>|Function returning the color of internal (non-leaf) nodes and connections in the tree. Function can take a merge node datum and index as arguments.|See src/options.js|
|d3ndro.options.<strong>padding</strong>|Number of pixels to offset the dendrogram from the edge.|`24`|
|d3ndro.options.<strong>spacing</strong>|Space to put between each leaf node/label.|`24`|
|d3ndro.options.<strong>svgHeight</strong>|Height of the SVG element conaining the d3ndrogram.|`400`|
|d3ndro.options.<strong>svgOverflow</strong>|Function returning the CSS Policy for when the d3ndrogram is larger than the width. See [this tutorial](https://www.w3schools.com/css/css_overflow.asp) for more information. Function can take parsedJSON as a parameter.|See src/options.js|
|d3ndro.options.<strong>textColor</strong>|Function returning the color for label text.  Function can take a leaf datum as an argument.|See src/options.js|

### Events<a name="Events"></a>
The d3ndro package also exposes events using jQuery for convenience of integration.  See the [demo](#Demo) for an example on how to listen to events.  For your reference, a list of all exposed d3ndro events has been given below:

|Event|Description|Location|
|-----|-----------|--------------|
|`d3ndro:leaf:click`|When a leaf node is clicked.|src/interaction/collapse.js|
|`d3ndro:collapse`|When an internal node is collapsed.|src/interaction/collapse.js|
|`d3ndro:uncollapse`|When a collapsed internal node is expanded.|src/interaction/collapse.js|
|`d3ndro:highlight`|When a path to a leaf node is highlighted.|src/interaction/highlight.js|
|`d3ndro:flash`|When a path to a leaf node is emboldened temporarily through animation.|src/interaction/highlight.js|
|`d3ndro:unhighlight`|When highlighting is removed from a path to a leaf node.|src/interaction/highlight.js|
|`d3ndro:groupHighlight`|When group highlighting is toggled on an internal (non-leaf) node.|src/interaction/highlight.js|
|`d3ndro:scroll`|When automatic scrolling to a leaf node is invoked.|src/interaction/scroll.js|
