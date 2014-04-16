var Zombie = cc.Sprite.extend({
	ctor: function(){
		this._super();
		this.initWithFile(s_Zombie);
	},
	randomPosition: function(){
		var newX = (Math.random()*650)+300;
		this.setPosition(cc.p( newX, ground_floor1));
	},
	closeTo: function( obj ){
		var myPos = this.getPosition();
		var oPos = obj.getPosition();
		return ((Math.abs(myPos.x - oPos.x))<=89 && Math.abs(myPos.y - oPos.y)<=120);
	}
});