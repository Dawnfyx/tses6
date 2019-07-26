
//一些参数
var lineNum = ['1', '2', '3'];
var color = ['#da4536', '#bd2978', '#68cec9'];
var names = [
    {name: '一号线', value: 1},
    {name: '二号线', value: 2},
    {name: '三号线', value: 3}
];
var aboutinfo = [
    [12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1],
    [23, , , , , , 22, , , , 21],
    [34, , 33, , 32, , , 31]
]

var aboutinfoRight = [1, 4, 21, 22, 23, 31, 32, 33, 34];


function init() {
    // 创建数据模型
    dataModel = new ht.DataModel();
    graphView = new ht.graph.GraphView(dataModel);

    // ht.Default.zoomMax = 10;
    // ht.Default.zoomMin = 10;

    // 加入到dom中
    graphView.setLayers(['0', 'middle', 'top']);//设置层次index越大的显示越上层
    graphView.fitContent(false, 200);//自适应大小
    graphView.setMovableFunc(function(data) {//设置graphView上的节点不可移动
        return false;
    });
    graphView.setPannable(function() {
        return false;
    });
    graphView.zoomReset(false);
    graphView.addToDOM();//将拓扑图组件添加进body中



    graphView.getSelectWidth = function() {return 0};

    // 窗口大小变换时 自适应调整
    window.addEventListener('resize', function (e) {
        graphView.invalidate();
        graphView.fitContent(false, 200);//重新设置graphView的自适应，只是不需要动画，否则上一次的动画没有结束，下一次的动画又来了，会混乱
        graphView.setMovableFunc(function(data) {//设置graphView上的节点不可移动
            return false;
        });
        graphView.setPannable(function() {
            return false;
        });
    }, false);

    graphView.enableToolTip();
    //要做动画必须用这个方法
    dataModel.enableAnimation();

    //四个广告位
    createAd1();
    createAd2();
    createAd3();
    createAd4();
    createItem();

    for (let i = 0; i <lineNum.length; i++) {
        var lineName = "Line" + (i + 1);
        var lineData = window[lineName];
        createLine(i + 1, color[i]);

        // var linePointsName = "Line" + (i + 1);
        // var linePointsData = window[linePointsName];
        // createNode(linePointsData, color[i], i+1);

        if(i == 0){
            trainAnimation1(lineData, lineName, 1);
        }
        if(i == 1){
            trainAnimation2(lineData, lineName, 2);
        }
        if(i == 2){
            trainAnimation3(lineData, lineName, 3);
        }
    }

    view = graphView.getView();
    view.className = 'main';
    // document.getElementsByClassName('main')
    var name, interval = null;
    graphView.getView().addEventListener('mousemove', function(e) {
        var data = graphView.getDataAt(e);//传入逻辑坐标点或者交互event事件参数，返回当前点下的图元
        // console.log('name',name);
        if (name) {
            originNode(name);//让节点保持原来的大小
            hideLabel(name);
        }

        if (data instanceof ht.Polyline) {//判断事件节点的类型
            dataModel.sm().ss(data);//选中“管道”
            name = '';
        } else
        if (data instanceof ht.Node) {
            if(name){
                // debugger
                expandNode(data);//放大节点
                showLabel(data);
            }
            dataModel.sm().ss(data);//设置选中节点
            // debugger
            name = data.getTag();//作为“上一个节点”的存储变量，可以通过这个值来获取节点

        }  else {//其他任何情况则不选中任何内容
            dataModel.sm().ss(null);
            name = '';
        }


    });

    //红点事件
    var redLight = createRedLight();//创建一个新的节点，显示为“红灯”的样式
    graphView.mi(function(e){
        if(e.kind === 'clickData' && e.data.a('npNode')){
            redLight.s('2d.visible', true);//设置node节点可见
            redLight.setPosition(e.data.getPosition().x, e.data.getPosition().y);//设置node的坐标为当前事件下节点的位置
        } else
        if(e.kind === 'clickData' && e.data.a('trainLine')){
            console.log('hi ' + e.data.getTag() + ', my name is Dawn');

            // debugger
        } else
        // if (e.kind === 'doubleClickData') {//双击节点
        //     graphView.fitData(e.data, false, 10);//将事件下的节点自适应到拓扑图的中央，参数1为自适应的节点，参数2为是否动画，参数3为gv与边框的padding
        // }else
        if (e.kind === 'doubleClickBackground') {//双击空白处
            redLight.s('2d.visible', false);//设置node节点不可见
        }
    })
}

//创建跳动的红点
function createRedLight() {
    var redLight = new ht.Node();
    redLight.setImage('json/RedLight.json');//设置节点的图片
    redLight.setSize(30, 30);
    redLight.setTag('redLight');
    redLight.setLayer('top');
    redLight.s({
        '2d.visible': false,//节点不可见
        '2d.selectable': false,//设置这个属性，则节点不可选中
        'select.width': 0//节点选中时的边框为0，不可见
    });
    //设置动画
    redLight.setAnimation({
        expandWidth: {
            property: "width",//设置这个属性，并且未设置 accessType，则默认通过 setWidth/getWidth 来设置和获取属性。这里的 width 和下面的 height 都是通过前面设置的 size 得到的
            from: 30,
            to: 60,
            next: "collapseWidth"
        },
        collapseWidth: {
            property: "width",
            from: 60,
            to: 30,
            next: "expandWidth"
        },
        expandHeight: {
            property: "height",
            from: 30,
            to: 60,
            next: "collapseHeight"
        },
        collapseHeight: {
            property: "height",
            from: 60,
            to: 30,
            next: "expandHeight"
        },
        start: ["expandWidth", "expandHeight"]//数组，用于指定要启动的一个或多个动画
    });
    dataModel.add(redLight);
    return redLight;
}

