var express = require('express');
var router = express.Router();

var db = require("./db");

/**
 * 查询列表页
 */
router.get('/', function(req, res, next) {
    db.sql("select * from contract",
    function(err, result){
        if (err) {
            console.log('sql select',err);
            return;
        }
        // console.log('result===',result.recordset[1].perMain);
        // console.log('result===',result.recordset.length);
        res.render('users', { title: 'Express', result: result.recordset });
    });
});

/**
 * 添加用户
 */
router.get("/add", function(req, res){
    res.render("add");
});
router.post("/add",function(req, res){
    // res.send(req.body);
    var id = req.body.id;
    var company = req.body.company;
    var perMain = req.body.perMain;
    var tpyContract = req.body.tpyContract;
    var sqlWord= "insert into contract(id, company, perMain, tpyContract, numContract, namClient, namProject, monAll, monReceipt, monEnd, tpyReceipt, invStatus, invTime, monTransferMore, texContract, datExpiration, monExpiration, datRemain, tbeRemark, tbeStatus) " +
        "values('" + id + "', '" + company + "', '" + perMain + "', '" + tpyContract + "', 'CF2018-0001', '上海市现代职业技术学校', '中式面点教学资源建设公开招标项目', '111,111.00', '111,111.00', '0.00', '中国银行', '100%', '2019/1/17/15:16:53', '358000 （18.9.4）', '原件 2018/1/4', '5年', '3%（10740）', '2023/1/3', '', '1')";

    db.sql(sqlWord, function(err, result){
        if (err) {
            console.log('sql insert err',err);
            return;
        }
        res.redirect("/users");
    });
});

/**
 * 修改
 */
router.get("/toUpdate/:id",function(req,res){
    // res.send('Hello get update');

    var id = req.params.id;
    var sqlWord = "select * from contract where id = " + id;

    db.sql(sqlWord, function(err, result){
        if(err){
            res.send("修改页面跳转失败");
            return;
        }
        if(result.recordset == ""){
            res.send("没有这条信息");
            return;
        }
        res.render("update",{result: result.recordset});

    });
});
router.post("/update",function(req,res,next){
    // res.send('Hello post update');
    var id = req.body.id;
    var company = req.body.company;
    var perMain = req.body.perMain;
    var tpyContract = req.body.tpyContract;

    var sqlWord = "update contract set company = '"+ company +"',perMain = '"+ perMain +"',tpyContract = '"+ tpyContract +"' where id = " + id;

    db.sql(sqlWord,function(err, result){
        if(err){
            res.send("修改失败 " + err);
            return;
        }
        res.redirect("/users");
    });
});

/**
 * 删除用户
 */
router.get("/del/:id", function (req, res) {

    var id = req.params.id;

    db.sql("delete from contract where id = " + id, function(err,rows){
        if(err){
            res.send("删除失败"+err);
            return
        };
        res.redirect("/users");
    });
});


/**
 * 查询
 */
router.post("/search",function(req,res,next){

    var id = req.body.s_id;
    var company = req.body.s_company;
    var perMain = req.body.s_perMain;
    var tpyContract = req.body.s_tpyContract;

    var sqlWord = "select * from contract where 1=1";
    if(id){
        sqlWord += " and id = '" + id + "'";
    }
    if(company){
        sqlWord += " and company = '"+ company +"'";
    }
    if(perMain){
        sqlWord += " and perMain = '" + perMain + "'";
    }
    if(tpyContract){
        sqlWord += " and tpyContract = '" + tpyContract + "'";
    }

    db.sql(sqlWord, function(err, result){
        if(err){
            res.send("查询失败: "+err);
            return;
        }
        // res.render("users",{ title:"用户列表",datas:rows,s_name:name,s_age:age});
        res.render('users', { title: 'search', result: result.recordset});

    });
})

module.exports = router;
