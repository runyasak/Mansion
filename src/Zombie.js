var Zombie = cc.Sprite.extend({
	ctor: function(){
		this._super();
		this.initWithFile(s_Zombie);
	},
	randomPosition: function(){
		var newX = (Math.random()*650)+300;
		this.setPosition(cc.p( newX, ground_floor1));
	}
});