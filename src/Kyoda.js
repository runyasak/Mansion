var Kyoda = cc.Sprite.extend({

	ctor: function(x, y){
		this._super();
		this.initWithFile('images/kyoda.png');

		this.x = x;
		this.y = y;
		this.direction = Kyoda.DIR.STILL;
		this.updatePosition();

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

	update: function( dt ){
		if( this.isLeft )
		{
			this.x -= Kyoda.MOVE_STEP;
		}
		if( this.isRight )
		{
			this.x += Kyoda.MOVE_STEP;
		}
		this.updatePosition();
	}

	// moveLeft: function(){
	// 	var pos = this.getPosition();
	// 	this.setPosition( pos.x-7, pos.y ); 
	// 	this.direction = Kyoda.DIR.LEFT;
	// },

	// moveRight: function(){
	// 	var pos = this.getPosition();
	// 	this.setPosition( pos.x+7, pos.y ); 
	// 	this.direction = Kyoda.DIR.RIGHT;
	// }
});


Kyoda.MOVE_STEP = 5;
Kyoda.DIR = {
	LEFT: -1,
	RIGHT: 1,
	STILL: 0
};