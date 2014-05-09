var GameLayer = cc.LayerColor.extend({
    init: function() {
        this.level = 1;
        this.startGame();
        this.setKeyboardEnabled(true);
        this.scheduleUpdate();

        this.hasDoor = false;
        return true;
    },

    startGame: function(){
        this.background = new Background();
        this.kyoda = new Kyoda(Kyoda.Floor.X,Kyoda.Floor.Y);
        this.bin = new Bin();

        this.addChild( this.background ,-100);
        this.addChild( this.kyoda ,100);
        this.addFloor();
        this.addChild( this.bin );
        this.scoreBoard();
        this.unitSchedule();
    },

    levelUp: function(){
        if(this.score >= GameLayer.Score && !this.hasDoor){
            this.addDoor();
            this.hasDoor = true;
            this.level++;
            this.addFloor();
        }
    },

    addFloor: function(){
        var x = GameLayer.Floor.X;
        var y = GameLayer.Floor.Y+(this.level-1)*200;
        this.floor1 = new Floor_1(x, y);
        this.addChild(this.floor1, -90);
    },


    unitSchedule: function(){
        this.gumArr = [];
        this.zombieArr = [];
        this.ghostArr = [];
        this.doorArr = [];

        //number of gum & monster
        this.no_gum = 0;
        this.no_monster = 0;

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
        var door = new Door;
        door.runAction(cc.FadeIn.create(0.3));
        this.addChild(door, -80);
        this.doorArr.push(door);
    },

    scoreBoard: function(){
        this.score = 0;
        this.nowScore = 0;

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
                case cc.KEY.space:
                    this.kyoda.goUp(this.doorArr);
                        break;    
            }
        } else{
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

       this.levelUp();
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
GameLayer.NextFloor = 180;
GameLayer.Score = 500;
GameLayer.Floor ={
    X: 650,
    Y: 140,
    NextFloor: 200
};