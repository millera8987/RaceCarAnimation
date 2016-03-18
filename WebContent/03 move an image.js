
var game = new Phaser.Game(600, 480, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update });
//800,480
var MyObject = function ( x, y, dx, dy, width, height, who, who1){
	this.x = x;
	this.y = y;
	this.dx = dx;
	this.dy = dy;
	this.width = width;
	this.height = height;
	
	this.image = game.add.sprite(x, y, who);
	this.image.scale.setTo(width/this.image.width, height/this.image.height);
	
	this.image1 = game.add.sprite(x, y, who1);
	this.image1.scale.setTo(width/this.image1.width, height/this.image1.height);
	this.image1.x = -1000;

	carGroup.add(this.image);
	
	this.getImage = function(){
		return this.image;
	};
	this.getImage1 = function(){
		return this.image1;
	};
	this.getImageX = function(){
		return this.image.x;
	};
	this.move = function(lb,rb,tb,bb){
		//text.text = "" + this.dx + ", " + this.dy;
		this.x+=game.rnd.integerInRange(1, 4);
		this.y+=this.dy;
		
		if(this.dx != 0){
		if(this.dx > 0){
			this.image.x = this.x;
			this.image.y = this.y;
			this.image1.x = -1000;			
		}
		else{
			this.image1.x = this.x;
			this.image1.y = this.y;
			this.image.x = -1000;
		}
		}
		if ((this.dx < 0 && this.x + this.dx  < lb- this.width) || (this.dx > 0 && this.x + this.dx +this.width > rb + this.width)){
			this.dx = -this.dx;
			this.y += this.height;
			if ( (this.y + this.dy + this.height > bb)){
				this.x = 0;
				this.y = 0;
				this.dx = 5;
			}
		}
		
		
	};
	
	this.showWinner = function(){
		image.scale.setTo(300/image.width, 300/image.height);
		image.x = game.width / 4;
		image.y = game.height / 4;
	};
	
	this.isAtFinish = function(){
		return this.image.x + this.image.width >= game.width;			
	};
	this.toString = function(){
		return "" + this.image.x + ", " + this.image.y + "--" + this.dx + ", " + this.dy + " - " + this.image.width;
	};
	this.setY = function(anydy){
		this.y = anydy;
	};
	this.setX = function(anydx){
		this.x = anydx;
	};
};

var text;
var car = [];
var laneImage;
var checkerImage;
var lanes;
var count = 0;
var winner;
var style;

var laneGroup;
var carGroup;
function preload() {

    //  You can fill the preloader with as many assets as your game requires

    //  Here we are loading an image. The first parameter is the unique
    //  string by which we'll identify the image later in our code.

    //  The second parameter is the URL of the image (relative)
	game.load.image('car1', 'assets/pics/car1.png');
    for(var i=1;i<=7;i++){
    	game.load.image('car' + i, 'assets/pics/car' + i + '.png');
    }
    game.load.image('checkerboard', 'assets/pics/checkerboard.jpg');
    game.load.image('lane', 'assets/pics/lane.png');

    
   
   
}

function create() {

    //  This creates a simple sprite that is using our loaded image and
    //  displays it on-screen
    //  and assign it to a variable
   // var image = game.add.sprite(0, 0, 'einstein');
//	Enable p2 physics
	//game.physics.startSystem(Phaser.Physics.P2JS);
    //game.physics.enable(image, Phaser.Physics.ARCADE);

    //image.body.velocity.x=150;
	
	
	
	
	
	
	

	game.stage.backgroundColor = "#00ff00";
	
	
	

//	Enable the physics bodies on all the sprites and turn on the visual debugger
	
	
	
	
	
	 style = { font: "bold 75px Arial", fill: "#ffff00", boundsAlignH: "center", boundsAlignV: "middle" };

    //  The Text is positioned at 0, 100
	 laneGroup = game.add.group();
	 carGroup = game.add.group();
      reset();
}
function reset(){
	destroy();
	lanes = game.rnd.integerInRange(2, 7);
	for(var i=0;i<lanes;i++){
		
		laneImage = game.add.sprite(0,i * 20 , 'lane');
		//height originally 50
		laneImage.scale.setTo((7*game.width/8)/laneImage.width, (5*game.height/48)/laneImage.height);
		checkerImage = game.add.sprite(laneImage.width,i * 20 , 'checkerboard');
		
		checkerImage.scale.setTo((game.width/8)/checkerImage.width, laneImage.height/checkerImage.height);
		laneImage.y = i * (laneImage.height + 10);
		checkerImage.y = i * (laneImage.height + 10);
		//car = new MyObject( 0,0,5,0,game.height/5,game.height/5,'rightMower','leftMower');
		
		car[i] = (new MyObject( 0,i*(laneImage.height + 10),5,0,game.width/8,laneImage.height,'car'+(i+1),'car'+(i+1)));
		laneGroup.add(laneImage);
		laneGroup.add(checkerImage);
		
	}
	
	text = game.add.text(2*game.width/6, 35*game.height/48, "Ready", style);
	laneGroup.add(text);
}
function destroy(){
	//
	laneGroup.removeAll(true);
	carGroup.removeAll(true);
}
function update() {
	//text.text = "Ready"  + count;
	if(count >= 300 ){
		text.visible = false;
	}
	if(count >= 200 ){
		text.text = "Go..." ;
	}
	else if(count >= 100){
		text.text = "Set";
	}
	
    
	//mower.move(0,game.width,0,game.height);
	//bigWheel.move(0,game.width,0,game.height);
	if(count > 200){
		for(var i=0;i<lanes;i++){
			car[i].move(0,game.width,0,game.height);
			if(car[i].isAtFinish()){
				count = -150;
				winner = i;
			}
		}
	}
	if(count < 0){
		//car[winner].showWinner();
		var win = game.add.sprite(game.width/4,game.height/4 , 'car' + (winner+1));
		win.scale.setTo((game.width/2)/win.width, (game.height/2)/win.height);
		laneGroup.add(win);
		text.visible = true;
		text.text = "Winner";
	}
	count++;
	if(count==0){
		reset();
	}
	
	
}



