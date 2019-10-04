var key
function invertColor(ctx,img){
	key=0
	console.log("Unverting")
	var image1=img
	
	//getting data of image
	const iD=ctx.getImageData(image1.x,image1.y,image1.width,image1.height).data;
	
	//inverting image with animation
	animateInversion(image1,iD)
}

//animation function
function animateInversion(img,iD){
	setTimeout(()=>{
		if(key<256){
			
			drawInversion(img,iD,key)
			key++
			animateInversion(img,iD)
		}
	},100,img,iD)
}


function drawInversion(img,iD,vary){
	
	
	//creating a new output image
	var imagedata = ctx.createImageData(img.width,img.height);
	
	
	for(var i=0;i<iD.length;i+=4){
		imagedata.data[i] = vary-iD[i];
		imagedata.data[i+1] = vary-iD[i+1];
		imagedata.data[i+2] = vary-iD[i+2];
		imagedata.data[i+3] = iD[i+3];
	}
	ctx.putImageData(imagedata, img.x,img.y+4+500);
}