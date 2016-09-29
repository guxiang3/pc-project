$(function(){
	var str = '';
	for (var i = 17; i <= 70; i++) {
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
					top: this.verticalSpace,
				}
				this.position.push(pos);
				this.waterItem.eq(i).css({
					left: pos.left,
					top: pos.top
				});
			}
			console.log(this.position);
		},
		itemPos: function(){

		}

	};
	waterfall.init();
});