const toolkit = require("./toolkit");

class Grid{
    constructor(container){
        this._$container = container;
    }
    build(){
        const matrix = toolkit.makeMatrix();

        const rowGroupClasses = ["row_g_top", "row_g_middle", "row_g_bottom"];
        const colGroupClasses = ["col_g_left", "col_g_center", "col_g_right"];
        
        const $cells = matrix.map(rowValues => rowValues.map((cellValue, colIndex) => {
            return $("<span>")
                .addClass(colGroupClasses[colIndex % 3])
                .text(cellValue);
        }));

        const $divArray = $cells.map(($spanArray, rowIndex) => {
            return $("<div>")
                .addClass(rowGroupClasses[rowIndex % 3])
                .addClass("row")
                .append($spanArray);
        });

        this._$container.append($divArray);
    }
    layout(){
        // 修正 正方形格子
        const width = $("span:first", this._$container).width();
        $("span", this._$container)
        .height(width)
        .css({
            "line-height": `${width}px`,
            "font-size": width < 32 ? `${width / 2}px` : ""
        });
    }
}

const grid = new Grid($("#container"));
grid.build();
grid.layout();

console.log("**************************************************");
const matrix = toolkit.makeMatrix();
console.log(matrix);
console.log("**************************************************");

//九宫格 测试代码
// const a = toolkit.makeMatrix();
// a[0][1] = 2;
// console.log(a);

//洗牌算法 测试代码
// const  a = Array.from({ length: 9}, (v, i) => i);
// console.log(a);
// console.log(toolkit.shuffle(a));


