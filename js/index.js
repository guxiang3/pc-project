$(function(){
	var str = '';
	for (var i = 11; i <= 70; i++) {
		str += '<div class="waterfall-item">'
			+	'<h2>瀑布流</h2>'
			+	'<img src="images/' + i + '.jpg">'
			+	'<p>这是瀑布流，好厉害的效果啊！！！</p>'
			+'</div>';
	}
	$('.waterfall').html(str);
});
$(window).load(function(){
	var waterfall = {
		init: function(){
			this.waterItem = $('.waterfall-item');
			this.itemWidth = this.waterItem.first().outerWidth();
			this.calRow();
		},
		//计算列数
		calRow: function () {
			var width = $('.waterfall').width();
			this.rows = Math.floor(width / this.itemWidth);
			//console.log(this.rows);
			this.space = (width - this.rows * this.itemWidth) / (this.rows + 1);
			this.verticalSpace = 15;
			this.firstLine();
		},
		//计算第一排每个元素的top值和left值
		firstLine: function(){
			this.position = [];
			//计算每一列元素的位置
			for(var i=0;i<this.rows;i++){
				var pos = {
					left: i*(this.itemWidth +this.space) + this.space,
					top: this.verticalSpace*2 + this.waterItem.eq(i).outerHeight()
				}
				this.position.push(pos);
				//改变第一排图片的位置
				this.waterItem.eq(i).animate({
					left: pos.left,
					top: this.verticalSpace
				},1000);
			}
			this.itemPos();
			console.log(this.position);
		},
		//计算后面每一排元素的位置
		itemPos: function(){
			for(var j=this.rows;j<this.waterItem.length;j++){
				var index = this.getMinTop();
				this.waterItem.eq(j).animate({
					top: this.position[index].top,
					left:this.position[index].left
				},1000);
				//重新给自己下面的图片设置top值，自己的top + 自己的高度 + 间隙
				this.position[index].top += this.waterItem.eq(j).outerHeight()+15;
			}
		},
		//获取top最小的下标
		getMinTop: function(){
			var min = this.position[0].top;
			var index = 0;
			//比那里position,找到top最小的
			for(var i=0;i<this.position.length;i++){
				if (this.position[i].top < min) {
					min = this.position[i].top;
					index = i;
				}
			}

			return index;
		}
	};
	waterfall.init();
	//当浏览器窗口发生改变时
	// $(window).resize(function(){
	// 	//重新计算列数及每一个元素的位置
	// 	waterItem.calRow();
	// });
	$(window).resize(function(){
		//重新计算列数及每一个元素的位置
		waterfall.calRow();
	});
});