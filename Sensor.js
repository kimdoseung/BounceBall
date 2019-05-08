/* 센서를 정의함 */
class Sensor extends GameObject{
    constructor(type,container,x,y,width,height,velX,velY,targetX, targetY,bg,src){
	super(type,container,x,y,width,height,velX,velY,targetX, targetY,bg,src);

    }
	tick(velX, velY){
		this.x=this.x+velX;
		this.y=this.y+velY;
	}

}