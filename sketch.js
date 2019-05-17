
var mapimg;

var clat=0;
var clon=0;

//31.2304° N, 121.4737° E
// 
var lat=31.2304;
var lon=121.4737;

var zoom=1;
var earthquakes;
var circles=[];

let a = 0.0;
let s = 0.0;


function preload(){
	mapimg=loadImage('https://api.mapbox.com/styles/v1/mapbox/dark-v9/static/0,0,1,0,0/1024x512?access_token=pk.eyJ1Ijoiam9zZXBoLW1vdGhhIiwiYSI6ImNqdnBrNDRydDBzb3k0YW8xZjltM2dyaTIifQ.P5svPmWFy5gltpYhu2zaJA');
	earthquakes=loadStrings("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_week.csv");


}

function mercX(lon){
	lon=radians(lon);
	var a=(256/PI)*pow(2,zoom);
	var b=lon+PI;

	return a*b;
}

function mercY(lat){
	lat=radians(lat);
	var a=(256/PI)*pow(2,zoom);
	var b=tan(PI/4+lat/2);
	var c=PI-log(b);

	return a*c;
}


function setup(){

	createCanvas(1024,512);
	translate(width/2,height/2);
	imageMode(CENTER);
	image(mapimg,0,0);

	var cx=mercX(clon);
	var cy=mercY(clat);

	for(var i=0;i<earthquakes.length;i++){
		var data=earthquakes[i].split(/,/);

		var lat=data[1];
		var lon=data[2];
		var mag=data[4];

		var x=mercX(lon)-cx;
		var y=mercY(lat)-cy;

		mag=pow(mag,10);
		mag=sqrt(mag);

		var magmax=sqrt(pow(10,10));

		var d=map(mag,0,magmax,0,180);
		stroke(255,0,255);
		fill(255,0,255,200);
		temp=new Circle();
		temp.x=x;
		temp.y=y;
		temp.d=d;
		temp.draw();
		circles[i]=temp;
		console.log(circles[i].x,circles[i].y);

	}


}

function draw(){
	rectMode(CENTER);
	imageMode(CENTER);
	image(mapimg,1024/2,512/2);

	// for(var i=0;i<circles.length;i++){
		a = a + 0.02;
  		s = cos(a) * 2;
		translate(circles[1].x,circles[1].y);
		ellipse(circles[1].x,circles[1].x,circles[1].d,circles[1].d);
		console.log(circles[1].x,circles[1].y);
  		scale(s);
  		fill(255,0,255,200);
  		circles[0].draw1();
	// }

}

