"use strict";
exports.__esModule = true;
/**
 * Created by fangyaxi on 2019/2/18.
 */

var sql = require('mssql');
var express = require("express");
var path = require("path");
var ws_1 = require("ws");
var app = express();

//连接方式1："mssql://用户名:密码@ip地址（无需端口号）/SqlServer名/数据库名称"
//连接方式2："mssql://用户名:密码@ip地址:1433(默认端口号)/数据库名称"
sql.connect("mssql://sa:123456@localhost:1433/cfineContract").then(function () {
    //select
    var sqlSelect = 'select * from contract order by id desc';
    // Query
    new sql.Request().query(sqlSelect).then(function (recordset) {

        app.use('/', express.static(path.join(__dirname, '..', 'client')));
        app.get('/api/contracts', function (request, response) {
            var result = contracts;
            response.json(result);
        });
        app.get('/api/contract/:id', function (request, response) {
            response.json(contracts.find(function (contract) { return contract.id == request.params.id; }));
        });
        app.get('/api/contract/:id/email', function (request, response) {
            response.json(contracts.filter(function (contract) { return contract.id == request.params.id; }));
        });
        app.post('/api/doadd', function (request, response) {
            console.log('request===' + request.get("id"));
            console.log('response===' + response.get("id"));
            response.json({ "msg": '服务器收到 post成功' });
        });
        var server = app.listen(8000, "localhost", function () {
            console.log("服务器已启动，地址是: http://localhost:8000");
        });
        var subscriptions = new Set();
        var wsServer = new ws_1.Server({ port: 8085 });
        wsServer.on("connection", function (websocket) {
            subscriptions.add(websocket);
        });
        var messageCount = 1;
        setInterval(function () {
            subscriptions.forEach(function (ws) {
                if (ws.readyState === 1) {
                    ws.send(JSON.stringify({ messageCount: messageCount++ }));
                }
                else {
                    subscriptions["delete"](ws);
                }
            });
        }, 2000);

        var Contract = /** @class */ (function () {
            function Contract(id, company, perMain, tpyContract, numContract, namClient, namProject, monAll, monReceipt, monEnd, tpyReceipt, invStatus, invTime, monTransferMore, texContract, datExpiration, monExpiration, datRemain, tbeRemark, tbeStatus) {
                this.id = id;
                this.company = company;
                this.perMain = perMain;
                this.tpyContract = tpyContract;
                this.numContract = numContract;
                this.namClient = namClient;
                this.namProject = namProject;
                this.monAll = monAll;
                this.monReceipt = monReceipt;
                this.monEnd = monEnd;
                this.tpyReceipt = tpyReceipt;
                this.invStatus = invStatus;
                this.invTime = invTime;
                this.monTransferMore = monTransferMore;
                this.texContract = texContract;
                this.datExpiration = datExpiration;
                this.monExpiration = monExpiration;
                this.datRemain = datRemain;
                this.tbeRemark = tbeRemark;
                this.tbeStatus = tbeStatus;
            }
            return Contract;
        }());
        exports.Contract = Contract;
        var contracts = new Array();

        for (var i = 0; i < recordset.recordset.length; i++) {
            var data = recordset.recordset[i];
            // console.log("********************************************************************");
            // console.log(data);
            contracts.unshift(data);
            // console.log('sqlDate===' + contracts);
        }

    })["catch"](function (err) {
        console.log(err);
    });
    // Stored Procedure
})["catch"](function (err) {
    console.log(err);
});




