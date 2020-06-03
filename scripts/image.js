class Image{
    constructor(img,x,y){
        this.img=img
        this.x=img.x
        this.y=img.y
        this.width=img.width
        this.height=img.height
    }
    getImageData(){
        return ctx.getImageData(this.x,this.y,this.width,this.height).data
    }
    
}