var StartLayer = cc.LayerColor.extend({
    ctor: function() {
    	this._super();
    	this.startPage = new StartPage();
    	this.addChild(this.startPage);
    }
});
var StartPage = cc.Sprite.extend({
	ctor: function(){
		this._super();
        this.setPosition( new cc.Point( 750, 300 ) );
		this.initWithFile(s_StartPage);
	}
});
var OpenScene = cc.Scene.extend({
    onEnter: function() {
        this._super();
        var layer = new StartLayer();
        layer.init();
        this.addChild( layer );
    }
});