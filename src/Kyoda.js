var Kyoda = cc.Sprite.extend({

	ctor: function(x, y){
		this._super();
		this.initWithFile(s_Kyoda);

		this.x = x;
		this.y = y;
		this.direction = Kyoda.DIR.LEFT;
		this.updatePosition();

		this.isLeft = false;
		this.isRight = false;
		this.isJump = false;
		
		this.isHide = false;
		this.isDie = false;

		this.isFadeOut = false;
		this.rotationStack = 10;

		this.isImmortal = false;
		this.immortalTime = 2;

		this.scheduleUpdate();
	},

	activateImmortal: function() {
		this.immortalTime = 2;
		this.isImmortal = true;
        this.schedule(this.immortalTimer,1);
	},


	immortalTimer: function(){
		if(this.isImmortal && this.immortalTime > 0 ) {
            this.immortalTime--;
        }
        else {
            this.isImmortal = false;
            //this.stopAction(this.immortalAction);
            this.unschedule(this.immortalTimer);
            this.setOpacity(255);
        }
	},

	checkGround: function(){
		return this.y <= ground_floor1;
	},

	updatePosition: function(){
		this.setPosition(cc.p(this.x, this.y));
	},

	flipCharacter: function(dir){
		if(this.isRight){	
			this.setFlippedX(true);
		}
		if(this.isLeft){
			this.setFlippedX(false);
		}
	},


	jump: function(){
		if(this.checkGround()){
			Kyoda.Vy = Kyoda.accelJump;
			this.isJump = true;
		}

	},

	setDirection: function( isMove, dir ){
		if(dir == Kyoda.DIR.LEFT){
			this.isLeft = isMove;			
			this.direction = dir;
		}
		if(dir == Kyoda.DIR.RIGHT){
			this.isRight = isMove;
			this.direction = dir;
		}
	},

	checkBorderLeft: function(){
		var myPos = this.getPosition();
		return myPos.x >= borderLeft;
	},

	checkBorderRight: function(){
		var myPos = this.getPosition();
		return myPos.x <= borderRight;
	},

	checkJumpTop: function(){
		return (this.y >= Kyoda.Max_Vy + ground_floor1);
	},

	hide: function(bin){
		if(!this.isJump){
			if(!this.isHide && bin.closeTo(this)){
				this.setVisible(false);
				this.isHide = true;
				this.isLeft = false;
				this.isRight = false;
				bin.changeSprite();
			}else if(this.isHide){
				this.setVisible(true);
				this.isHide = false;
				this.setPosition(cc.p(bin.x,ground_floor1));
				this.x = bin.x;
				bin.changeSprite();
			}
		}
	},

	die: function() {
		this.isDie = true;
	},

	update: function( dt ){

		if(this.isImmortal) {
			if(!this.immortalAction || this.immortalAction.isDone()){
				var fadeOut = cc.FadeOut.create(0.1);
            	var fadeIn = cc.FadeIn.create(0.1);
            	var delay = cc.DelayTime(0.1);
            	this.immortalAction = cc.Sequence.create(fadeOut,delay,fadeIn);
            	this.runAction(this.immortalAction);
            }
		}

		if(this.isDie){
			this.setAnchorPoint(0.5, 0.5);
			if(this.rotationStack <= 180) {
				this.setRotation(this.getRotation()+10);
				this.rotationStack+= 10;
			} else{
				this.y++;
				var fadeOut = cc.FadeOut.create(5); 
				if(!this.isFadeOut){
					this.isFadeOut = true;
					this.runAction(fadeOut);
				}
			}
		}

		if(!this.isHide){
			if( this.isLeft && this.checkBorderLeft()){
				this.x -= Kyoda.Vx;
			}
			if( this.isRight && this.checkBorderRight()){
				this.x += Kyoda.Vx;	
			}
			if( this.isJump ){
				Kyoda.Vy -= Kyoda.g;
			}

			if( Kyoda.Vy<= 0 && this.checkGround()){
				this.isJump = false;
				Kyoda.Vy = 0;
			}

			this.y += Kyoda.Vy;
		}
		this.flipCharacter();
		this.updatePosition();


	}
});



Kyoda.accelJump = 11;
Kyoda.Vx = 6;
Kyoda.Vy = 0;
Kyoda.g = 0.5;
Kyoda.DIR = {
	LEFT: -1,
	RIGHT: 1
};