var GameLayer = cc.LayerColor.extend({
    init: function() {
        this.background = new Background();
        this.background.setPosition( new cc.Point( 750, 300 ) );

        this.floor1 = new Floor_1();
        this.floor1.setAnchorPoint(0.5,0);
        this.floor1.setPosition( new cc.Point(650,140));

        this.kyoda = new Kyoda(750,ground_floor1);
        this.kyoda.setAnchorPoint(0.5,0);

        this.score = 0;
        this.nowScore =0;
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

        this.addDoor();
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
            }, 1 );
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
        this.no_monster++;
    },

    addGums: function(){
        var noMonster = Math.floor(Math.random()*7+2);
        for(var i = 0; i < noMonster; i++){
            var newGum = new Gum();
            this.addChild(newGum);
            newGum.runAction(cc.FadeIn.create(0.3));
            this.gumArr.push(newGum);
            this.no_gum++;
        }
    },

    addDoor: function(){
        var door = new Door();
        this.addChild(door);
    },

    scoreBoard: function(){
        this.scoreLabel = cc.LabelTTF.create( '0', 'Arial', 40 );
        this.scoreLabel.setPosition( new cc.Point( 620, 550 ) );
        this.addChild( this.scoreLabel );
    },

    addScore: function(){
        this.score += 10;
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
                case cc.KEY.down:
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
                case cc.KEY.down: 
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
        if(this.nowScore<this.score){
            this.nowScore++;
            this.scoreLabel.setString( this.nowScore );
        }
        if(!this.kyoda.isHide && !this.kyoda.isDie){
            this.gumArr.forEach( 
                function( b ) {
                    if(b.closeTo(this.kyoda)){
                        console.log('hit');
                        b.remove(); 
                        this.addScore();
                        this.no_gum--;
                    }}, this );
        }
        if(!this.kyoda.isImmortal){
            this.zombieArr.forEach(
                function( b ) {
                    if(!this.kyoda.isHide && b.closeTo(this.kyoda)){
                        this.kyoda.die();
                    }}, this);
            this.ghostArr.forEach(
                function( b ) {
                    if(!this.kyoda.isHide && b.closeTo(this.kyoda)){
                        this.kyoda.die();
                    }}, this);
        }
        if(this.kyoda.isHide){
            this.ghostArr.forEach(
                function( b ) {
                    if(b.closeTo(this.bin)){
                        this.kyoda.activateImmortal();
                        this.kyoda.hide(this.bin);
                        this.kyoda.jump();
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