//绘制信息label连接线
function createEdge(sourceNode, targeNode) {
    var edge = new ht.Edge(sourceNode, targeNode);
    edge.s({
        'edge.type': 'flex2',
        'edge.flex': 20,
        'edge.color': '#ffffff',
        'edge.width': 1
    });
    dataModel.add(edge);
    return edge;
}

//绘制label
function createLabel(ptx, pty, forNum) {
    if(forNum !== undefined && ptx){
        var label = new ht.Node();
        // label.setAttr('class', 'labelNode');
        label.setImage( 'images/line-box-' + forNum + '.png');
        // console.log('/metro/images/line-box-' + forNum + '.png');
        label.setLayer('middle');
        label.setSize(240*2, 87*2);
        label.a('pointLabel', true);


        if(aboutinfoRight.indexOf(forNum)>= 0){
            label.setPosition(ptx + 400, pty - 20);
        } else {
            label.setPosition(ptx - 400, pty - 20);
        }
        //一些微调
        // if(forNum == 1){
        //     label.setPosition(ptx + 400, pty - 40);
        // }
        // if(forNum == 2){
        //     label.setPosition(ptx - 400, pty - 40);
        // }
        // if(forNum == 5){
        //     label.setPosition(ptx - 400, pty - 30);
        // }
        // if(forNum == 6){
        //     label.setPosition(ptx + 400, pty - 40);
        // }
        // if(forNum == 7){
        //     label.setPosition(ptx + 400, pty - 40);
        // }
        // if(forNum == 8){
        //     label.setPosition(ptx - 400, pty - 30);
        // }
        // if(forNum == 10){
        //     label.setPosition(ptx - 400, pty - 40);
        // }
        // if(forNum == 12){
        //     label.setPosition(ptx + 400, pty + 30);
        // }
        // if(forNum == 23){
        //     label.setPosition(ptx + 400, pty + 30);
        // }
        // if(forNum == 31){
        //     label.setPosition(ptx + 400, pty -30);
        // }
        // if(forNum == 33){
        //     label.setPosition(ptx + 480, pty - 20);
        // }
        // if(forNum == 34){
        //     label.setPosition(ptx + 400, pty + 90);
        // }

        label.s('2d.visible', false);//节点不可见
        label.s('select.width', 0);//节点选中时的边框为0，不可见
        label.s('2d.selectable', false);//设置这个属性，则节点不可选中
        dataModel.add(label);
        return label;
    }
}

//显示label
function showLabel(data){
    var id = data.getId() + 1;
    // console.log("showID", id);
    if(data.getDataModel()._dataMap[id].a('pointLabel')){
        data.getDataModel()._dataMap[id].s('2d.visible', true);
    }
};

//隐藏label
function hideLabel(name){
    var node = dataModel.getDataByTag(name);
    var id = node.getId() + 1;
    if(dataModel._dataMap[id].a('pointLabel')){
        dataModel._dataMap[id].s('2d.visible', false);
    }
};

//绘制节点
function createNode(ptx, pty, lineNum, forNum) {
    var lineName = "Line" + lineNum;
    var lineDate = window[lineName];
    // console.log(forNum);
    var name = lineDate[forNum].name;
    // console.log('name=' + name, 'forNum=' + forNum, 'ArrayNum'+ lineDate.length);
    // var linePointsName = "Point" + lineNum;
    // var linePointsData = window[linePointsName];
    // var name = linePointsData[forNum].name;
    // console.log('name', name);
    // debugger

    var trainNode = new ht.Node();
    trainNode.setTag(name);
    trainNode.setSize(40, 40);
    trainNode.setLayer('middle');

    //设置自定义属性，并设置默认值
    trainNode.a({
        'alarmColor1': '#fff',
        'alarmColor2': '#fff',
        'npColor': '#fff'
    });
    if (name && color) {
        trainNode.s({//设置节点样式
            'label': name,//文本内容，一般显示在节点下方
            'label.font': '20px sans-serif',
            'label.color': '#00ffff',//文本颜色
            'label.scale': 2.5,//文本大小，一般浏览器有限定最小字号，设置这个值不需要担心这个问题
            'label.offset.y': -5,//文本y轴偏移
            // 'label.selectable': false,//选中节点是否可选中文本
            'label.align': 'left',
            'select.width': 0//选中节点外边框的宽度
        });
        trainNode.s('label.offset.x', -200); //文本x轴偏移

        //一些微调
        if(lineNum == 1 && forNum == 0){
            trainNode.s('label.offset.y', -120);
        }
        if(lineNum == 1 && forNum == 18){
            trainNode.s('label.offset.y', 130);
        }
        if(lineNum == 2 && forNum == 4){
            trainNode.s('label.offset.x', 400);
            trainNode.s('label.offset.y', -50);
        }
    }
    if (ptx) {
        trainNode.setPosition(ptx, pty);
    }
    trainNode.setImage('json/Points.json');
    trainNode.a('npColor', 'rgb(150, 150, 150)');
    trainNode.a('npNode', true);

    dataModel.add(trainNode);
    return trainNode;
}

//节点变大
function expandNode(data) {
    var id = data.getId();
    if(data.getDataModel()._dataMap[id].a('npNode')){
        data.setSize(55, 55);
        data.a('npColor', 'rgb(51,153,255)');
    }
}

//节点还原
function originNode(name){
    var node = dataModel.getDataByTag(name);
    var id = node.getId();
    if(dataModel._dataMap[id].a('npNode')){
        node.setSize(40, 40);
        node.a('npColor', 'rgb(150, 150, 150)');
    }
}

