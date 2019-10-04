
function drawAverageImage(ctx,img1,img2){
	
	var image1=renderableImage1
	var image2=renderableImage2
	
	const iD1=ctx.getImageData(image1.x,image1.y,image1.width,image1.height).data;
	const iD2=ctx.getImageData(image2.x+500,image2.y,image2.width,image2.height).data;
	
	var AverageImageData = ctx.createImageData(image1.width,image1.height);
	
	for(var i=0;i<iD2.length || i<iD1.length;i++){
		AverageImageData.data[i]=(iD1[i]+iD2[i])/2
	}
	drawHollowRect({x:2,y:2+500,width:500-4,height:500-4},"#990000")
	ctx.putImageData(AverageImageData,image1.x,image1.y+4+500);
}