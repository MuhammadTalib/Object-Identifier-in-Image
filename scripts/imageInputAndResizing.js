
function inputImage1(){
	imageLabel="img1"
	drawRect({x:0,y:0,width:500,height:500},"#fff")
	document.getElementById("imageFile").click()
}
function inputImage2(){
	imageLabel="img2"
	drawRect({x:500,y:0,width:500,height:500},"#c7c7c7")
	document.getElementById("imageFile").click()
}
function handleFiles(){
    var theGoods=document.getElementById("imageFile").files[0];
    img=new Image();
    var reader=new FileReader();
    reader.addEventListener("load",function(){
        img.src=reader.result;
    })
    img.onload = function(){ 
	console.log("image data",img.data)
		calcAndGraph(img)
    }
    if(theGoods) {
        reader.readAsDataURL(theGoods);
    }
}
function calcAndGraph(img){
    width=img.width;
    height=img.height;
	if(imageLabel==="img1") {
		console.log("img1")
		renderableImage1=fitImageOn({width:500-4,height:500-4},img)
		drawHollowRect({x:2,y:2,width:500-4,height:500-4},"#000099")
		ctx.drawImage(img,renderableImage1.x+4,renderableImage1.y+4,renderableImage1.width-4,renderableImage1.height-4);
	}
	if(imageLabel==="img2"){ 
	console.log("img2")
		renderableImage2=renderableImage1
		drawHollowRect({x:500+2,y:2,width:500-4,height:500-4},"#cc0000")
		ctx.drawImage(img,renderableImage2.x+500+4,renderableImage2.y+4,renderableImage2.width-4,renderableImage2.height-4);
	}
}

var fitImageOn=function(canvas,imageObj){
	var imageAspectRatio=imageObj.width/imageObj.height;
	var canvasAspectRatio=canvas.width/canvas.height
	var renderableWidth,renderableHeight,xStart,yStart
	
	if(imageAspectRatio>canvasAspectRatio){
		
		renderableWidth=canvas.width
		renderableHeight=imageObj.height*(renderableWidth/imageObj.width)
		xStart=0
		yStart=(canvas.height-renderableHeight)/2
		
	}else if(imageAspectRatio<canvasAspectRatio){
		
		renderableHeight=canvas.height
		renderableWidth=imageObj.width*(renderableHeight/imageObj.height)
		xStart=(canvas.width-renderableWidth)/2
		yStart=0
		
	}else{
		renderableHeight=canvas.height
		renderableWidth=canvas.width
		xStart=0
		yStart=0
	}
	return {x:xStart,y:yStart,width:renderableWidth,height:renderableHeight}
	
}