//绘制地图线
function createLine(num, color) {
    // debugger
    var polyline = new ht.Polyline();
    polyline.setTag('Line'+ num);
    polyline.setToolTip('Line' + num);
    polyline.setLayer('0');
    polyline.a('trainLine', true);
    // if(num == 1){
    //     polyline.setSegments([1, 2, 2, 3, 2, 3, 3, 2, 2]);
    // }
    if(color){
        polyline.s({//s 为 setStyle 的简写，设置样式
            'shape.border.width': 16,//设置多边形的边框宽度
            'shape.background': null,
            'shape.border.color': color,//设置多边形的边框颜色
            // 'shape.gradient': 'spread.vertical',
            // 'shape.gradient-color': '#ffffff',
            'select.width': 1,//设置选中节点的边框宽度
            'select.color': color,//设置选中节点的边框颜色
            // 'shape.border.3d': true,
            // 'shape.border.3d.color': color
        });
    }

    var LineObjArray = window['Line' + num].map(function (map, index) {
        mapArray = {
            x: map.coords[0][0] * 10,
            y: map.coords[0][1] * -10
        }
        return mapArray;
    });

    // polyline.setPoints([
    //     {x: 140, y: 100},
    //     {x: 190, y: 300},
    //     {x: 340, y: 500},
    //     {x: 400, y: 700}
    // ]);
    // console.log(LineObjArray);
    // console.log('LineObjArray',  LineObjArray);
    polyline.setPoints(LineObjArray);
    polyline.setLayer('0');//将线设置在下层，点设置在上层“middle”
    dataModel.add(polyline);
    return polyline;
}

