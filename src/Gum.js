var Gum = cc.Sprite.extend({
	ctor: function(){
		this._super();
		this.initWithFile(s_Gum);
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
	}
	
});