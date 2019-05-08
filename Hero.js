class Hero extends GameObject {
    constructor(type, container, x, y, width, height, velX, velY, targetX, targetY, bg, src) {
        super(type, container, x, y, width, height, velX, velY, targetX, targetY, bg, src);
        this.g = 0.05;

        //센서 객체 2개 필요....

        this.upSensor = new Sensor("SENSOR", container, this.x + 5, this.y-1, this.width-10, this.height / 10, this.velX, this.velY, 0, 0, "none", "");
        this.downSensor = new Sensor("SENSOR", container, this.x + 5, this.y + (this.height + 1), this.width-10, this.height / 10, this.velX, this.velY, 0, 0, "none", "");

    }
    //부모의 클래스인 GameObject는 충돌검사로직이 없다..
    //당연한 거다.부모는 가장 기본적이고 일반적인 기능만 가져야 하므로..
    //메서드 업그레드하자!! 오버라이딩
    tick() {
        this.goDown();

        this.upSensor.tick(this.velX, this.velY);
        this.downSensor.tick(this.velX, this.velY);
        this.upSensor.render();
        this.downSensor.render();
        //console.log(this.velX,this.velY);
    }
    goDown() {
        //for문 내에서 주인공을 머물게 할수는 없다..
        //왜?? for문을 돌면서 충돌여부를 검사한다 할지라도,
        //나머지 블락이 false를 만들어내 버리므로, if문에서 
        //주인공을 멈추게 할수는 없다..왜 실행부는 결국 else문을 
        //수행하게 되므로.. 해결책) for문을 돌면서 주인공이 어딘가
        //블럭을 밟고 있는지 여부만 조사하면 된다.. 밟고 있다면
        //주인공은 그 블럭에 머물러 있게 하겠다..
        var sideCount = 0;
        var upCount = 0;
        var downCount = 0;
        var springCount = 0;
        var bombCount = 0;



        //console.log(this.x);
        //전체 벽돌을 대상으로 hit 상태가 true인것이 있다면
        //주인공은 벽돌을 밟고 있는 상태이다.
        for (var i = 0; i < objectManager.objectArray.length; i++) {
            //좌우 검사
            if (objectManager.objectArray[i].type == "BLOCK") {
                if (collisionCheck(this, objectManager.objectArray[i])) {
                    sideCount++;
                }

                //위 
                if (collisionCheck(this.upSensor, objectManager.objectArray[i])) {
                    upCount++;

                }
                //아래 
                if (collisionCheck(this.downSensor, objectManager.objectArray[i])) {
                    downCount++;
                }
            }

        }
        //많이 튕기게하는 블록하고 충돌검사 아래히트박스가 닿은경우만 많이뜀
        for (var i = 0; i < objectManager.objectArray.length; i++) {
            if(objectManager.objectArray[i].type == "SPRING"){
                if (collisionCheck(this.downSensor, objectManager.objectArray[i])) {
                    springCount++;
                }
                if (collisionCheck(this, objectManager.objectArray[i])) {
                    sideCount++;
                }

                if (collisionCheck(this.upSensor, objectManager.objectArray[i])) {
                    upCount++;
                }
            }
        }

        //닿으면 죽는블록 충돌검사 
        for (var i = 0; i < objectManager.objectArray.length; i++) {
            if(objectManager.objectArray[i].type == "BOMB"){
                if (collisionCheck(this.downSensor, objectManager.objectArray[i])) {
                    bombCount++;
                }
                if (collisionCheck(this, objectManager.objectArray[i])) {
                    sideCount++;
                }

                if (collisionCheck(this.upSensor, objectManager.objectArray[i])) {
                    upCount++;
                }
            }
        }
        //골과의 충돌검사 
        for (var i = 0; i < objectManager.objectArray.length; i++) {
            if(objectManager.objectArray[i].type == "GOAL"){
                if (collisionCheck(this, objectManager.objectArray[i])) {
                    level++;
                    this.x = 50;
                    this.y = 50;
                    this.upSensor.x = this.x + 5;
                    this.upSensor.y = this.y;
                    this.downSensor.x = this.x + 5;
                    this.downSensor.y = this.y + (this.height + 1);
                    for (var i =objectManager.objectArray.length-1; i >=0 ; i--) {
                        objectManager.removeObject(objectManager.objectArray[i]);               
                    }

                    if(level>=mapArray.length){
                        end();
                    }else{
                        createBlock();
                        createHero();
                    }
                }
            }
        }        
        //주인공을 해당 벽돌에 멈추게 한다 
		if(sideCount>0){ 
            //console.log("벽에 닿았어요 ", sideCount);
            if(key==37||key==39){
                this.velX=-this.velX;
            }
        }
        //위 검사 
        if (upCount > 0) {
            //console.log("위에 닿았어요 ", upCount);
            this.velY = 3;
        }

        //아래 검사 
        if (downCount > 0) {
            //console.log("바닥에 닿았어요 ", downCount);
            this.velY = -3;
        }
        //스프링블럭 밟았을때
        if (springCount > 0) {
            this.velY = -5;
        }
        //폭탄 밟았을때
        if (bombCount > 0) {
            life--;
            this.x = 50;
            this.y = 50;
            this.upSensor.x = this.x + 5;
            this.upSensor.y = this.y;
            this.downSensor.x = this.x + 5;
            this.downSensor.y = this.y + (this.height + 1);
            if(life<0){
                level=0;
                life+=10;
            }
            for (var i =objectManager.objectArray.length-1; i >=0 ; i--) {
                objectManager.removeObject(objectManager.objectArray[i]);               
            }
            createBlock();
            createHero();
        }
//버그로화면이탈하는거 그나마 막기위한코드
        if (this.x <35) {
            this.velX=-2;
            this.velY=4;
            this.x = this.x+100;
            this.y = this.y+100;
            this.upSensor.x = this.x + 105;
            this.upSensor.y = this.y;
            this.downSensor.x = this.x + 5;
            this.downSensor.y = this.y + (this.height + 1);
        }
        if(this.x >1250){
            this.velX=-2;
            this.velY=-4;
            this.x = 1180;
            this.y = 540;
            this.upSensor.x = this.x + 5;
            this.upSensor.y = this.y;
            this.downSensor.x = this.x + 5;
            this.downSensor.y = this.y + (this.height + 1);
        }
        if(this.y < 30){
            this.x = this.x+100;
            this.y = this.y+100;
            this.upSensor.x = this.x + 105;
            this.upSensor.y = this.y;
            this.downSensor.x = this.x + 5;
            this.downSensor.y = this.y + (this.height + 1);
        }
        if(this.y > 610){
            this.x = 1180;
            this.y = 540;
            this.upSensor.x = this.x + 5;
            this.upSensor.y = this.y;
            this.downSensor.x = this.x + 5;
            this.downSensor.y = this.y + (this.height + 1);            
        }
    //
        this.velY += this.g;//중력
        this.x += this.velX;
        this.y += this.velY;//누적된 값을 y에 적용..
    }

}