//onUpdate 回调函数，动画的每一帧都会回调此函数
//onComplete 回调函数，动画完成后执行
//setAnimation(null) 清除动画
function trainAnimation1(lineData, lineName, num) {
    var pi = 3.1415926;
    var train = new ht.Node();
    train.setTag(lineName);
    train.setImage( 'images/mto-train2.png');
    train.setLayer('top');
    train.setSize(19*2.5, 50*2.5);
    train.setPosition(lineData[0].coords[0][0] * 10, lineData[0].coords[0][1] * -10);
    train.setAnimation({
        slideX0: {
            from: lineData[0].coords[0][0] * 10,
            to: lineData[0].coords[0][0] * 10,
            easing: "Linear",
            frames: 60,
            next: "slideX1",
            onUpdate: function(value) {
                this.setPosition(value, this.getPosition().y);
            },
            onComplete: function () {
                var node = createNode(this.getPosition().x, this.getPosition().y, num, 0);
                var label = createLabel(this.getPosition().x, this.getPosition().y, 1);
                createEdge(label, node);
            }
        },
        slideX1: {
            from: lineData[0].coords[0][0] * 10,
            to: lineData[1].coords[0][0] * 10,
            easing: "Linear",
            frames: 60,
            next: "slideX2",
            onUpdate: function(value) {
                this.setPosition(value, this.getPosition().y);
            },
            onComplete: function () {
                var node = createNode(this.getPosition().x, this.getPosition().y, num, 1);
                var label = createLabel(this.getPosition().x, this.getPosition().y, 2);
                createEdge(label, node);
            }
        },
        slideX2: {
            from: lineData[1].coords[0][0] * 10,
            to: lineData[2].coords[0][0] * 10,
            easing: "Linear",
            frames: 60,
            next: "slideX3",
            onUpdate: function(value) {
                this.setPosition(value, this.getPosition().y);
            },
            onComplete: function () {
                var node = createNode(this.getPosition().x, this.getPosition().y, num, 2);
                var label = createLabel(this.getPosition().x, this.getPosition().y, 3);
                createEdge(label, node);
            }
        },
        slideX3: {
            from: lineData[2].coords[0][0] * 10,
            to: lineData[3].coords[0][0] * 10,
            easing: "Linear",
            frames: 60,
            next: "slideX4",
            onUpdate: function(value) {
                this.setPosition(value, this.getPosition().y);
            },
            onComplete: function () {
                var node = createNode(this.getPosition().x, this.getPosition().y, num, 3);
                var label = createLabel(this.getPosition().x, this.getPosition().y, 4);
                createEdge(label, node);
            }
        },
        slideX4: {
            from: lineData[3].coords[0][0] * 10,
            to: lineData[4].coords[0][0] * 10,
            easing: "Linear",
            frames: 60,
            next: "slideX5",
            onUpdate: function(value) {
                this.setPosition(value, this.getPosition().y);
            },
            onComplete: function () {
                var node = createNode(this.getPosition().x, this.getPosition().y, num, 4);
                var label = createLabel(this.getPosition().x, this.getPosition().y, 5);
                createEdge(label, node);
            }
        },
        slideX5: {
            from: lineData[4].coords[0][0] * 10,
            to: lineData[5].coords[0][0] * 10,
            easing: "Linear",
            frames: 60,
            next: "slideX6",
            onUpdate: function(value) {
                this.setPosition(value, this.getPosition().y);
            },
            onComplete: function () {
                var node = createNode(this.getPosition().x, this.getPosition().y, num, 5);
                var label = createLabel(this.getPosition().x, this.getPosition().y, 6);
                createEdge(label, node);
                //弧度=角度*PI/180
                this.setRotation(pi * -40 / 180);
            }
        },
        slideX6: {
            from: lineData[5].coords[0][0] * 10,
            to: lineData[6].coords[0][0] * 10,
            easing: "Linear",
            frames: 60,
            next: "slideX7",
            onUpdate: function(value) {
                this.setPosition(value, this.getPosition().y);
            },
            onComplete: function () {
                //弧度=角度*PI/180
                this.setRotation(pi * 0 / 180);
            }
        },
        slideX7: {
            from: lineData[6].coords[0][0] * 10,
            to: lineData[7].coords[0][0] * 10,
            easing: "Linear",
            frames: 60,
            next: "slideX8",
            onUpdate: function(value) {
                this.setPosition(value, this.getPosition().y);
            },
            onComplete: function () {
                var node = createNode(this.getPosition().x, this.getPosition().y, num, 7);
                var label = createLabel(this.getPosition().x, this.getPosition().y, 7);
                createEdge(label, node);
                //弧度=角度*PI/180
                this.setRotation(pi * 45 / 180);
            }
        },
        slideX8: {
            from: lineData[7].coords[0][0] * 10,
            to: lineData[8].coords[0][0] * 10,
            easing: "Linear",
            frames: 60,
            next: "slideX9",
            onUpdate: function(value) {
                this.setPosition(value, this.getPosition().y);
            },
            onComplete: function () {
                //弧度=角度*PI/180
                this.setRotation(pi * 90 / 180);
            }
        },
        slideX9: {
            from: lineData[8].coords[0][0] * 10,
            to: lineData[9].coords[0][0] * 10,
            easing: "Linear",
            frames: 60,
            next: "slideX10",
            onUpdate: function(value) {
                this.setPosition(value, this.getPosition().y);
            },
            onComplete: function () {
                var node = createNode(this.getPosition().x, this.getPosition().y, num, 9);
                var label = createLabel(this.getPosition().x, this.getPosition().y, 9);
                createEdge(label, node);
                //弧度=角度*PI/180
                this.setRotation(pi * 45 / 180);
            }
        },
        slideX10: {
            from: lineData[9].coords[0][0] * 10,
            to: lineData[10].coords[0][0] * 10,
            easing: "Linear",
            frames: 60,
            next: "slideX11",
            onUpdate: function(value) {
                this.setPosition(value, this.getPosition().y);
            },
            onComplete: function () {
                var node = createNode(this.getPosition().x, this.getPosition().y, num, 10);
                var label = createLabel(this.getPosition().x, this.getPosition().y, 10);
                createEdge(label, node);
            }
        },
        slideX11: {
            from: lineData[10].coords[0][0] * 10,
            to: lineData[11].coords[0][0] * 10,
            easing: "Linear",
            frames: 60,
            next: "slideX12",
            onUpdate: function(value) {
                this.setPosition(value, this.getPosition().y);
            },
            onComplete: function () {
                var node = createNode(this.getPosition().x, this.getPosition().y, num, 11);
                var label = createLabel(this.getPosition().x, this.getPosition().y, 11);
                createEdge(label, node);
                //弧度=角度*PI/180
                this.setRotation(pi * 0 / 180);
            }
        },
        slideX12: {
            from: lineData[11].coords[0][0] * 10,
            to: lineData[12].coords[0][0] * 10,
            easing: "Linear",
            frames: 60,
            next: "slideX13",
            onUpdate: function(value) {
                this.setPosition(value, this.getPosition().y);
            },
            onComplete: function () {
                var node = createNode(this.getPosition().x, this.getPosition().y, num, 12);
                var label = createLabel(this.getPosition().x, this.getPosition().y, 10);
                createEdge(label, node);
                //弧度=角度*PI/180
                this.setRotation(pi * 45 / 180);
            }
        },
        slideX13: {
            from: lineData[12].coords[0][0] * 10,
            to: lineData[13].coords[0][0] * 10,
            easing: "Linear",
            frames: 60,
            next: "slideX14",
            onUpdate: function(value) {
                this.setPosition(value, this.getPosition().y);
            },
            onComplete: function () {
            }
        },
        slideX14: {
            from: lineData[13].coords[0][0] * 10,
            to: lineData[14].coords[0][0] * 10,
            easing: "Linear",
            frames: 60,
            next: "slideX15",
            onUpdate: function(value) {
                this.setPosition(value, this.getPosition().y);
            },
            onComplete: function () {
            }
        },
        slideX15: {
            from: lineData[14].coords[0][0] * 10,
            to: lineData[15].coords[0][0] * 10,
            easing: "Linear",
            frames: 60,
            next: "slideX16",
            onUpdate: function(value) {
                this.setPosition(value, this.getPosition().y);
            },
            onComplete: function () {
                var node = createNode(this.getPosition().x, this.getPosition().y, num, 15);
                var label = createLabel(this.getPosition().x, this.getPosition().y, 11);
                createEdge(label, node);
            }
        },
        slideX16: {
            from: lineData[15].coords[0][0] * 10,
            to: lineData[16].coords[0][0] * 10,
            easing: "Linear",
            frames: 60,
            next: "slideX17",
            onUpdate: function(value) {
                this.setPosition(value, this.getPosition().y);
            },
            onComplete: function () {
            }
        },
        slideX17: {
            from: lineData[16].coords[0][0] * 10,
            to: lineData[17].coords[0][0] * 10,
            easing: "Linear",
            frames: 60,
            onUpdate: function(value) {
                this.setPosition(value, this.getPosition().y);
            },
            onComplete: function() {
                var node = createNode(this.getPosition().x, this.getPosition().y, num, 17);
                var label = createLabel(this.getPosition().x, this.getPosition().y, 12);
                createEdge(label, node);
                this.s('2d.visible', false);
                this.setAnimation(null);
            }
        },
        slideY0: {
            from: lineData[0].coords[0][1] * -10,
            to: lineData[0].coords[0][1] * -10,
            easing: "Linear",
            frames: 60,
            next: "slideY1",
            onUpdate: function(value) {
                this.setPosition(this.getPosition().x, value);
            }
        },
        slideY1: {
            from: lineData[0].coords[0][1] * -10,
            to: lineData[1].coords[0][1] * -10,
            easing: "Linear",
            frames: 60,
            next: "slideY2",
            onUpdate: function(value) {
                this.setPosition(this.getPosition().x, value);
            }
        },
        slideY2: {
            from: lineData[1].coords[0][1] * -10,
            to: lineData[2].coords[0][1] * -10,
            easing: "Linear",
            frames: 60,
            next: "slideY3",
            onUpdate: function(value) {
                this.setPosition(this.getPosition().x, value);
            }
        },
        slideY3: {
            from: lineData[2].coords[0][1] * -10,
            to: lineData[3].coords[0][1] * -10,
            easing: "Linear",
            frames: 60,
            next: "slideY4",
            onUpdate: function(value) {
                this.setPosition(this.getPosition().x, value);
            }
        },
        slideY4: {
            from: lineData[3].coords[0][1] * -10,
            to: lineData[4].coords[0][1] * -10,
            easing: "Linear",
            frames: 60,
            next: "slideY5",
            onUpdate: function(value) {
                this.setPosition(this.getPosition().x, value);
            }
        },
        slideY5: {
            from: lineData[4].coords[0][1] * -10,
            to: lineData[5].coords[0][1] * -10,
            easing: "Linear",
            frames: 60,
            next: "slideY6",
            onUpdate: function(value) {
                this.setPosition(this.getPosition().x, value);
            }
        },
        slideY6: {
            from: lineData[5].coords[0][1] * -10,
            to: lineData[6].coords[0][1] * -10,
            easing: "Linear",
            frames: 60,
            next: "slideY7",
            onUpdate: function(value) {
                this.setPosition(this.getPosition().x, value);
            }
        },
        slideY7: {
            from: lineData[6].coords[0][1] * -10,
            to: lineData[7].coords[0][1] * -10,
            easing: "Linear",
            frames: 60,
            next: "slideY8",
            onUpdate: function(value) {
                this.setPosition(this.getPosition().x, value);
            }
        },
        slideY8: {
            from: lineData[7].coords[0][1] * -10,
            to: lineData[8].coords[0][1] * -10,
            easing: "Linear",
            frames: 60,
            next: "slideY9",
            onUpdate: function(value) {
                this.setPosition(this.getPosition().x, value);
            }
        },
        slideY9: {
            from: lineData[8].coords[0][1] * -10,
            to: lineData[9].coords[0][1] * -10,
            easing: "Linear",
            frames: 60,
            next: "slideY10",
            onUpdate: function(value) {
                this.setPosition(this.getPosition().x, value);
            }
        },
        slideY10: {
            from: lineData[9].coords[0][1] * -10,
            to: lineData[10].coords[0][1] * -10,
            easing: "Linear",
            frames: 60,
            next: "slideY11",
            onUpdate: function(value) {
                this.setPosition(this.getPosition().x, value);
            }
        },
        slideY11: {
            from: lineData[10].coords[0][1] * -10,
            to: lineData[11].coords[0][1] * -10,
            easing: "Linear",
            frames: 60,
            next: "slideY12",
            onUpdate: function(value) {
                this.setPosition(this.getPosition().x, value);
            }
        },
        slideY12: {
            from: lineData[11].coords[0][1] * -10,
            to: lineData[12].coords[0][1] * -10,
            easing: "Linear",
            frames: 60,
            next: "slideY13",
            onUpdate: function(value) {
                this.setPosition(this.getPosition().x, value);
            }
        },
        slideY13: {
            from: lineData[12].coords[0][1] * -10,
            to: lineData[13].coords[0][1] * -10,
            easing: "Linear",
            frames: 60,
            next: "slideY14",
            onUpdate: function(value) {
                this.setPosition(this.getPosition().x, value);
            }
        },
        slideY14: {
            from: lineData[13].coords[0][1] * -10,
            to: lineData[14].coords[0][1] * -10,
            easing: "Linear",
            frames: 60,
            next: "slideY15",
            onUpdate: function(value) {
                this.setPosition(this.getPosition().x, value);
            }
        },
        slideY15: {
            from: lineData[14].coords[0][1] * -10,
            to: lineData[15].coords[0][1] * -10,
            easing: "Linear",
            frames: 60,
            next: "slideY16",
            onUpdate: function(value) {
                this.setPosition(this.getPosition().x, value);
            }
        },
        slideY16: {
            from: lineData[15].coords[0][1] * -10,
            to: lineData[16].coords[0][1] * -10,
            easing: "Linear",
            frames: 60,
            next: "slideY17",
            onUpdate: function(value) {
                this.setPosition(this.getPosition().x, value);
            }
        },
        slideY17: {
            from: lineData[16].coords[0][1] * -10,
            to: lineData[17].coords[0][1] * -10,
            easing: "Linear",
            frames: 60,
            onUpdate: function(value) {
                this.setPosition(this.getPosition().x, value);
            },
            onComplete: function(value) {
                this.setAnimation(null);
            }
        },
        start: ["slideX0", "slideY0"]
    });
    dataModel.add(train);
    return train;
}

