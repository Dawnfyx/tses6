const toolkit = require("./toolkit");

const matrix = toolkit.makeMatrix();

console.log(matrix);
console.log("**************************************************");
//九宫格 测试代码
// const a = toolkit.makeMatrix();
// a[0][1] = 2;
// console.log(a);

//洗牌算法 测试代码
const  a = Array.from({ length: 9}, (v, i) => i);
console.log(a);
console.log(toolkit.shuffle(a));


