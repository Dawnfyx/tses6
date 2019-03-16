(function (win, doc){
    // 需要的属性
    var slideSet = function (slideSet) {
        this.slideSet = slideSet;
        this.slideId = $("#" + slideSet.id);
        this.indexX = 0; //中间值
        this.timer = null; //autoPlay
        this.slideIdItem = this.slideId.children(".item");
        this.itemNum = this.slideIdItem.length;//轮播元素个数 
        this.slidePy = slideSet.Awidth / (this.itemNum - 1); //slidePy 滑动偏移量
        this.init();
        // this.autoPlay();
        return this;
    }


    slideSet.prototype = {
        //修正
        constructor: slideSet,

        //初始化
        init: function(){
            var _this = this;
            
            this.slideId.children(".item").each(function (index) {
                var rt = 1; //1:右侧：-1：左侧
                if (//判断元素左侧还是右侧  用于左右渐变效果  
                    (index - _this.indexX) > _this.itemNum / 2 || 
                    (index - _this.indexX) < 0 && (index - _this.indexX) > (-_this.itemNum / 2)) { 
                    rt = -1 
                }
                    
                var i = Math.abs(index - _this.indexX);//取绝对值
                if (i > _this.itemNum / 2) { //i:是左或者右的第几个
                    i = parseInt(_this.indexX) + parseInt(_this.itemNum) - index; 
                }
                if ((index - _this.indexX) < (-_this.itemNum / 2)) { 
                    i = _this.itemNum + index - _this.indexX 
                }
                //附加样式
                $(this).css({
                    'position': 'absolute',
                    'left': '0%',
                    'margin-left': -_this.slideSet.width / 2 + _this.slideSetPy * rt * i + "px",
                    'z-index': _this.itemNum - i,
                    'opacity': Math.pow(_this.slideSet.opacity, i),
                    'transform': 'scale(' + Math.pow(_this.slideSet.scale, i) + ')',
                    '-webkit-transform': 'scale(' + Math.pow(_this.slideSet.scale, i) + ')'
                    // transform: translateY(142px) rotateX(85deg) translateY(- 142px)
                })
                $(this).attr("data-index", index);
            })
        },
        //自动播放
        autoPlay: function () {
            var _this = this;
            var autoTime = 5000
            if (this.slideSet.autoTime) { 
                autoTime = this.slideSet.autoTime 
            }
            _this.timer = setInterval(function () {
                _self.next_()
            }, autoTime)
        }
    }

    win.slideSet = slideSet;

})(window, document)