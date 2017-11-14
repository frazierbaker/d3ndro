library(jsonlite)


read.covar <- function(file) {
  # Probably not too useful to copy, unless you're working with
  # CoeViz data (http://polyview.cchmc.org/coeviz_doc.html)
  #
  # This is an example function to read in a covariance matrix
  # It is not universally applicable and not necessary to use d3ndro.
  # First two rows/cols are labels in this case, and are removed from the data before processing.
  full <- read.delim(file, header=F)
  scores <- full[-1,-1][-1,-1]
  sequence <- as.vector(mapply(function(x,y) { return(paste(x,y,sep="")) }, full[1], full[2]))[-1][-1]
  rownames(scores) <- sequence
  colnames(scores) <- sequence
  scores <- as.matrix(scores)
  mode(scores)<-"numeric"
  return(scores)
}

render.clust<- function (input.file, output.file) {
  # You may wish to use this function as a model for how to create
  # your own function to export d3ndro-compatible JSON from
  # an input data file.  You will likely need to change this to fit 
  # your needs.
  scores<-read.covar(input.file) # replace this with your own method of importing a matrix.
  hc <- hclust(as.dist(1-scores), "complete") # feel free to call hclust however you like
  hclust2json(hc, output.file)
}

hclust2json<- function (hc, output.file) {
  # This function is probably the most useful
  # It takes any hclust object and returns JSON compatible with
  # d3ndro visualizations.  Please feel free to use this in your code.
  #   ~ Frazier Baker, http://github.com/frazierbaker/d3ndro
  cluster<-cbind(hc$merge,hc$height)
  write(file=output.file, toJSON(list(merges=cluster,seq=hc$labels,order=hc$order,maxHeight=max(hc$height))))
}
