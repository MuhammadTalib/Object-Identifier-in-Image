
function transparentColor(ctx,image1,color){
	
	//transparent the object with color
	
	//getting data of image
	const iD1=ctx.getImageData(image1.x,image1.y,image1.width,image1.height).data;

	//creating a new output image
	var TransparentRedImgData = ctx.createImageData(image1.width,image1.height);
	
	//Initially copying the data of image into output image
	for(var i=0;i<iD1.length;i++){
		TransparentRedImgData.data[i]=iD1[i]
	}
	
	//Searching for the color pixels that has to be transparent and making it transparent
	for(var i=0;i<iD1.length;i+=4){
		if(color==="red"){
			//console.log("is Red",i,iD1[i],iD1[i+1],iD1[i+2])
			//IMPORTANT CONDITIONS
			//(iD1[i]>=80 && iD1[i]<=255  && iD1[i+1]-iD1[i+2]<=15 && iD1[i+1]<=70 && iD1[i+2]<=70)||(iD1[i]>=200 && iD1[i]<=255  && iD1[i+1]<=127 && iD1[i+2]<=127)||
			if((iD1[i]-28>iD1[i+1] && iD1[i]-10>iD1[i+2] && iD1[i+1]-iD1[i+2]<=100 && iD1[i+2]-iD1[i+1]<=100)){
				TransparentRedImgData.data[i]=iD1[i]
				TransparentRedImgData.data[i+1]=iD1[i+1]
				TransparentRedImgData.data[i+2]=iD1[i+2]
				TransparentRedImgData.data[i+3]=0
			}else{
				TransparentRedImgData.data[i]=iD1[i]
				TransparentRedImgData.data[i+1]=iD1[i+1]
				TransparentRedImgData.data[i+2]=iD1[i+2]
				TransparentRedImgData.data[i+3]=iD1[i+3]
			}
		}
		if(color==="blue"){
			
			//IMPORTANT CONDITIONS
			//(iD1[i]>=80 && iD1[i]<=255  && iD1[i+1]-iD1[i+2]<=15 && iD1[i+1]<=70 && iD1[i+2]<=70)||(iD1[i]>=200 && iD1[i]<=255  && iD1[i+1]<=127 && iD1[i+2]<=127)||
			if((iD1[i+2]-10>=iD1[i+1] && iD1[i+2]-10>=iD1[i] && iD1[i+1]-iD1[i]<=180 && iD1[i]-iD1[i+1]<=180)){
				TransparentRedImgData.data[i]=iD1[i]
				TransparentRedImgData.data[i+1]=iD1[i+1]
				TransparentRedImgData.data[i+2]=iD1[i+2]
				TransparentRedImgData.data[i+3]=0
			}else{
				TransparentRedImgData.data[i]=iD1[i]
				TransparentRedImgData.data[i+1]=iD1[i+1]
				TransparentRedImgData.data[i+2]=iD1[i+2]
				TransparentRedImgData.data[i+3]=iD1[i+3]
			}
			
		}
		if(color==="green"){
			
			//IMPORTANT CONDITIONS
			//(iD1[i]>=80 && iD1[i]<=255  && iD1[i+1]-iD1[i+2]<=15 && iD1[i+1]<=70 && iD1[i+2]<=70)||(iD1[i]>=200 && iD1[i]<=255  && iD1[i+1]<=127 && iD1[i+2]<=127)||
			if((iD1[i+1]-10>=iD1[i] && iD1[i+1]-10>=iD1[i+2] && iD1[i]-iD1[i+2]<=100 && iD1[i+2]-iD1[i]<=100)){
				TransparentRedImgData.data[i]=iD1[i]
				TransparentRedImgData.data[i+1]=iD1[i+1]
				TransparentRedImgData.data[i+2]=iD1[i+2]
				TransparentRedImgData.data[i+3]=0
			}else{
				TransparentRedImgData.data[i]=iD1[i]
				TransparentRedImgData.data[i+1]=iD1[i+1]
				TransparentRedImgData.data[i+2]=iD1[i+2]
				TransparentRedImgData.data[i+3]=iD1[i+3]
			}
			
		}
	}
	return TransparentRedImgData
	
	
}
