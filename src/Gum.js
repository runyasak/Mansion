var Gum = cc.Sprite.extend({
	ctor: function(){
		this._super();
		this.initWithFile(s_Gum);
		this.randomPosition();
		this.x = this.getPosition().x;
		this.y = this.getPosition().y;

		this.isRight = false;
		this.isLeft = true;
		
		this.time = 1;
		this.timeTrack();
	},

	randomPosition: function(){
		var newX = (Math.random()*650)+300;
		this.setPosition(cc.p( newX, ground_floor1));
	},

	remove: function(gameLayer){
		gameLayer.removeChild(this);
	},

	closeTo: function( obj ){
		var myPos = this.getPosition();
		var oPos = obj.getPosition();
		return ((Math.abs(myPos.x - oPos.x))<=70 && Math.abs(myPos.y - oPos.y)<=10);
	},
	updatePosition: function(){
		this.setPosition(cc.p(this.x, this.y));
	},

	timeTrack: function(){
		this.schedule( 
			function() { this.time++} ,1
			);
	},


	autoMove: function(){
		if(this.time % 2 == 0)
		{
			if(this.time % 4 == 0)
			{
				this.isRight = false;
				this.isLeft = true;
			}
			else
			{
				this.isLeft = false;
				this.isRight = true;
			}
		}
	},

	update: function( dt ){
		if(this.isRight)
		{
			this.x += 5;
		}
		if(this.isLeft)
		{
			this.x -= 5;
		}

		this.autoMove();
		this.updatePosition();

	}
});