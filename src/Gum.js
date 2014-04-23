var Gum = cc.Sprite.extend({
	ctor: function(){
		this._super();
		this.initWithFile(s_Gum);
		this.randomPosition();
		this.x = this.getPosition().x;
		this.y = this.getPosition().y;

		this.dir = Gum.DIR.Still;
		this.schedule(
			function(){this.autoMove();},1
			);
		this.setAnchorPoint(0.5,0);
		this.scheduleUpdate();
	},

	randomPosition: function(){
		var newX = (Math.random()*650)+300;
		this.setPosition(cc.p( newX, ground_floor1));
	},

	remove: function(){
		this.removeFromParent( true );
	},

	closeTo: function( obj ){
		var myPos = this.getPosition();
		var oPos = obj.getPosition();
		return ((Math.abs(myPos.x - oPos.x))<=70 && Math.abs(myPos.y - oPos.y)<=10);
	},

	checkBorderLeft: function(){
		var myPos = this.getPosition();
		return (myPos.x >= borderLeft) || (this.dir>=0);
	},

	checkBorderRight: function(){
		var myPos = this.getPosition();
		return (myPos.x <= borderRight) || (this.dir<=0); 
	},

	updatePosition: function(){
		this.setPosition(cc.p(this.x, this.y));
	},

	autoMove: function(){
		this.dir = Math.floor((Math.random()*3)-1);
	},

	update: function( dt ){
		if(this.checkBorderLeft() && this.checkBorderRight())
		{
			this.x += Gum.Vx*this.dir;
		}
		
		this.updatePosition();
	}
});

Gum.Vx = 3;
Gum.DIR ={
	Left: -1,
	Right: 1,
	Still: 0
};