function trainAnimation2(lineData, lineName, num) {
    var pi = 3.1415926;
    var train = new ht.Node();
    train.setTag(lineName);
    train.setImage( 'images/mto-train2.png');
    train.setLayer('top');
    train.setSize(19*2.5, 50*2.5);
    train.setPosition(lineData[0].coords[0][0] * 10, lineData[0].coords[0][1] * -10);
    train.setAnimation({
        slideX0: {
            from: lineData[0].coords[0][0] * 10,
            to: lineData[0].coords[0][0] * 10,
            easing: "Linear",
            frames: 60,
            next: "slideX1",
            onUpdate: function(value) {
                this.setPosition(value, this.getPosition().y);
            },
            onComplete: function () {
                var node = createNode(this.getPosition().x, this.getPosition().y, num, 0);
                var label = createLabel(this.getPosition().x, this.getPosition().y, 21);
                createEdge(label, node);
            }
        },
        slideX1: {
            from: lineData[0].coords[0][0] * 10,
            to: lineData[1].coords[0][0] * 10,
            easing: "Linear",
            frames: 60,
            next: "slideX2",
            onUpdate: function(value) {
                this.setPosition(value, this.getPosition().y);
            },
            onComplete: function () {
                createNode(this.getPosition().x, this.getPosition().y, num, 1);
            }
        },
        slideX2: {
            from: lineData[1].coords[0][0] * 10,
            to: lineData[2].coords[0][0] * 10,
            easing: "Linear",
            frames: 60,
            next: "slideX3",
            onUpdate: function(value) {
                this.setPosition(value, this.getPosition().y);
            },
            onComplete: function () {
                //弧度=角度*PI/180
                this.setRotation(pi * 45 / 180);
                createNode(this.getPosition().x, this.getPosition().y, num, 2);
            }
        },
        slideX3: {
            from: lineData[2].coords[0][0] * 10,
            to: lineData[3].coords[0][0] * 10,
            easing: "Linear",
            frames: 60,
            next: "slideX4",
            onUpdate: function(value) {
                this.setPosition(value, this.getPosition().y);
            },
            onComplete: function () {
                createNode(this.getPosition().x, this.getPosition().y, num, 3);
            }
        },
        slideX4: {
            from: lineData[3].coords[0][0] * 10,
            to: lineData[4].coords[0][0] * 10,
            easing: "Linear",
            frames: 60,
            next: "slideX5",
            onUpdate: function(value) {
                this.setPosition(value, this.getPosition().y);
            },
            onComplete:function () {
                var node = createNode(this.getPosition().x, this.getPosition().y, num, 4);
                var label = createLabel(this.getPosition().x, this.getPosition().y, 22);
                createEdge(label, node);
            }
        },
        slideX5: {
            from: lineData[4].coords[0][0] * 10,
            to: lineData[5].coords[0][0] * 10,
            easing: "Linear",
            frames: 60,
            next: "slideX6",
            onUpdate: function(value) {
                this.setPosition(value, this.getPosition().y);
            },
            onComplete: function () {
                createNode(this.getPosition().x, this.getPosition().y, num, 5);
                //弧度=角度*PI/180
                this.setRotation(pi * 0 / 180);
            }
        },
        slideX6: {
            from: lineData[5].coords[0][0] * 10,
            to: lineData[6].coords[0][0] * 10,
            easing: "Linear",
            frames: 60,
            next: "slideX7",
            onUpdate: function(value) {
                this.setPosition(value, this.getPosition().y);
            },
            onComplete: function () {
                createNode(this.getPosition().x, this.getPosition().y, num, 6);
                //弧度=角度*PI/180
                this.setRotation(pi * 10 / 180);
            }
        },
        slideX7: {
            from: lineData[6].coords[0][0] * 10,
            to: lineData[7].coords[0][0] * 10,
            easing: "Linear",
            frames: 60,
            next: "slideX8",
            onUpdate: function(value) {
                this.setPosition(value, this.getPosition().y);
            },
            onComplete: function () {
                createNode(this.getPosition().x, this.getPosition().y, num, 7);
                //弧度=角度*PI/180
                this.setRotation(pi * 45 / 180);
            }
        },
        slideX8: {
            from: lineData[7].coords[0][0] * 10,
            to: lineData[8].coords[0][0] * 10,
            easing: "Linear",
            frames: 60,
            next: "slideX9",
            onUpdate: function(value) {
                this.setPosition(value, this.getPosition().y);
            },
            onComplete: function () {
                createNode(this.getPosition().x, this.getPosition().y, num, 8);
                //弧度=角度*PI/180
                this.setRotation(pi * 0 / 180);
            }
        },
        slideX9: {
            from: lineData[8].coords[0][0] * 10,
            to: lineData[9].coords[0][0] * 10,
            easing: "Linear",
            frames: 60,
            next: "slideX10",
            onUpdate: function(value) {
                this.setPosition(value, this.getPosition().y);
            },
            onComplete: function () {
                //弧度=角度*PI/180
                this.setRotation(pi * 45 / 180);
            }
        },
        slideX10: {
            from: lineData[9].coords[0][0] * 10,
            to: lineData[10].coords[0][0] * 10,
            easing: "Linear",
            frames: 60,
            next: "slideX11",
            onUpdate: function(value) {
                this.setPosition(value, this.getPosition().y);
            },
            onComplete: function () {
                createNode(this.getPosition().x, this.getPosition().y, num, 10);
                //弧度=角度*PI/180
                this.setRotation(pi * 90 / 180);
            }
        },
        slideX11: {
            from: lineData[10].coords[0][0] * 10,
            to: lineData[11].coords[0][0] * 10,
            easing: "Linear",
            frames: 60,
            onUpdate: function(value) {
                this.setPosition(value, this.getPosition().y);
            },
            onComplete: function () {
                var node = createNode(this.getPosition().x, this.getPosition().y, num, 11);
                var label = createLabel(this.getPosition().x, this.getPosition().y, 23);
                createEdge(label, node);
                this.s('2d.visible', false);
            }
        },
        slideY0: {
            from: lineData[0].coords[0][1] * -10,
            to: lineData[0].coords[0][1] * -10,
            easing: "Linear",
            frames: 60,
            next: "slideY1",
            onUpdate: function(value) {
                this.setPosition(this.getPosition().x, value);
            }
        },
        slideY1: {
            from: lineData[0].coords[0][1] * -10,
            to: lineData[1].coords[0][1] * -10,
            easing: "Linear",
            frames: 60,
            next: "slideY2",
            onUpdate: function(value) {
                this.setPosition(this.getPosition().x, value);
            }
        },
        slideY2: {
            from: lineData[1].coords[0][1] * -10,
            to: lineData[2].coords[0][1] * -10,
            easing: "Linear",
            frames: 60,
            next: "slideY3",
            onUpdate: function(value) {
                this.setPosition(this.getPosition().x, value);
            }
        },
        slideY3: {
            from: lineData[2].coords[0][1] * -10,
            to: lineData[3].coords[0][1] * -10,
            easing: "Linear",
            frames: 60,
            next: "slideY4",
            onUpdate: function(value) {
                this.setPosition(this.getPosition().x, value);
            }
        },
        slideY4: {
            from: lineData[3].coords[0][1] * -10,
            to: lineData[4].coords[0][1] * -10,
            easing: "Linear",
            frames: 60,
            next: "slideY5",
            onUpdate: function(value) {
                this.setPosition(this.getPosition().x, value);
            }
        },
        slideY5: {
            from: lineData[4].coords[0][1] * -10,
            to: lineData[5].coords[0][1] * -10,
            easing: "Linear",
            frames: 60,
            next: "slideY6",
            onUpdate: function(value) {
                this.setPosition(this.getPosition().x, value);
            }
        },
        slideY6: {
            from: lineData[5].coords[0][1] * -10,
            to: lineData[6].coords[0][1] * -10,
            easing: "Linear",
            frames: 60,
            next: "slideY7",
            onUpdate: function(value) {
                this.setPosition(this.getPosition().x, value);
            }
        },
        slideY7: {
            from: lineData[6].coords[0][1] * -10,
            to: lineData[7].coords[0][1] * -10,
            easing: "Linear",
            frames: 60,
            next: "slideY8",
            onUpdate: function(value) {
                this.setPosition(this.getPosition().x, value);
            }
        },
        slideY8: {
            from: lineData[7].coords[0][1] * -10,
            to: lineData[8].coords[0][1] * -10,
            easing: "Linear",
            frames: 60,
            next: "slideY9",
            onUpdate: function(value) {
                this.setPosition(this.getPosition().x, value);
            }
        },
        slideY9: {
            from: lineData[8].coords[0][1] * -10,
            to: lineData[9].coords[0][1] * -10,
            easing: "Linear",
            frames: 60,
            next: "slideY10",
            onUpdate: function(value) {
                this.setPosition(this.getPosition().x, value);
            }
        },
        slideY10: {
            from: lineData[9].coords[0][1] * -10,
            to: lineData[10].coords[0][1] * -10,
            easing: "Linear",
            frames: 60,
            next: "slideY11",
            onUpdate: function(value) {
                this.setPosition(this.getPosition().x, value);
            }
        },
        slideY11: {
            from: lineData[11].coords[0][1] * -10,
            to: lineData[11].coords[0][1] * -10,
            easing: "Linear",
            frames: 60,
            onUpdate: function(value) {
                this.setPosition(this.getPosition().x, value);
            }
        },
        start: ["slideX0", "slideY0"]
    });
    dataModel.add(train);
    return train;
}

