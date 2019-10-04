var width, height
window.onload=myInit();
let activeColor='red';
let yAxis=false;
var ctx
var cvs
var imgwidth
var imgheight
var renderableImage1
var renderableImage2
var imageLabel=""
var img ,j=0,k=0
var rD,gD,bD
function myInit(){
	
	renderableImage1=null
	renderableImage2=null
	imageLabel=""
	
    cvs=document.getElementById("mycanvas");
	ctx=cvs.getContext("2d");
	
	imgwidth=cvs.width-180
	imgheight=cvs.height/2
	
	drawImageBack()
	//drawing nav bar
	DrawNavBar()
	
    document.getElementById("imageFile").addEventListener("change",handleFiles);
}

function DrawNavBar(){
	var rect={
			x:cvs.width-180,
			y:0,
			width:180,
			height:cvs.height
		}
	drawRect(rect,"#0066cc")
	
	button(cvs.width-165,15,120,30,"Image Input1","#e6f2ff","#0059b3",inputImage1)
	button(cvs.width-165,60,120,30,"Image Input2","#e6f2ff","#0059b3",inputImage2)
	button(cvs.width-165,105,120,30,"Average Image","#e6f2ff","#0059b3",()=>drawAverageImage(ctx,renderableImage1,renderableImage2))
	button(cvs.width-165,150,120,30,"Transparent Red","#f00","#fff",()=>{
		var img=transparentColor(ctx,renderableImage1,"red")
		ctx.putImageData(img,0,4+500);
		drawHollowRect({x:2,y:2+500,width:500-4,height:500-4},"#990000")
	
	})
	button(cvs.width-165,195,120,30,"Transparent Blue","#00f","#fff",()=>{
		var img=transparentColor(ctx,renderableImage1,"blue")
		ctx.putImageData(img,0,4+500);
		drawHollowRect({x:2,y:2+500,width:500-4,height:500-4},"#990000")
	})
	
	button(cvs.width-165,240,120,30,"Transparent Green","#0f0","#fff",()=>{
		var img=transparentColor(ctx,renderableImage1,"green")
		ctx.putImageData(img,0,4+500);
		drawHollowRect({x:2,y:2+500,width:500-4,height:500-4},"#990000")
	})
	button(cvs.width-165,285,120,30,"Invert Color","#e6f2ff","#0059b3",()=>{
		invertColor(ctx,renderableImage1)
	})
	button(cvs.width-165,375,120,30,"Identify Object","#e6f2ff","#0059b3",()=>{
		identifyObject(cvs,renderableImage1)
	})
}

function drawRect(rect,color){
	grid=new Path2D();
	grid.rect(rect.x,rect.y,rect.width,rect.height);
	ctx.fillStyle=color
	ctx.fill(grid);
}
function drawHollowRect(rect,color){
	ctx.beginPath();
	ctx.rect(rect.x, rect.y, rect.width, rect.height);
	ctx.strokeStyle=color
	ctx.lineWidth=4
	ctx.stroke();
}
function drawImageBack(){
	var rect={
			x:0,
			y:0,
			width:imgwidth,
			height:imgheight
		}
	ctx.globalAlpha = 1;	
	drawRect(rect,"#fff")
	var rect={
			x:0,
			y:cvs.height/2,
			width:imgwidth,
			height:imgheight
		}
	ctx.globalAlpha = 1;
	drawRect(rect,"#fff")
}
function delayColor (func,rect,arr,len) {	
	setTimeout(function () {  
		if (j < len-1) {
			func(rect,"rgb(0,"+arr[j]+",0)")
			j++
			
			delayColor(func,rect,arr,len);          
		}                       
	}, 10,func,rect,arr,len)
}
function interpolation(a,b,t){
	var nx = a.x+(b.x-a.x)*t;
    var ny = a.y+(b.y-a.y)*t;
    return {x:nx,  y:ny};
}
function drawPixel(x,y,color){
	ctx.beginPath();
	ctx.moveTo(x,y);
	ctx.lineTo(x+1,y+1);
	ctx.strokeStyle=color
	ctx.stroke();
}
function animateLine(interpolate,l1,l2,time,color){
	setTimeout(function (){
			if (j < 1) {
				var sol=interpolate(l1,l2,j)
				drawPixel(sol.x,sol.y,color)
				j+=time
				animateLine(interpolate,l1,l2,time,color);          
		}  
		},1,interpolate,l1,l2,time,color)
}
function DrawLineWithAnimation(l1,l2,color){
	var time=1/1000
		console.log("time",time)
		j=0
		animateLine(interpolation,l1,l2,time,color)
}