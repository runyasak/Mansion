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
        this.no_gum = 0;
        this.no_monster = 0;

        this.gumArr = [];
        this.zombieArr = [];
        this.ghostArr = [];


        this.bin = new Bin();
        this.setKeyboardEnabled(true);
        this.addChild( this.background );
        this.addChild( this.floor1 );
        this.addChild( this.bin );
        this.addChild( this.kyoda ,100);
        this.scoreBoard();
        this.scheduleUpdate();
        this.addGhosts();
        //this.unitSchedule();
    
        return true;
    },

    unitSchedule: function(){
        //summon gum
        this.schedule(
            function() {
                if(this.no_gum < GameLayer.MAX.Gum){
                    this.addGums();
                }
            }, 3 );
        //summon monster
        this.schedule(
            function() {
                var choice = Math.floor(Math.random()*2);
                if(this.no_monster < GameLayer.MAX.Monster){
                    switch(choice){
                        case 0: this.addZombies(); break;
                        case 1: this.addGhosts(); break;
                    }
                }
            }, 15 );
    },

    addZombies: function(){
        var newZombie = new Zombie();
        this.addChild(newZombie);
        this.zombieArr.push(newZombie);
        this.no_monster++;
    },
    addGhosts: function(){
        var newGhost = new Ghost();
        this.addChild(newGhost);
        this.ghostArr.push(newGhost);
    },

    addGums: function(){
        var noMonster = Math.floor(Math.random()*7+2);
        for(var i = 0; i < noMonster; i++){
            var newGum = new Gum();
            this.addChild(newGum);
            this.gumArr.push(newGum);
            this.no_gum++;
        }
    },

    scoreBoard: function(){
        this.scoreLabel = cc.LabelTTF.create( '0', 'Arial', 40 );
        this.scoreLabel.setPosition( new cc.Point( 620, 550 ) );
        this.addChild( this.scoreLabel );
    },

    addScore: function(){
        this.score += 10;
        this.scoreLabel.setString( this.score );
    },

    onKeyDown: function(e){
        if(!this.kyoda.isHide){    
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
                    this.kyoda.hide(this.bin);  
                        break;
            }
        }
    },

    onKeyUp: function(e){

        if(!this.kyoda.isHide){    
            switch(e){
                case cc.KEY.left:
                    this.kyoda.setDirection( false, Kyoda.DIR.LEFT );
                        break;
                case cc.KEY.right:
                    this.kyoda.setDirection( false, Kyoda.DIR.RIGHT );
                        break;
            }
        }
        if(this.kyoda.isHide){
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

    update: function(){
        if(!this.kyoda.isHide && !this.kyoda.isDie){
            this.gumArr.forEach( 
                function( b ) {
                    if(b.closeTo(this.kyoda)){
                        b.remove(); 
                        this.addScore();
                        this.no_gum--;
                    }}, this );

            this.zombieArr.forEach(
                function( b ) {
                    if(!this.kyoda.ishide && b.closeTo(this.kyoda)){
                        this.kyoda.remove();
                        this.no_monster--;
                    }}, this);
            this.ghostArr.forEach(
                function( b ) {
                    if(!this.kyoda.ishide && b.closeTo(this.kyoda)){
                        //this.kyoda.remove();
                    }}, this);
        }
        if(this.kyoda.isHide){
            this.ghostArr.forEach(
                function( b ) {
                    if(b.closeTo(this.bin)){
                        this.kyoda.hide(this.bin);
                        //this.kyoda.x = this.bin.x; 
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

GameLayer.MAX ={
    Gum: 20,
    Monster: 5
};