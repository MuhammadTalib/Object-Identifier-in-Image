var surroundings
var imagedata
var alreadyChecked 
function identifyObject(cvs,image1){
	
	surroundings=[]  //that holds the un processed pixels of the outline of processed pixel
	alreadyChecked=[] //those pixels that are aleary processed and should'nt pushed to proceesing queue
	
	
	var ctx=cvs.getContext("2d");
			
	//getting data of image
	const iD1=ctx.getImageData(0,0,500,500).data;
	
	//creating a new output image
	imagedata = ctx.createImageData(500,500);
			
	//handling click event on image
	cvs.onclick=function(e){
				
		var rect = cvs.getBoundingClientRect();   	//The getBoundingClientRect() method returns the size of an element 
													//and its position relative to the viewport. This method returns a 
													//DOMRect object with eight properties: left, top, right, bottom, x, y, width, height.
													
		var x=e.clientX-rect.left
		var y=e.clientY-rect.top
		
		x=Math.floor(x)  //flooring x and y to make it integer
		y=Math.floor(y)
		
		//getting pixel data of clicked pixel
		var c = ctx.getImageData(x,y, 1, 1).data;
		
		//finding the index in data of the clicked pixel
		var i=(500*4*(Math.floor(y)))+((Math.floor(x))*4)
		
		//identifying the color which is clicked
		var color=identifyColor(c[0],c[1],c[2])
		
		//setting that clicked pixel on the new outpu image
		imagedata.data[i]=iD1[i]
		imagedata.data[i+1]=iD1[i+1]
		imagedata.data[i+2]=iD1[i+2]
		imagedata.data[i+3]=iD1[i+3]
		
		//adding that click pixels in the surrounding array to process its surroundings furthur
		
		surroundings.push({r:c[0],g:c[1],b:c[2],x:Math.floor(x),y:Math.floor(y),i:i})
		
		
		//checking the surrounding array if same color occurs then add in array else dont add in surrounding
		while(surroundings.length>0){
			ctx.putImageData(imagedata,0,500)
			if(surroundings.length>0){
				identifySurroundings(color,iD1)
			}else{
				break
			}
		}
				
		ctx.putImageData(imagedata,0,500)
				
	}			
			

}
function alreadyNotChecked(i){
	var a,b=false
	for(a=0;a<alreadyChecked.length;a++){
		if(alreadyChecked[a].i===i){
			b=true
			return false
		}
	}
	return true
	
}
function identifySurroundings(color,iD){
	if(surroundings.length>0){
		var pop=surroundings.pop()
		alreadyChecked.push(pop)
		var x=pop.x
		var y=pop.y
		x1=x-1
		y1=y
		x2=x+1
		y2=y
		x3=x
		y3=y-1
		x4=x
		y4=y+1
		var i=(500*4*y1)+(x1*4)
		if(identifyColor(iD[i],iD[i+1],iD[i+2],i)===color && alreadyNotChecked(i)){

			imagedata.data[i]=iD[i]
			imagedata.data[i+1]=iD[i+1]
			imagedata.data[i+2]=iD[i+2]
			imagedata.data[i+3]=iD[i+3]
			surroundings.push({r:iD[i],g:iD[i+1],b:iD[i+2],x:x1,y:y1,i:i})
		}
		i=(500*4*y2)+(x2*4)

		if(identifyColor(iD[i],iD[i+1],iD[i+2],i)===color && alreadyNotChecked(i)){
		
			imagedata.data[i]=iD[i]
			imagedata.data[i+1]=iD[i+1]
			imagedata.data[i+2]=iD[i+2]
			imagedata.data[i+3]=iD[i+3]
			surroundings.push({r:iD[i],g:iD[i+1],b:iD[i+2],x:x2,y:y2,i:i})
		}
		i=(500*4*y3)+(x3*4)

		if(identifyColor(iD[i],iD[i+1],iD[i+2],i)===color && alreadyNotChecked(i)){
		
			imagedata.data[i]=iD[i]
			imagedata.data[i+1]=iD[i+1]
			imagedata.data[i+2]=iD[i+2]
			imagedata.data[i+3]=iD[i+3]
			surroundings.push({r:iD[i],g:iD[i+1],b:iD[i+2],x:x3,y:y3,i:i})
		}
		i=(500*4*y4)+(x4*4)

		if(identifyColor(iD[i],iD[i+1],iD[i+2],i)===color && alreadyNotChecked(i)){
			
			imagedata.data[i]=iD[i]
			imagedata.data[i+1]=iD[i+1]
			imagedata.data[i+2]=iD[i+2]
			imagedata.data[i+3]=iD[i+3]
			surroundings.push({r:iD[i],g:iD[i+1],b:iD[i+2],x:x4,y:y4,i:i})
		}
		

	}
	else{
		console.log("length is zero",imagedata)
	}
	
}
function identifyColor(r,g,b,i){
	
	if((r-28>g && r-10>b && g-b<=100 && b-g<=100)) return "red"
	else if((g-28>=r && g-10>=b && r-b<=100 && b-r<=100)) return "green"
	else if((b-10>=g && b-10>=r && g-r<=180 && r-g<=180)) return "blue"
	else return "undefined"
}