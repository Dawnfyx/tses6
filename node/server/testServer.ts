/**
 * Created by fangyaxi on 2019/2/18.
 */
import * as express from "express";
import * as path from 'path';
import {Server} from "ws";

const app = express();

app.use('/', express.static(path.join(__dirname, '..', 'client')))

app.get('/api/contracts', (request, response) => {
    let result = contracts;

    response.json(result);
});

app.get('/api/contract/:id', (request, response) => {
    response.json(contracts.find((contract) => contract.id == request.params.id));
});

app.get('/api/contract/:id/email', (request, response) => {
    response.json(contracts.filter((contract: Contract) => contract.id == request.params.id));
});

app.post('/api/doadd',(request, response) =>{
    console.log(request.body);
    response.json({"msg":'服务器收到 post成功'});
})

const server = app.listen(8000, "localhost", () => {
    console.log("服务器已启动，地址是: http://localhost:8000");
});

const subscriptions = new Set<any>();

const wsServer = new Server({port: 8085});
wsServer.on("connection", websocket => {
    subscriptions.add(websocket);
});

var messageCount = 1;

setInterval(() => {

    subscriptions.forEach(ws => {
        if(ws.readyState === 1) {
            ws.send(JSON.stringify({messageCount : messageCount++}))
        }else{
            subscriptions.delete(ws);
        }
    });

}, 2000);

var sql = require('mssql');
var sqlDate = null;

//连接方式1："mssql://用户名:密码@ip地址（无需端口号）/SqlServer名/数据库名称"
//连接方式2："mssql://用户名:密码@ip地址:1433(默认端口号)/数据库名称"
sql.connect("mssql://sa:123456@localhost:1433/cfineContract").then(function() {

    //select
    var sqlSelect = 'select * from contract';
    // Query
    new sql.Request().query(sqlSelect).then(function(recordset) {
        console.log(recordset);
        sqlDate = recordset;
        return sqlDate;
    }).catch(function(err) {
        console.log(err);
    });

    // Stored Procedure
}).catch(function(err) {
    console.log(err);
});

console.log(sqlDate);

export class Contract {
    constructor(
        public id: number,
        public company: string,
        public perMain: string,
        public tpyContract: string,
        public numContract: string,
        public namClient: string,
        public namProject: string,
        public monAll: string,
        public monReceipt: string,
        public monEnd: string,
        public tpyReceipt: string,
        public invStatus: string,
        public invTime: string,
        public monTransferMore: string,
        public texContract: string,
        public datExpiration: string,
        public monExpiration: string,
        public datRemain: string,
        public tbeRemark: string,
        public tbeStatus: string) { }
}

const contracts: Contract[] = [
    new Contract(1, '楚非', '吴杰、丁敏', '学校', 'CF2018-0001', '上海市现代职业技术学校', '中式面点教学资源建设公开招标项目', '111,111.00', '111,111.00', '0.00', '中国银行', '100%', '2019/1/17/15:16:53', '358000 （18.9.4）', '原件 2018/1/4', '5年', '3%（10740）', '2023/1/3', '', '1'),
    new Contract(2, '楚非', '李斌', '学校', 'CF2018-0001', '上海国际学校', '双语资源建设公开招标项目', '111,111.00', '111,111.00', '0.00', '中国银行', '100%', '2019/1/17/15:16:53', '358000 （18.9.4）', '原件 2018/1/4', '5年', '3%（10740）', '2023/1/3', '', '1'),
    new Contract(3, '楚非', '连佑军', '学校', 'CF2018-0001', '上海信息技术学校', '计算机科学技术', '111,111.00', '111,111.00', '0.00', '中国银行', '100%', '2019/1/17/15:16:53', '358000 （18.9.4）', '原件 2018/1/4', '5年', '3%（10740）', '2023/1/3', '', '1'),
    new Contract(4, '楚非', '吴杰、丁敏', '学校', 'CF2018-0001', '上海枫叶国际学校', '一二三', '111,111.00', '111,111.00', '0.00', '中国银行', '100%', '2019/1/17/15:16:53', '358000 （18.9.4）', '原件 2018/1/4', '5年', '3%（10521740）', '2023/1/3', '', '1')
];
