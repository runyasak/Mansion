var Kyoda = cc.Sprite.extend({

	ctor: function(x, y){
		this._super();
		this.initWithFile('images/kyoda.png');

		this.x = x;
		this.y = y;
		this.direction = Kyoda.DIR.STILL;
		this.updatePosition();
		
	},

	updatePosition: function(){
		this.setPosition(cc.p(this.x, this.y));
	},

	setDirection: function( dir ){
		this.direction = dir;
	},

	update: function( dt ){
		switch( this.direction ){
			case Kyoda.DIR.LEFT:
				this.x -= Kyoda.MOVE_STEP;
				break;
			case Kyoda.DIR.RIGHT:
				this.x += Kyoda.MOVE_STEP;
				break;
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