
function zsyPage(){
    var wrapper_id = "wrapper";
    var wrapper_width = $("#" + wrapper_id).width();
    var wrapper_height = $("#" + wrapper_id).height();
    console.log("width:" + wrapper_width + "=== height:" +  wrapper_height)
    var pageConfig = {
        wpWidth: $("#" + wrapper_id).width(),
        wpHeight: $("#" + wrapper_id).height(),
        fWith: window.innerWidth / wrapper_width,   // 换算比例
        fHeight: window.innerHeight / wrapper_height,
    };
    //如果屏幕小于设计宽度 1920
    if(pageConfig.fWith < 1){
        $("#" + wrapper_id).css({
            "transform": "scale(" + pageConfig.fWith + ")",
            "-ms-transform":"scale(" + pageConfig.fWith + ")", // IE 9
            "-webkit-transform":"scale(" + pageConfig.fWith + ")", // Safari and Chrome
            "margin-left": (1 - pageConfig.fWith) * wrapper_width / 2 * -1 + "px",
            "margin-top": (1 - pageConfig.fWith) * wrapper_height / 2 * -1 + "px",
        });
        $("body").height(parseInt(document.getElementById("wrapper").getBoundingClientRect().height));
    }
}

$(document).ready(function(){
    zsyPage();
});


// 防抖动函数
function debounce(func, wait, immediate) {
    var timeout;
    return function() {
        var context = this, args = arguments;
        var later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate & !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
};

var myEfficientFn = debounce(function() {
    zsyPage();
}, 250);
// 绑定监听
window.addEventListener('resize', myEfficientFn);