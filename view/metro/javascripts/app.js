/**
 *
 * @Author: fangyaxi
 * @Date:   2019-06-27
 * @Last Modified by:  fangyaxi
 * @Last Modified time: 2019-07-01
 *
 *  整体思路--标记法
 *  所有地铁条件添加标记，对选中的线路标记修改为状态并进行匹配判断
 *
 */

(function (window, document) {


    //svg铁路线路
    let svgLine = document.getElementById("svgline");
    let jNum = 0; //点击的次数
    let cacheLineType = null; //缓存点击线的类型
    let cacheLineObj = null  //缓存点击线的对象
    let cacheThreeLinkObj = null //三连消缓存点击线的对象
    let nowLineTypeData = null; //第一次点击获取线段数组 以此判断
    let chosenSvgLine = new Array; //选择活动的SvgLine

    /**
     * 初始化 给所有地铁线路加上否活动的标记
     */
    for (let i = 0; i <svgLine.children.length; i++) {
        if(isSvgLine(svgLine.children[i])){
            svgLine.children[i].setAttribute("data-isactive", "false");
        }
    }

    /**
     * 获取所有的svgLine 线 的数组
     */
    let lineDataAarry = new Array();
    lineDataAarry = [
        {type: "soft", data: dataClassify(svgLine.children, "soft")},
        {type: "firm", data: dataClassify(svgLine.children, "firm")},
        {type: "softfirm", data: dataClassify(svgLine.children, "softfirm")},
        {type: "touch", data: dataClassify(svgLine.children, "touch")}
    ];

    /**
     * 判断是否是svg的线
     * @param obj  操作的对象
     * @return {obj | null} 如果是返回对象 不是则为null
     */
    function isSvgLine(obj) {
        let arr = ['path', 'polyline', 'line'];
        // console.log("isSvgLine", obj);
        if(arr.indexOf(obj.tagName) > -1){
            return obj;
        } else {
            return null;
        }
    }

    /**
     * 获取全部 有类型的铁轨
     * @param svgLineArr 传入 svgLine 所有子级
     * @return {Array}
     */
    function getDataType(svgLineArr) {
        var hashArr = [];
        for(var i of svgLineArr){
            if(isSvgLine(i)){
                if(i.getAttribute("data-type") !== null){
                    hashArr.push(i);
                }
            }
        }
        return hashArr;
    }

    /**
     * 对全部 有类型的铁轨进行分类
     * @param obj
     * @param type
     * @return {Array}
     */
    function dataClassify (obj, type) {
        var map = getDataType(obj);
        var hash = [];
        for (var  i = 0; i < map.length; i++) {
            if(map[i].getAttribute("data-type") == type){
                hash.push(map[i].className.baseVal);
            }
        }
        return hash;
    }

    /**
     *  判断svgLine类型
     * @param type 类型
     * @return {Array}
     */
    function lineDataAarryKey(type) {
        for (var key in lineDataAarry) {
            if(lineDataAarry[key].type == type){
                return key;
            }
        }
    }

    /**
     *  判断两个svgLine的类型是否一样
     * @param befObj 之前对象
     * @param nowObj 当前对象
     * @return {boolean}
     */
    function isEqualType(befObj, nowObj) {
        if(befObj.getAttribute("data-type") === nowObj.getAttribute("data-type")){
            return true;
        } else{
            return false;
        }
    }

    /**
     * svgLine的显示隐藏
     * @param obj 操作的对象
     * @param control  开关
     */
    function svgLineShowHide(obj, control) {
        if(control == "false"){
            obj.setAttribute("data-isactive", "false");
            obj.style.opacity = 0.5;
            obj.style.strokeWidth = '6pt';
        } else if(control == "true"){
            obj.setAttribute("data-isactive", "true");
            obj.style.opacity = 1;
            obj.style.strokeWidth = '8pt';
        } else if(control == "hide"){
            obj.setAttribute("data-isactive", "false");
            obj.style.opacity = 0.5;
            obj.style.strokeWidth = '6pt';
            obj.style.display = "none";
            obj.remove();
        }
    }

    /**
     * 关闭还是现实 提示盒子
     * @param obj 操作的obj对象
     * @param control  操作开关
     */
    function isShowHideExplainBox(obj, control){
        if(control == "hide"){
            obj.style.display = "none";
        } else
        if(control == "show"){
            obj.style.display = "block";
        }
    }

    /**
     * 循环找个svgLine 对象的提示盒子
     * @param obj 操作的svgLine对象
     * @param control 操作开关
     */
    function forExplainBox(obj, control){
        if(obj.tagName == "defs"){
            return;
        }
        var imgNum = obj.className.baseVal.match(/\d{1,2}$/);//找后两位数子
        var jsLineExplanBox = document.getElementById("js-line-explan-box");
        for (let i = 0; i <jsLineExplanBox.children.length; i++) {
            if(jsLineExplanBox.children[i].className === "line" + imgNum[0]){
                isShowHideExplainBox(jsLineExplanBox.children[i], control);
            }
        }
    }

    //是否游戏结束检查
    function gameoverExamine(timeTime) {
        debugger
        if (0 === lineDataAarry[0].data.length
            && 0 === lineDataAarry[1].data.length
            && 0 === lineDataAarry[2].data.length
            && 0 === lineDataAarry[3].data.length) {
            clearInterval(timeTime);
            setTimeout(function () {
                layer.open({
                    type: 1
                    ,title: false //不显示标题栏
                    ,closeBtn: false
                    ,area: '300px;'
                    ,shade: 0.8
                    ,id: 'LAY_layuipro' //设定一个id，防止重复弹出
                    ,resize: false
                    ,btn: ['再来一次']
                    ,btnAlign: 'c'
                    ,moveType: 1 //拖拽模式，0或者1
                    ,content: '<div style="color: #fff;">你赢了，游戏结束，老师很欣慰 ^-^</div>'
                    ,success: function(layero){
                        var btn = layero.find('.layui-layer-btn');
                        btn.find('.layui-layer-btn0').attr({
                            href: 'ptpop-iframe.html'
                            ,target: '_self'
                        });
                    }
                });
            }, 3000);

        }
    }

    //
    function equalSvgLine(target, cacheThreeLinkObj) {
        //选出 标记为活动的svgLine
        for (let i = 0; i < svgLine.children.length; i++) {
            if (svgLine.children[i].getAttribute("data-isactive") == "true") {
                chosenSvgLine.push(svgLine.children[i]);
            }
        }

        if(cacheThreeLinkObj === null ||  cacheThreeLinkObj == undefined){
            //比对第一个 第二个选择活动的SvgLine
            if(chosenSvgLine[0].getAttribute("data-type") === chosenSvgLine[1].getAttribute("data-type")){
                for (let i = 0; i <chosenSvgLine.length; i++) {
                    if(nowLineTypeData.indexOf(chosenSvgLine[i].className.baseVal) > -1){
                        nowLineTypeData.splice(nowLineTypeData.indexOf(chosenSvgLine[i].className.baseVal), 1);
                        lineDataAarry[lineDataAarryKey(cacheLineType)].data = nowLineTypeData;
                        forExplainBox(chosenSvgLine[i], "hide");
                        svgLineShowHide(chosenSvgLine[i], "hide");
                    }
                }
                layerAlert(1, "对了，都是同样接触网类型！ 我拿掉了~ ^_^ ");
            } else {
                for (let i = 0; i <svgLine.children.length; i++) {
                    forExplainBox(svgLine.children[i], "hide");
                    svgLineShowHide(svgLine.children[i], "false");
                }
                layerAlert(0, "选择的供电类型不同， 重新来！");
            }
        } else {
            //比对第一个 第二个选择活动的SvgLine
            if(chosenSvgLine[0].getAttribute("data-type") === chosenSvgLine[1].getAttribute("data-type") &&
                chosenSvgLine[0].getAttribute("data-type") === chosenSvgLine[2].getAttribute("data-type")){
                for (let i = 0; i <chosenSvgLine.length; i++) {
                    if(nowLineTypeData.indexOf(chosenSvgLine[i].className.baseVal) > -1){
                        nowLineTypeData.splice(nowLineTypeData.indexOf(chosenSvgLine[i].className.baseVal), 1);
                        lineDataAarry[lineDataAarryKey(cacheLineType)].data = nowLineTypeData;

                        forExplainBox(chosenSvgLine[i], "hide");
                        svgLineShowHide(chosenSvgLine[i], "hide");
                    }
                }
                layerAlert(1, "对了，都是同样接触网类型！ 我拿掉了~ ^_^ ");
            } else {
                for (let i = 0; i <svgLine.children.length; i++) {
                    forExplainBox(svgLine.children[i], "hide");
                    svgLineShowHide(svgLine.children[i], "false");
                }
                layerAlert(0, "选择的供电类型不同， 重新来！");
            }
        }

        cacheLineType = null;
        cacheLineObj = null;
        cacheThreeLinkObj = null;
        nowLineTypeData = null;
        chosenSvgLine.length = 0;
        jNum = 0;

    }

    /**
     * 点击分流操作
     * @param target
     */
    function clickOperation(target){

        //如果目标的标记是未激活的
        if(target.getAttribute("data-isactive") == "false"){

            //svgLineShow
            svgLineShowHide(target, "true");
            forExplainBox(target, "show");
            cacheLineType = target.getAttribute("data-type");
            jNum++; //计数加一

            if(!cacheLineObj){
                cacheLineObj = target;
            }

            //为三连消 准备
            if(jNum === 2){
                cacheThreeLinkObj = target;
            }

            if(!nowLineTypeData){
                nowLineTypeData = lineDataAarry[lineDataAarryKey(cacheLineType)].data;
            }


        } else{
            svgLineShowHide(target, "false");
            forExplainBox(target, "hide");
            cacheLineType = null;
            cacheLineObj = null;
            cacheThreeLinkObj = null;
            nowLineTypeData = null;
            chosenSvgLine.length = 0;
            jNum = 0;
            return;
        }

        //点击次数两次 且 svgLine 线 的数组数量等于二的时候
        if(jNum === 2  && nowLineTypeData.length % 2 === 0){
            equalSvgLine(target, null);
        } else
        if(jNum === 2  && nowLineTypeData.length === 3){
            layerAlert(1, "还有一条同样接触网类型的轨道线路，请选择！");
        } else
        if(jNum === 2  && nowLineTypeData.length > 3){
            equalSvgLine(target, null);
        } else
        if(jNum > 2 && nowLineTypeData.length >= 3){
            equalSvgLine(target, cacheThreeLinkObj);
        }
    }

    /**
     *  信息打印
     * @constructor
     */
    function  InfoConl() {
        console.log("cacheLineType", cacheLineType);
        console.log("cacheLineObj", cacheLineObj);
        console.log("nowLineTypeData", nowLineTypeData);
    }

    //layer 弹框
    function layerAlert(type, text) {
        var animType = null;
        if(type == 0){
            animType = 'shake'; //错的动画样式类名
        }
        if(type == 1){
            animType = 'pulse'; //对的动画样式类名
        }
        document.getElementById("js-line-explain").childNodes.forEach(function (obj, index) {
            if(obj.tagName === "IMG"){
                obj.style.display = "none";
            }
        });
        layer.open({
            type: 1,
            skin: animType,
            closeBtn: 0, //不显示关闭按钮
            anim: 2,
            shadeClose: true, //开启遮罩关闭
            content: text
        });
    }

    //对svgline进行鼠标按下事件监听
    svgline.addEventListener("mousedown", function (event) {
        let target = event.target;
        //判断点到的是否 是线 如果不是
        if(!isSvgLine(target)){
            return;
        }
        clickOperation(target);

        gameoverExamine(timeTime);

    })

    //对svgline进行鼠标放下事件监听
    svgline.addEventListener("mouseup", function (event) {
        let target = event.target;
    })

    document.getElementById("js-game-explain").children[0].addEventListener("click", function (event) {
        // this.parentNode.style.display = "none";
        this.parentNode.remove();
    }, false);

    //计时器
    var timeS = 60;
    var timeMs = 0;
    var timeTime = 0;
    document.getElementById("js-game-time").innerText = timeS;
    function timer(){
        timeMs = timeMs + 200;
        if(timeMs >= 1000){
            timeMs = 0;
            timeS = timeS - 1;
        }
        if(timeS <= 0){
            clearInterval(timeTime);
            purdahStop();
        }
        str = toDub(timeS);
        mytime = document.getElementById("js-game-time");
        mytime.innerHTML = str;
    }
    function toDub(n) {  //补0操作
        if (n < 10) {
            return "0" + n;
        }
        else {
            return "" + n;
        }
    }
    // function start() {  //开始
    //     timeTime = setInterval(timer, 200);
    // }
    timeTime = setInterval(timer, 200);
    function purdahStop(){
        layer.open({
            type: 1
            ,title: false //不显示标题栏
            ,closeBtn: false
            ,area: '300px;'
            ,shade: 0.8
            ,id: 'LAY_layuipro' //设定一个id，防止重复弹出
            ,resize: false
            ,btn: ['重新来过']
            ,btnAlign: 'c'
            ,moveType: 1 //拖拽模式，0或者1
            ,content: '<div style="color: #fff;">您已超时！</div>'
            ,success: function(layero){
                var btn = layero.find('.layui-layer-btn');
                btn.find('.layui-layer-btn0').attr({
                    href: 'ptpop-iframe.html'
                    ,target: '_self'
                });
            }
        });
    }


})(window, document)
