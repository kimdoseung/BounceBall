/*최상위 객체를 정의한다!!!
type:주인공 HERO 총알:BULLET 적군:ENEMY
*/

class GameObject{
	constructor(type,container,x,y,width,height,velX,velY,targetX, targetY,bg,src){
        this.type=type; //객체정의
		this.container=container;
		this.x=x; //객체위치
		this.y=y;
		this.width=width;//객체크기
		this.height=height;
		this.velX=velX;//객체이동속도
		this.velY=velY;
		this.targetX=this.targetX;//객체 이동시 목표위치
		this.targetY=this.targetY;
		this.bg=bg; //배경
		this.src=src; //이미지좌표


		this.div=document.createElement("div");
		this.img=document.createElement("img");
		this.div.style.position="absolute";
		this.div.style.left=this.x+"px";
		this.div.style.top=this.y+"px";
		this.div.style.width=this.width+"px";
		this.div.style.height=this.height+"px";
		this.div.style.background=this.bg;
		//이미지 관련 설정
		if(this.src !=""){//이미지가 있을 때만...
			this.img.src=this.src;
			this.img.style.width=this.width+"px";
			this.img.style.height=this.height+"px";
			this.div.appendChild(this.img);
		}
		this.container.appendChild(this.div);
	}	
	//설령 부모가 그 행동을 정해놓을지라도, 이 클래스를 상속받는 자식은
	//부모의 메서드를 무시할 수 있는데,이러한 메서드 재정의 기법을
	//override 라 한다!!
	tick(){
		this.x=this.x+this.velX;
		this.y=this.y+this.velY;
	}
	render(){
		this.div.style.left=this.x+"px";		
		this.div.style.top=this.y+"px";
	}
}
