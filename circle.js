function Circle(){
	this.x=0;
	this.y=0;
	this.d=0;


	this.draw=function (){
		ellipse(this.x,this.y,this.d,this.d);
	}
	this.draw1=function (){
		ellipse(0,0,this.d,this.d);
	}
}