function trainAnimation3(lineData, lineName, num) {
    var pi = 3.1415926;
    var train = new ht.Node();
    train.setTag(lineName);
    train.setImage( 'images/mto-train2.png');
    train.setLayer('top');
    train.setSize(19*2.5, 50*2.5);
    train.setPosition(lineData[0].coords[0][0] * 10, lineData[0].coords[0][1] * -10);
    train.setAnimation({
        slideX0: {
            from: lineData[0].coords[0][0] * 10,
            to: lineData[0].coords[0][0] * 10,
            easing: "Linear",
            frames: 60,
            next: "slideX1",
            onUpdate: function(value) {
                this.setPosition(value, this.getPosition().y);
            },
            onComplete: function () {
                var node = createNode(this.getPosition().x, this.getPosition().y, num, 7);
                var label = createLabel(this.getPosition().x, this.getPosition().y, 31);
                createEdge(label, node);
            }
        },
        slideX1: {
            from: lineData[0].coords[0][0] * 10,
            to: lineData[1].coords[0][0] * 10,
            easing: "Linear",
            frames: 60,
            next: "slideX2",
            onUpdate: function(value) {
                this.setPosition(value, this.getPosition().y);
            },
            onComplete: function () {
                createNode(this.getPosition().x, this.getPosition().y, num, 6);
            }
        },
        slideX2: {
            from: lineData[1].coords[0][0] * 10,
            to: lineData[2].coords[0][0] * 10,
            easing: "Linear",
            frames: 60,
            next: "slideX3",
            onUpdate: function(value) {
                this.setPosition(value, this.getPosition().y);
            },
            onComplete: function () {
                createNode(this.getPosition().x, this.getPosition().y, num, 5);
            }
        },
        slideX3: {
            from: lineData[2].coords[0][0] * 10,
            to: lineData[3].coords[0][0] * 10,
            easing: "Linear",
            frames: 60,
            next: "slideX4",
            onUpdate: function(value) {
                this.setPosition(value, this.getPosition().y);
            },
            onComplete: function () {
                var node = createNode(this.getPosition().x, this.getPosition().y, num, 4);
                var label = createLabel(this.getPosition().x, this.getPosition().y, 32);
                createEdge(label, node);
            }
        },
        slideX4: {
            from: lineData[3].coords[0][0] * 10,
            to: lineData[4].coords[0][0] * 10,
            easing: "Linear",
            frames: 60,
            next: "slideX5",
            onUpdate: function(value) {
                this.setPosition(value, this.getPosition().y);
            },
            onComplete: function () {
                createNode(this.getPosition().x, this.getPosition().y, num, 3);
                //弧度=角度*PI/180
                this.setRotation(pi * -90 / 180);
            }
        },
        slideX5: {
            from: lineData[4].coords[0][0] * 10,
            to: lineData[5].coords[0][0] * 10,
            easing: "Linear",
            frames: 60,
            next: "slideX6",
            onUpdate: function(value) {
                this.setPosition(value, this.getPosition().y);
            },
            onComplete: function () {
                var node = createNode(this.getPosition().x, this.getPosition().y, num, 2);
                var label = createLabel(this.getPosition().x, this.getPosition().y, 33);
                createEdge(label, node);
                //弧度=角度*PI/180
                this.setRotation(pi * 0 / 180);
            }
        },
        slideX6: {
            from: lineData[5].coords[0][0] * 10,
            to: lineData[6].coords[0][0] * 10,
            easing: "Linear",
            frames: 60,
            next: "slideX7",
            onUpdate: function(value) {
                this.setPosition(value, this.getPosition().y);
            },
            onComplete: function () {
                createNode(this.getPosition().x, this.getPosition().y, num, 1);
                //弧度=角度*PI/180
                this.setRotation(pi * -90 / 180);
            }
        },
        slideX7: {
            from: lineData[6].coords[0][0] * 10,
            to: lineData[7].coords[0][0] * 10,
            easing: "Linear",
            frames: 60,
            onUpdate: function(value) {
                this.setPosition(value, this.getPosition().y);
            },
            onComplete: function () {
                var node = createNode(this.getPosition().x, this.getPosition().y, num, 0);
                var label = createLabel(this.getPosition().x, this.getPosition().y, 34);
                createEdge(label, node);
                this.s('2d.visible', false);
            }
        },
        slideY0: {
            from: lineData[0].coords[1][1] * -10,
            to: lineData[0].coords[1][1] * -10,
            easing: "Linear",
            frames: 60,
            next: "slideY1",
            onUpdate: function(value) {
                this.setPosition(this.getPosition().x, value);
            }
        },
        slideY1: {
            from: lineData[0].coords[0][1] * -10,
            to: lineData[1].coords[0][1] * -10,
            easing: "Linear",
            frames: 60,
            next: "slideY2",
            onUpdate: function(value) {
                this.setPosition(this.getPosition().x, value);
            }
        },
        slideY2: {
            from: lineData[1].coords[0][1] * -10,
            to: lineData[2].coords[0][1] * -10,
            easing: "Linear",
            frames: 60,
            next: "slideY3",
            onUpdate: function(value) {
                this.setPosition(this.getPosition().x, value);
            }
        },
        slideY3: {
            from: lineData[2].coords[0][1] * -10,
            to: lineData[3].coords[0][1] * -10,
            easing: "Linear",
            frames: 60,
            next: "slideY4",
            onUpdate: function(value) {
                this.setPosition(this.getPosition().x, value);
            }
        },
        slideY4: {
            from: lineData[3].coords[0][1] * -10,
            to: lineData[4].coords[0][1] * -10,
            easing: "Linear",
            frames: 60,
            next: "slideY5",
            onUpdate: function(value) {
                this.setPosition(this.getPosition().x, value);
            }
        },
        slideY5: {
            from: lineData[4].coords[0][1] * -10,
            to: lineData[5].coords[0][1] * -10,
            easing: "Linear",
            frames: 60,
            next: "slideY6",
            onUpdate: function(value) {
                this.setPosition(this.getPosition().x, value);
            }
        },
        slideY6: {
            from: lineData[5].coords[0][1] * -10,
            to: lineData[6].coords[0][1] * -10,
            easing: "Linear",
            frames: 60,
            next: "slideY7",
            onUpdate: function(value) {
                this.setPosition(this.getPosition().x, value);
            }
        },
        slideY7: {
            from: lineData[6].coords[0][1] * -10,
            to: lineData[7].coords[0][1] * -10,
            easing: "Linear",
            frames: 60,
            onUpdate: function(value) {
                this.setPosition(this.getPosition().x, value);
            }
        },
        start: ["slideX0", "slideY0"]
    });
    dataModel.add(train);
    return train;
}

