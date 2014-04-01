var GameLayer = cc.LayerColor.extend({
    init: function() {
        this.background = new Background();
        this.background.setPosition( new cc.Point( 750, 300 ) );

        this.kyoda = new Kyoda();
        this.kyoda.setPosition( new cc.Point( 750, 161 ) );

        this.setKeyboardEnabled(true);
        this.addChild( this.background );
        this.addChild( this.kyoda );
                
        return true;
    },
    onKeyDown: function(e){
        console.log(e);
        if( e == cc.KEY.left){
            this.kyoda.moveLeft();
        }
        else if ( e == cc.KEY.right){
            this.kyoda.moveRight();
        }

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

