var Kyoda = cc.Sprite.extend({

	ctor: function(x, y){
		this._super();
		this.initWithFile('images/kyoda.png');

		this.x = x;
		this.y = y;
		this.direction = Kyoda.DIR.STILL;
		this.updatePosition();

		this.checkBorderLeft();
		this.checkBorderRight();

		this.isLeft = false;
		this.isRight = false;
		
	},

	updatePosition: function(){
		this.setPosition(cc.p(this.x, this.y));
	},

	setDirection: function( isMove, dir ){
		if(dir == Kyoda.DIR.LEFT)
		{
			this.isLeft = isMove;
		}
		if(dir == Kyoda.DIR.RIGHT)
		{
			this.isRight = isMove;
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

	update: function( dt ){
		if( this.isLeft && this.checkBorderLeft())
		{
			this.x -= Kyoda.MOVE_STEP;
		}
		if( this.isRight && this.checkBorderRight())
		{
			this.x += Kyoda.MOVE_STEP;	
		}


		this.updatePosition();
	}
});


Kyoda.MOVE_STEP = 5;
Kyoda.DIR = {
	LEFT: -1,
	RIGHT: 1,
	STILL: 0
};