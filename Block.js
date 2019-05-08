class Block extends GameObject{
	constructor(type,container,x,y,width,height,velX,velY,targetX, targetY,bg,src){
		//나를 초기화 하기전에 반드시!! 부모를 먼저 초기화
		//해야 한다 따라서 부모생성자 호출보다 앞서는 코드는
		//있을 수 없다!!
		super(type,container,x,y,width,height,velX,velY,targetX, targetY,bg,src);
	}
}