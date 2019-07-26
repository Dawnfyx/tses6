/*
* @Author: fangyaxi
* @Date:   2019-06-18
* @Last Modified by:  fangyaxi
* @Last Modified time: 2019-06-24
*/
(function(win, doc){
    // "use strict";

    win.addEventListener("mousedown", function (ev) {
        let initData = {
            isDragObj: false,//是否是可以拖动对象
            dragObj: null, //拖动目标
            isPort: false, //是否 对接|校准
            offestX: null, //目标 offestLeft值
            offestY: null,
            innerX: null, //鼠标位置到目标X轴边缘值
            innerY: null,
            overDragObj: null, //结束对象
            overDragX: null,
            overDragY: null,
            overStatusNum: 0 //判断是否全部拼成 数量
        };

        //对事件对象 class名称进行判断 看是否拖动对象
        let dragObj = ev;
        dragObj.target.classList.forEach(function (cn, index) {
            // 如果是展示的div 或者 是拖动的对象
            if(cn === "drag-before" || cn === "drag-after"){
                dragObjChange(ev, dragObj);
            } else {
                return;
            }
        });

        //顺序限制
        function orderAstrict(obj){
            if(obj.getAttribute("data-astrict") === null){
                return true;
            } else{
                let astrictArray= new Array(); //定义一数组
                astrictArray= obj.getAttribute("data-astrict").toString().split("|");
                for (let i = 0; i <astrictArray.length ; i++) {
                    if(document.getElementsByClassName("drag-" + astrictArray[i])[1].getAttribute("data-status") === "true"){
                        return true;
                    }
                }
                return false;
            }
        }

        //移动时候
        doc.onmousemove = function(ev){
            if(initData.dragObj === null){
                return;
            }
            initData.dragObj.style.left = ev.clientX - initData.innerX + "px";
            initData.dragObj.style.top = ev.clientY - initData.innerY + "px";
            let boxPadX = initData.dragObj.offsetWidth - initData.innerX;
            let boxPadY = initData.dragObj.offsetHeight - initData.innerY;

            //超出边界
            if(parseInt(initData.dragObj.style.left) <= 0){
                initData.dragObj.style.left = "0px";
            }
            if(parseInt(initData.dragObj.style.top) <= 0){
                initData.dragObj.style.top = "0px";
            }
            if(parseInt(initData.dragObj.style.left) + initData.dragObj.offsetWidth >= window.innerWidth){
                initData.dragObj.style.left = window.innerWidth - initData.dragObj.offsetWidth+ "px";
            }
            if(parseInt(initData.dragObj.style.top) + initData.dragObj.offsetHeight >= window.innerHeight){
                initData.dragObj.style.top = window.innerHeight - initData.dragObj.offsetHeight + "px";
            }

            doc.getElementById("js-box-center").childNodes.forEach((ele, index) => {
                if(ele.tagName === "DIV" && ele.getAttribute("data-port") === initData.dragObj.getAttribute("data-port")){
                    initData.overDragObj = ele;
                    initData.overDragX = ele.offsetLeft;
                    initData.overDragY = ele.offsetTop;
                }
            });

            // initData.overDragObj.style.opacity = "1";
            // console.log("innerX", initData.innerX, initData.innerY);
            // console.log("overDrag", initData.overDragX + 156, initData.overDragY);
            // console.log("dragObj", initData.dragObj.offsetLeft - 33, initData.dragObj.offsetTop -33);
            // console.log("==================");
            // debugger

            if(
                initData.dragObj.offsetLeft - 33 > initData.overDragX - 30 + 156 &&
                initData.dragObj.offsetLeft - 33 <initData.overDragX + 30 + 156 &&
                initData.dragObj.offsetTop - 33 > initData.overDragY - 30 &&
                initData.dragObj.offsetTop - 33 < initData.overDragY + 30
            ){
                if (orderAstrict(initData.dragObj)) {
                    initData.isPort = true;
                    initData.overDragObj.setAttribute("data-status", "true");
                    console.log("对齐了");
                } else{
                    initData.isPort = false;
                    initData.overDragObj.setAttribute("data-status", "false");
                }
            } else{
                initData.isPort = false;
                initData.overDragObj.setAttribute("data-status", "false");
            }
        }

        //放下时候
        doc.onmouseup = function(ev){

            if(initData.dragObj === null){
                return;
            }

            //样式还原;
            initData.overDragObj.style.opacity = "0";
            initData.dragObj.style.cursor = "auto";
            initData.dragObj.style.borderStyle = "";
            initData.dragObj.style.borderColor = "";
            initData.dragObj.style.borderWidth = "";
            initData.dragObj.style.zIndex = "1";

            if(!initData.isPort){
                dragObjChange(ev, dragObj)
                initData.dragObj.style.left = "";
                initData.dragObj.style.top = "";
                initData.isPort = false;
            } else {
                // debugger
                initData.dragObj.style.left= initData.overDragX + 156 + 30 + "px"
                initData.dragObj.style.top= initData.overDragY + 30 + "px"
            }

            event = null;
            initData.isDragObj = false;
            initData.dragObj = null;
            initData.offestX = null;
            initData.offestY = null;
            initData.innerX = null;
            initData.innerY = null;
            initData.overDragObj = null;
            initData.overDragX = null;
            initData.overDragY = null;

            // 回收内存
            doc.onmousemove = null;
            doc.onmouseup = null;

            //判断是否全部对齐完成
            var statusNum = doc.getElementById("js-box-center").children;
            for (let i = 0; i <statusNum.length ; i++) {
                if(doc.getElementById("js-box-center").children[i].getAttribute("data-status") === "true"){
                    initData.overStatusNum += 1;
                }
            }
            if(initData.overStatusNum === statusNum.length){
                // alert("game over");
                var regText =  null;
                if(/(\w+)\.html$/.test(window.location.pathname)){
                    regText = "index-" + RegExp.$1 + ".html";
                } else{
                    regText = "index-iframe.html"
                }
                layer.open({
                    content: '恭喜你成功完成组装游戏！',
                    scrollbar: false,
                    btn: ['再玩一次', '关闭'],
                    yes: function () {
                        window.location.href = regText;
                    },btn2: function(index, layero){
                        layer.close(index);
                        return;
                    }
                });
                return;
            }
        }



        //拖动目标交换
        function dragObjChange(event, dragObj) {
            // 屏蔽无意义移动
            if(event.target === null){
                return;
            }
            // debugger
            let obj = dragObj.target;
            let objParent = dragObj.target.parentNode;
            let boxDragObj = objParent.children[0];
            let realDragObj = objParent.children[1];

            //正则判断是否有类
            if(/drag-before/.test(dragObj.target.className) && objParent.getAttribute("data-isShow") === "false"){
                boxDragObj.style.display = "none";
                realDragObj.style.display = "block";
                objParent.setAttribute("data-isShow", "true");
            } else
            if(/drag-after/.test(dragObj.target.className) && objParent.getAttribute("data-isShow") === "true"){
                realDragObj.style.display = "none";
                boxDragObj.style.display = "block";
                objParent.setAttribute("data-isShow", "false");
            }

            //鼠标放下操作验证是否对齐
            if(event.type === "mouseup"){
                // debugger
                realDragObj.style.display = "none";
                boxDragObj.style.display = "block";
                objParent.setAttribute("data-isShow", "false");
            }
            setDragObjToMouseCenter(event, realDragObj);
        }

        //拖动目标对准鼠标中心
        function setDragObjToMouseCenter(event, obj) {
            let objX = parseInt(obj.offsetWidth/2);
            let objY = parseInt(obj.offsetHeight/2);
            let mouseX = event.clientX;
            let mouseY = event.clientY;
            obj.style.top = mouseY - objY + "px";
            obj.style.left = mouseX - objX + "px";

            // debugger
            //有drag标记的才允许拖动
            if(obj.getAttribute("data-drag") === "true"){
                isDragObj = true;
                initData.dragObj = obj;
                initData.offestX = parseInt(initData.dragObj.offsetLeft);
                initData.offestY = parseInt(initData.dragObj.offsetTop);
                initData.innerX = event.clientX - initData.offestX; //鼠标在选择物体中的位置
                initData.innerY = event.clientY - initData.offestY;
                return initData;
            } else{
                return;
            }
        }

    }, true);

}(window, document))
