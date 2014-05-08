var Bin = cc.Sprite.extend({
	ctor: function(){
		this._super();
		this.binSprite = s_Bin;

		this.sprite1 = s_Bin;
		this.sprite2 = s_Bin2;

		this.initWithFile(this.binSprite);


		this.summon();
		this.x = this.getPosition().x;
		this.y = this.getPosition().y;
		this.isLeft = false;
		this.isRight = false;
		this.isFull = false;

		this.direction = Bin.DIR.Still;

		this.setAnchorPoint(0.5,0);
		this.scheduleUpdate();
	},

	summon: function(){
		this.setPosition(cc.p( 450, ground_floor1-6));
	},

	setDirection: function( isMove, dir ){
		if(dir == Bin.DIR.LEFT){
			this.isLeft = isMove;			
			this.direction = dir;
		}
		if(dir == Bin.DIR.RIGHT){
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

	changeSprite: function(){
		if(!this.isFull){
			this.initWithFile(this.sprite2);
			this.setAnchorPoint(0.5,0);
			this.isFull = true;
		}else{
			this.initWithFile(this.sprite1);
			this.setAnchorPoint(0.5,0);	
			this.isLeft = false;
			this.isRight = false;
			this.isFull = false;
		}
	},
	updatePosition: function(){
		this.setPosition(cc.p(this.x, this.y));
	},

	closeTo: function(obj){
		var myPos = this.getPosition();
		var oPos = obj.getPosition();
		return ((Math.abs(myPos.x - oPos.x))<=40 && Math.abs(myPos.y - oPos.y)<=60);
	},

	update: function(dt){
		if( this.isLeft && this.checkBorderLeft()){
			this.x -= Bin.Vx;
		}
		if( this.isRight && this.checkBorderRight()){
			this.x += Bin.Vx;	
		}
		this.updatePosition();
	}
});

Bin.Vx = 5;
Bin.DIR = {
	LEFT: -1,
	RIGHT: 1,
	Still: 0
};