var ScoreLayer = cc.LayerColor.extend({
    ctor: function() {
    	console.log('asdfasdf');
    	this._super();
    	this.setPosition(0,0);
    	this.score = 0;
    	this.scoreLabel = cc.LabelTTF.create( this.score, 'Arial', 40 );
        this.scoreLabel.setPosition( new cc.Point( 620, 550 ) );
        this.addChild(this.scoreLabel);

        return true;
    },
    removeLabel: function(){
    	this.removeChild(this.scoreLabel);
    },
    gameOver: function(){
        this.addChild(new GameOver(),140);
    },
    gameOverScoreLabel: function(){
    	this.scoreLabel_2 = cc.LabelTTF.create( this.score, 'Segoe Script', 60 );
        this.scoreLabel_2.setPosition( new cc.Point( 630, 120 ) );
        this.addChild(this.scoreLabel_2,150);
    },
    addScore: function(nowScore){
        this.score = nowScore; 	
        console.log(this.score);
        this.scoreLabel.setString(this.score);
    }
});