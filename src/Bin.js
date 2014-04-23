var Bin = cc.Sprite.extend({
	ctor: function(){
		this._super();
		this.initWithFile(s_Bin);
		this.randomPosition();

		this.x = this.getPosition().x;
		this.y = this.getPosition().y;

		this.setAnchorPoint(0.5,0);
		this.scheduleUpdate();
	},
	randomPosition: function(){
		var newX = (Math.random()*650)+300;
		this.setPosition(cc.p( newX, ground_floor1-6));
	},

	closeTo: function(obj){
		var myPos = this.getPosition();
		var oPos = obj.getPosition();
		return ((Math.abs(myPos.x - oPos.x))<=20 && Math.abs(myPos.y - oPos.y)<=20);
	},
});