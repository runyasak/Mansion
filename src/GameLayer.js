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
        if( e == cc.KEY.left)
        {
            this.kyoda.setDirection( true, Kyoda.DIR.LEFT );
        }
        if( e == cc.KEY.right)
        {
            this.kyoda.setDirection( true, Kyoda.DIR.RIGHT );
        }
    },

    onKeyUp: function(e){
        if( e == cc.KEY.left)
        {
            this.kyoda.setDirection( false, Kyoda.DIR.LEFT );
        }
        if( e == cc.KEY.right)
        {
            this.kyoda.setDirection( false, Kyoda.DIR.RIGHT );
        }

        this.kyoda.setDirection( false, Kyoda.DIR.STILL );
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

