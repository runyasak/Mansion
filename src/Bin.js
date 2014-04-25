var Bin = cc.Sprite.extend({
	ctor: function(){
		this._super();
		this.binSprite = s_Bin;

		this.sprite1 = s_Bin;
		this.sprite2 = s_Bin2;

		this.initWithFile(this.binSprite);

		this.x = this.getPosition().x;
		this.y = this.getPosition().y;

		this.setAnchorPoint(0.5,0);
		this.scheduleUpdate();
		this.summon();
	},
	summon: function(){
		this.setPosition(cc.p( 450, ground_floor1-6));
	},
	changeSprite: function(){
		if(!Kyoda.isHide)
		{
			this.initWithFile(this.sprite1);
			this.setAnchorPoint(0.5,0);
		}
		if(Kyoda.isHide)
		{
			this.initWithFile(this.sprite2);
			this.setAnchorPoint(0.5,0);	
		}
	},

	closeTo: function(obj){
		var myPos = this.getPosition();
		var oPos = obj.getPosition();
		return ((Math.abs(myPos.x - oPos.x))<=40 && Math.abs(myPos.y - oPos.y)<=20);
	},
});