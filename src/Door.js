var Door = cc.Sprite.extend({
	ctor: function(){
		this._super();
		this.initWithFile(s_Door);
		this.randomPosition();
		this.x = this.getPosition().x;
		this.y = this.getPosition().y;

		this.setScale(2);
		this.setAnchorPoint(0.5,0);
		this.scheduleUpdate();
	},

	randomPosition: function(){
		var newX = (Math.random()*650)+300;
		this.setPosition(cc.p( newX, 140+(GameLayer.Level-1)*200));
	},

	closeTo: function( obj ){
		var myPos = this.getPosition();
		var oPos = obj.getPosition();
		return ((Math.abs(myPos.x - oPos.x))<=70 && Math.abs(myPos.y - oPos.y)<=10);
	},

	updatePosition: function(){
		this.setPosition(cc.p(this.x, this.y));
	},

	update: function( dt ){
		this.updatePosition();
	}
});
