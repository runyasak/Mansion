var GameOver = cc.Sprite.extend({
	ctor: function(){
		this._super();
        this.setPosition( new cc.Point( 650, 300 ) );
		this.initWithFile(s_GameOver);
		this.setScale(1.2);
		this.setOpacity(0);
		this.runAction(cc.FadeTo.create(3,150));
	}
});