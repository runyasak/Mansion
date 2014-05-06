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

        this.score = 0;

        this.gumArr = [];
        this.zombieArr = [];

        this.scheduleUpdate();

        this.scoreLabel = cc.LabelTTF.create( '0', 'Arial', 40 );
        this.scoreLabel.setPosition( new cc.Point( 620, 550 ) );
        
        this.schedule(
            function() { this.addGums(); }, 3
        );
        this.schedule(
            function() { this.addZombies(); }, 15
        );
        this.bin = new Bin();
        this.setKeyboardEnabled(true);
        this.addChild( this.background );
        this.addChild( this.floor1 );
        this.addChild( this.bin );
        this.addChild( this.kyoda );
        this.addChild( this.scoreLabel );
        
        return true;
    },

    addZombies: function(){
        var newZombie = new Zombie();
        this.addChild(newZombie);
        this.zombieArr.push(newZombie);
    },

    addGums: function(){
        var noMonster = Math.floor(Math.random()*7+2);
        for(var i = 0; i < noMonster; i++){
            var newGum = new Gum();
            this.addChild(newGum);
            this.gumArr.push(newGum);
        }
    },

    onKeyDown: function(e){
        if(!Kyoda.isHide){    
            switch(e){
                case cc.KEY.left:
                    this.kyoda.setDirection( true, Kyoda.DIR.LEFT );
                        break;
                case cc.KEY.right:
                    this.kyoda.setDirection( true, Kyoda.DIR.RIGHT );
                        break;
                case cc.KEY.up:
                    this.kyoda.jump();
                        break;
                case cc.KEY.space:
                    this.kyoda.hide(this.bin);
                       break;    
            }
        }else{
            switch(e){
                case cc.KEY.left: 
                    this.bin.setDirection( true, Bin.DIR.LEFT );  
                        break;
                case cc.KEY.right: 
                    this.bin.setDirection( true, Bin.DIR.RIGHT ); 
                        break;
                case cc.KEY.space: 
                    this.bin.isLeft = false; 
                    this.bin.isRight = false; 
                    this.kyoda.x = this.bin.x; 
                    this.kyoda.hide(); 
                    this.bin.changeSprite(); 
                        break;
            }
        }
    },

    onKeyUp: function(e){

        if(!Kyoda.isHide){    
            switch(e){
                case cc.KEY.left:
                    this.kyoda.setDirection( false, Kyoda.DIR.LEFT );
                        break;
                case cc.KEY.right:
                    this.kyoda.setDirection( false, Kyoda.DIR.RIGHT );
                        break;
            }
        }
        if(Kyoda.isHide){
            switch(e){
                case cc.KEY.left:
                    this.bin.setDirection( false, Bin.DIR.LEFT );
                        break;
                case cc.KEY.right:
                    this.bin.setDirection( false, Bin.DIR.RIGHT );
                        break;
            }
        }
        this.kyoda.setDirection( false, Kyoda.DIR.STILL );
    },

    addScore: function(){
        this.score += 10;
        this.scoreLabel.setString( this.score );
    },

    update: function(){
        if(!Kyoda.isHide && !this.kyoda.isDie){
            this.gumArr.forEach( 
                function( b ) {
                    if(b.closeTo(this.kyoda)){
                        b.remove(); 
                        this.addScore();
                    }}, this );

            this.zombieArr.forEach(
                function( b ) {
                    if(b.closeTo(this.kyoda)){
                        this.kyoda.remove();
                    }}, this);
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