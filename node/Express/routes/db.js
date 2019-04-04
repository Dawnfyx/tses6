
const mssql = require('mssql');
const db = {};
const config = {
    user: 'sa', //用户名
    password: '123456', //密码
    server: 'localhost', //服务器地址
    database: 'cfineContract', //数据库
    port: 1433, //端口号，默认为1433
    options: {
        encrypt: true // Use this if you're on Windows Azure
    },
    pool: {
        min: 0,
        max: 10,
        idleTimeoutMillis: 3000
    }
};

//执行sql,返回数据.
db.sql = function (sql, callBack) {

    var ConnectionPool = new mssql.ConnectionPool(config, function (err) {
        if (err) {
            console.log('db_config', err);
            return;
        }

        var ps = new mssql.PreparedStatement(ConnectionPool);

        ps.prepare(sql, function(err, result){
            if(err){
                console.log('db_prepare', err);
                return;
            }

            ps.execute('', function (err, result) {
                if (err){
                    console.log('db_execute', err);
                    return;
                }

                ps.unprepare(function (err) {
                    if (err){
                        console.log('db_unprepare', err);
                        callback(err, null);
                        return;
                    }
                    callBack(err, result);
                });
            });
        });
    });
};

module.exports = db;
