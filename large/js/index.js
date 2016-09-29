$(function(){
	var magnify = {
		init: function(){
			this.smallWrapper = $('.small-wrapper');
			this.largeWrapper = $('.large-wrapper');
			this.filter = this.smallWrapper.find('.filter');
			this.largeImg = this.largeWrapper.find('img');

			//记录鼠标相对于small-wrapper的位置(滤镜的中心位置)
			this.posX = 0;
			this.posY = 0;

			//记录small-wrapper相对于文档的距离
			this.offset = this.smallWrapper.offset();
			//console.log(this.offset);

			this.mouseenter();
			this.mousemove();
		},
		//鼠标移入移出小盒子
		mouseenter: function(){
			var that = this;
			this.smallWrapper.hover(function(e){
				that.getPos(e);
				that.filter.css({
					left: that.posX - 75,
					top: that.posY - 75
				});
				that.filter.show();
				that.largeWrapper.show();
			},function(){
				that.filter.hide();
				that.largeWrapper.hide();
			});
		},
		mousemove: function(){
			var that  = this;
			this.smallWrapper.mousemove(function(e){
				that.getPos(e);
				that.filter.css({
					left: that.posX - 75,
					top: that.posY - 75
				});
				that.largeImg.css({
					left: -(that.posX - 75) * 2,
					top: -(that.posY - 75) * 2
				});
			});
		},
		//改变this.posX和this.posY
		getPos: function(e){
			var x = e.pageX - this.offset.left;
			var y = e.pageY - this.offset.top;
			this.posX = (x < 75 ) ? 75 : (x > 225 ? 225 : x);
			this.posY = (y < 75 ) ? 75 : (y > 225 ? 225 : y);
		}
	};
	magnify.init();
});