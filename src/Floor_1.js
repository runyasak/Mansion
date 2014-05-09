var Floor_1 = cc.Sprite.extend({
	ctor: function(){
		this._super();
		this.initWithFile(s_Floor1);
		this.setAnchorPoint(0.5,0);
        this.setPosition( new cc.Point(650,140));
	}
});