// 广告form一
function createAd1(){
    var ad1 = new ht.widget.FormPane();
    ad1.setWidth(230);
    ad1.setHeight(136);
    var view = ad1.getView();
    view.id = 'ad1';
    document.body.appendChild(view);
    // 加一些样式
    view.style.top = '380px';
    view.style.left = '55px';
    view.style.background = 'url(images/mto-click-1.png) center center no-repeat';
    view.style.display = 'none';
    document.getElementById(view.id).addEventListener('click', function () {
        window.location.href="https://www.baidu.com";
    });

}
// 广告form二
function createAd2(){
    var ad2 = new ht.widget.FormPane();
    ad2.setWidth(230);
    ad2.setHeight(136);
    var view = ad2.getView();
    view.id = 'ad2';
    document.body.appendChild(view);
    // 加一些样式
    view.style.top = '530px';
    view.style.left = '55px';
    view.style.background = 'url(images/mto-click-2.png) center center no-repeat';
    view.style.display = 'none';
    document.getElementById(view.id).addEventListener('click', function () {
        window.location.href="https://www.baidu.com";
    })

}
// 广告form三
function createAd3(){
    var ad3 = new ht.widget.FormPane();
    ad3.setWidth(390);
    ad3.setHeight(255);
    var view = ad3.getView();
    view.id = 'ad3';
    document.body.appendChild(view);
    // 加一些样式
    view.style.bottom = '36px';
    view.style.right = '36px';
    view.style.background = 'url(images/mto-click-3.png) center center no-repeat';
    document.getElementById(view.id).addEventListener('click', function () {
        window.location.href="https://www.baidu.com";
    })
}
// 广告form四
function  createAd4() {
    var ad4 = new ht.widget.FormPane();

    ad4.setWidth(320);
    ad4.setHeight(270);
    var view = ad4.getView();
    view.id = 'ad4';
    document.body.appendChild(view);

    // 加一些样式
    view.style.top = '80px';
    view.style.left = '15px';
    view.style.background = 'url(images/mto-click-4.png) center center no-repeat';

    //点击切换
    var clickStatus = true;
    document.getElementById(view.id).addEventListener('click', function () {
        if(clickStatus){
            document.getElementById('ad1').style.display='block';
            document.getElementById('ad2').style.display='block';
            clickStatus = !clickStatus;
        } else {
            document.getElementById('ad1').style.display='none';
            document.getElementById('ad2').style.display='none';
            clickStatus = !clickStatus;
        }
    })
}

function createItem(){
    var borderPane = new ht.widget.BorderPane();
    var view = borderPane.getView();
    view.id = 'borderPane1';
    document.body.appendChild(view);
    window.addEventListener('resize', function (e) {
        borderPane.invalidate();
    }, false);


    borderPane.setCenterView(createDiv('#F4F4F4', 'center'));
}

function createDiv(background, text) {
    var div = document.createElement('div');
    div.style.position = 'absolute';
    div.style.background = background;
    if(text) div.innerHTML = text;
    return div;
}



