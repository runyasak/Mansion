var Background = cc.Sprite.extend({
	ctor: function(){
		this._super();
        this.setPosition( new cc.Point( 750, 300 ) );
		this.initWithFile(s_Background);
	}
});