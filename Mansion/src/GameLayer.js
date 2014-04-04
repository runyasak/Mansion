var GameLayer = cc.LayerColor.extend({
    init: function() {
        this.background = new Background();
        this.background.setPosition( new cc.Point( 750, 300 ) );

        this.kyoda = new Kyoda(750,161);
        this.kyoda.scheduleUpdate();

        this.setKeyboardEnabled(true);
        this.addChild( this.background );
        this.addChild( this.kyoda );
                
        return true;
    },

    onKeyDown: function(e){

        switch( e ) 
        {
            case cc.KEY.left:
                this.kyoda.setDirection( Kyoda.DIR.LEFT );
                break;
            case cc.KEY.right:
                this.kyoda.setDirection( Kyoda.DIR.RIGHT );
                break;
        }
    },

    onKeyUp: function(){
        this.kyoda.setDirection( Kyoda.DIR.STILL );
    }
});


var StartScene = cc.Scene.extend({
    onEnter: function() {
        this._super();
        var layer = new GameLayer();
        layer.init();
        this.addChild( layer );
    }
});

