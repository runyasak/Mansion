var Gum = cc.Sprite.extend({
	ctor: function(){
		this._super();
		this.initWithFile('images/gum.png');
	},

	randomPosition: function(){
		var newX = (Math.random()*650)+300;
		this.setPosition(cc.p( newX, 140));
	},

	closeTo: function( obj ){
		var myPos = this.getPosition();
		var oPos = obj.getPosition();
		return (Math.abs(myPos.x - oPos.x))<=70
	}
	
});