var SubBackground = cc.Sprite.extend({
	ctor: function(x, y){
		this._super();
        this.setPosition( new cc.Point(x, y) );
		this.initWithFile(s_SubBackground);
	}
});