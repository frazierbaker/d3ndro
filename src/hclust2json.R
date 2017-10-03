library(jsonlite)


read.covar <- function(file) {
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
  scores<-read.covar(input.file)
  hc <- hclust(as.dist(1-scores), "complete")
  hclust2json(hc, output.file)
}

hclust2json<- function (hc, output.file) {
  cluster<-cbind(hc$merge,hc$height)
  write(file=output.file, toJSON(list(merges=cluster,seq=hc$labels,order=hc$order,maxHeight=max(hc$height))))
}

colorCodes = c(
    # hydrophobic
    A=clYellow, C=clYellow, F=clYellow, G=clYellow, I=clYellow, L=clYellow, M=clYellow, P=clYellow,
V=clYellow,
    # amphipathic
    H=clDarkYellow, W=clDarkYellow, Y=clDarkYellow,
    # polar
    N=clOrange, Q=clOrange, S=clOrange, T=clOrange,
    # negatively charged
    D=clRed, E=clRed,
    # positively charged
    R=clBrown, K=clBrown)
