var imagedata,img1,iD1,iD2,t
function Transfer(cvs,image1,image2){
	img1=new Image(image1,image1.x,image1.y)

	t=0
    iD1=ctx.getImageData(image1.x,image1.y,image1.width,image1.height).data;
    iD2=ctx.getImageData(image2.x+500,image2.y,image2.width,image2.height).data;
	imagedata = ctx.createImageData(image1.width,image1.height);
	
	requestAnimationFrame(gameLoop)
	
	ctx.putImageData(imagedata, image1.x,image1.y+4+500);

}
function gameLoop() {
	if(t<=1){
		//clearCanvas(cvs)
		update()
		render()
		requestAnimationFrame(gameLoop)
	}

}

function clearCanvas(cvs){
	const ctx = cvs.getContext("2d")
	ctx.save()
	ctx.globalCompositeOperation ="copy"
	ctx.strokeStyle="transparent"
	ctx.beginPath()
	ctx.lineTo(0,0)
	ctx.stroke()
	ctx.restore()
}
function render(){
    console.log("imageDtaa",imagedata)
    ctx.putImageData(imagedata, img1.x,img1.y+4+500);
}
function update(){

    for(var i=0;i<iD1.length;i++){
		imagedata.data[i]=lerp(iD1[i],iD2[i],t)
	}
	t+=0.002
}
function lerp(start,end,t){
	return (1-t)*start+(t*end)
}