var Gum = cc.Sprite.extend({
	ctor: function(){
		this._super();
		this.initWithFile(s_Gum);
		this.randomPosition();
		this.x = this.getPosition().x;
		this.y = this.getPosition().y;

		this.dir = 1;
		this.schedule(
			function(){this.autoMove();},1
			);
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

	timeTrack: function(){
		this.schedule(
			function() { this.time++} ,1);
	},


	autoMove: function(){
		this.dir = Math.floor((Math.random()*3)-1);
	},

	update: function( dt ){
		if(this.checkBorderLeft() && this.checkBorderRight())
		{
			this.x += 3*this.dir;
		}
		
		this.updatePosition();
	}
});