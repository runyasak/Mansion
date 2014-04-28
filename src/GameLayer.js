var GameLayer = cc.LayerColor.extend({
    init: function() {
        this.background = new Background();
        this.background.setPosition( new cc.Point( 750, 300 ) );

        this.floor1 = new Floor_1();
        this.floor1.setAnchorPoint(0.5,0);
        this.floor1.setPosition( new cc.Point(650,140));

        this.kyoda = new Kyoda(750,ground_floor1);
        this.kyoda.setAnchorPoint(0.5,0);
        this.kyoda.scheduleUpdate();

        this.zombie = new Zombie();

        this.scheduleUpdate();
       
        this.bin = new Bin();
        this.setKeyboardEnabled(true);
        this.addChild( this.background );
        this.addChild( this.floor1 );
        this.addChild( this.bin );
        this.addChild( this.zombie );
        this.addChild( this.kyoda );
        this.addMonsters();
        
        return true;
    },

    onKeyDown: function(e){
        if(!Kyoda.isHide)
        {    
            if( e == cc.KEY.left )
            {
                this.kyoda.setDirection( true, Kyoda.DIR.LEFT );
            }
            else if( e == cc.KEY.right )
            {
                this.kyoda.setDirection( true, Kyoda.DIR.RIGHT );
            }
 
            if( e == cc.KEY.up )
            {  
                this.kyoda.jump();
            }
            if( e == cc.KEY.space && this.bin.closeTo(this.kyoda) )
            {
                this.kyoda.hide();
                this.bin.changeSprite();
            }
        }else{
            switch(e){
                case cc.KEY.left: this.bin.setDirection( true, Bin.DIR.LEFT );  break;
                case cc.KEY.right: this.bin.setDirection( true, Bin.DIR.RIGHT ); break;
                case cc.KEY.space: this.bin.isLeft = false; this.bin.isRight = false; this.kyoda.x = this.bin.x; this.kyoda.hide(); this.bin.changeSprite(); break;
            }
        }
    },

    addMonsters: function(e){
        this.gumArr = [];
        for(var i = 0; i < 6; i++){
            this.gumArr.push(new Gum());
        }
        this.gumArr.forEach( function( b ) {this.addChild( b );}, this );
    },

    onKeyUp: function(e){

        if(!Kyoda.isHide)
        {
            if( e == cc.KEY.left)
            {
                this.kyoda.setDirection( false, Kyoda.DIR.LEFT );
            }
            if( e == cc.KEY.right)
            {
                this.kyoda.setDirection( false, Kyoda.DIR.RIGHT );
            }
            if( e == cc.KEY.up )
            {   
                this.kyoda.jump();
            }
        }
        if(Kyoda.isHide)
        {
            if( e == cc.KEY.left)
            {
                this.bin.setDirection( false, Bin.DIR.LEFT );
            }
            if( e == cc.KEY.right)
            {
                this.bin.setDirection( false, Bin.DIR.RIGHT );
            }
        }
        this.kyoda.setDirection( false, Kyoda.DIR.STILL );
    },

    update: function(){
        if(!Kyoda.isHide)
        {
            this.gumArr.forEach( 
                function( b ) {
            if(b.closeTo(this.kyoda)){
                 b.remove();
             }}, 
                this );

            if(this.zombie.closeTo(this.kyoda)){
                 this.kyoda.remove(this);
             }
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

