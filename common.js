
/*------------------------------
getRandom호출시 당신이 원하는 수를 넣어으세요 ex)getRandom(5)를넣으면 0~4를 반환
---------------------------------*/
//배열의 길이는 4, 배열의길이 -1을 넘어서면 안되는 숫자중 하나를 추출하면된다..
//자바스크립트에게 랜덤한 값을 요청한다.
//내장객체 :Array, Math, Date...
//앞으로 객체를 배우게되면 , 내장객체를 사용할 예정,
//자바스크립트에서는 개발자가 개발시 사용빈도가 높은기능들을 이미 잘만들어서
//제공해놓은 객체들을 지원하는데 이를 내장객체라한다
function getRandom(num){
	var r=Math.random();
	var n= parseInt(r*num);
	return n;//함수 중 return에 값을 명시하여, 호출한 자가 그 값을 반환받도록 처리하는 함수를 리턴값 있는함수 , 반환값 있는 함수라 한다.
}


//미니멈에서 맥시멈까지수랜덤으로나오게하는 함수
function getRandomByRange(min,max){
    return parseInt(Math.random()*(max-min))+min;
    
}
//시간 문자열 처리함수!
//호출자는 아래의 사항을 숙지하고쓰세요....
//인수로 넘긴 n이 10보다 작으면, 앞에 "0"문자를 조합해서 결과를 반환해주자!
function getTimeString(n){
	if(n<10){
		n="0"+n;
	}	
	return n;//n을호출한곳에서받음
	
}
/*----------------------------------------------------
인수1 : 나 객체 
인수2 : 상대방 객체
----------------------------------------------------*/
function collisionCheck(me, target) {
	//나의 너비가 상대의 범위에 있는지 체크
	var horizon1=me.x+me.width >= target.x;  //좌측에서 우측으로 접근시
	var horizon2=me.x <= target.x+target.width; //우측에서 좌측으로 접근시
	//나의 높이가 상대의 범위에 있는지 체크
	var vertical1=(me.y+me.height >= target.y);  //위에서 아래로 접근시
	var vertical2=(me.y <= target.y+target.height); //아래에서 위로 접근시
	return (horizon1 && horizon2) && (vertical1 && vertical2);
}
//충돌체크 사전판단
function hitTest(me, target , nextX , nextY) {
	//두물체간 충돌 여부 판단 
	me_x= parseInt(me.div.style.left);
	me_y= parseInt(me.div.style.top);
	me_width=parseInt(me.div.style.width);
	me_height=parseInt(me.div.style.height);
	
	target_x= parseInt(target.div.style.left);
	target_y= parseInt(target.div.style.top);
	target_width=parseInt(target.div.style.width);
	target_height=parseInt(target.div.style.height);
	
	nextX=parseInt(nextX);
	nextY=parseInt(nextY);
	
	
	var result1=(me_x+nextX >= target_x) && (me_x+nextX <= (target_x+target_width));//나의 x좌표위치가 타겟의 x range 내에 있는지 판단 
	var result2=((me_x+me_width+nextX) >= target_x) && ((me_x+me_width+nextX) <= (target_x+target_width)); 	//나의 가로폭이 타겟의 가로폭 내에 있는지 판단
	
	var result3=((me_y+nextY) >= target_y) && ((me_y+nextY) <= (target_y+target_height));//나의 y좌표위치가 타겟의 세로폭 내에 있는지 판단
	var result4=((me_y+me_height+nextY) >= target_y) && ((me_y+me_height+nextY) <= (target_y+target_height));//나의 y폭이 타겟의 세로폭 내에 있는지 판단
	

	return (result1 || result2) && (result3 || result4);
}




/**
 원하는 달이 몇일까지 있는지 구하는 함수!!
 ex 유저가 알고싶은 달이 5월일 경우
 getLastDateOfMonth(2018,4);
 */
function getLastDateOfMonth(year,month){
	var d = new Date();
	//조작하기
	d.setFullYear(year);
	d.setMonth(month+1);//자바스크립트에서는 마지막날을 구할수없기때문에 다음달로 넘어간후 0일을 구한다.
	d.setDate(0);
	//함수 호출자에게 원하는 데이터를 반환 시켜준다.
	return d.getDate();
}
/**
 * 해당 월의 시작 요일 구하기!
 * ex) Date객체를 5월로 세팅하고,날짜는 1일로 세팅한다.
 * 요일을 물어본다.
 *주의)호출시 5월이 궁금하다면 숫자는 4로넘긴다. 월은0부터시작하기때문이다.
 */
function getStartDayOfMonth(year,month){
	var d= new Date(); //현재날짜이후로 조작이 필요하다.
	d.setFullYear(year);
	d.setMonth(month);
	d.setDate(1);//그월의 시작일로 조작
	return d.getDay();
}

