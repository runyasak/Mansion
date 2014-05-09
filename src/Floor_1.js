var Floor_1 = cc.Sprite.extend({
	ctor: function(x, y){
		this._super();
		this.initWithFile(s_Floor1);
		this.setAnchorPoint(0.5,0);
        this.setPosition( new cc.Point(x, y));
	},

});