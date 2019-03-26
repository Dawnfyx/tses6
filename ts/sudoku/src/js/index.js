const Grid = require("./ui/grid");
const PopupNumbers = require("./ui/popupnumbers");

const grid = new Grid($("#container"));
grid.build();
grid.layout();

const popupNumbers = new PopupNumbers($("#popupNumbers"));
grid.bindPopup(popupNumbers);

$("#check").on("click", e => {
    if(grid.check()) {
        alert("成功");
    }
});

$("#reset").on("click", e => {
    grid.reset();
});
$("#clear").on("click", e => {
    grid.clear();
});

$("#rebuild").on("click", e => {
    grid.rebuild();
});


// console.log("**************************************************");
// const matrix = Toolkit.matrix.makeMatrix();
// console.log(matrix);
// console.log("**************************************************");

//九宫格 测试代码
// const a = toolkit.makeMatrix();
// a[0][1] = 2;
// console.log(a);

//洗牌算法 测试代码
// const  a = Array.from({ length: 9}, (v, i) => i);
// console.log(a);
// console.log(toolkit.shuffle(a));


