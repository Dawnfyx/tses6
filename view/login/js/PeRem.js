// 原理 
// 创建一个DIV 赋宽度1REM 通过getComputedStyle取DIV的PX值 再用这个值进行运算

function PeRem(designWidth, peWidth){
    var d = window.document.createElement("div");
    d.style.width = "1rem";
    d.style.display = "none";
    var head = window.document.getElementsByTagName("head")[0];
    head.appendChild(d);
    var defaultFontSize = parseFloat(window.getComputedStyle(d, null).getPropertyValue("width"));
    d.remove();
    document.documentElement.style.fontSize = window.innerWidth / designWidth * peWidth / defaultFontSize * 100 + "%";
    var st = document.createElement("style");
    var portrait = "@media screen and (min-width: "+ window.innerWidth +"px){html{font-size:"+((window.innerWidth/(designWidth/peWidth)/defaultFontSize) * 100) +"%}}";
    var landscape = "@medi screen and (min-width:"+ window.innerHeight +"px){html{font-size:"+((window.innerHeight/(designWidth/peWidth)/defaultFontSize) * 100)+"%}}";
    st.innerHTML = portrait + landscape;
    head.appendChild(st);
    return defaultFontSize;
}

//写CSS的单位用REM
var defaultFontSize = PeRem(750, 100);