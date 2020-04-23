var express=require('express');
var router=express.Router();
var sql=require('../db/sql');

const path = require('path');
var fs=require('fs');
//引入mysql链接
var db=require('../db/db')
const jwt = require('jsonwebtoken');
var secretkey = 'secretkey';
const inhert=function(req,res){
    db.query(`select * from mysql.content order by sort desc`,function(err,insult){
        if(err) {
            res.send({
                status:1,
                data:[],
                message:"失败"
            })
        };
        res.send({
            status:0,
            data:insult,
            message:"处理成功"
        })
        return 
    })
}
const add=function(req,res){
          var param=req.body;
              db.query(`insert into mysql.content (title,type_id,content,sort,ishot,remark) values ('${param.title}',${param.type_id},'${param.content}',${param.sort},${param.ishot},'${param.remark}')`,function(err,insult){
                if(err) {
                    res.send({
                        status:1,
                        data:err,
                        message:"失败"
                    })
                }else{
                   
                    res.send({
                        status:0,
                        data:[],
                        message:"添加成功"
                    })
                }
            })
              return     
}
const edit=function(req,res){
        var param=req.body;
    db.query(`update mysql.content set title='${param.title}',sort=${param.sort},remark='${param.remark}',ishot=${param.ishot},content='${param.content}',type_id=${param.type_id} where id=${param.id}`,function(err,insult){
        if(err) {
            res.send({
                status:1,
                data:err,
                message:"失败"
            })
        }else{
            res.send({
                status:0,
                data:[],
                message:"修改成功"
            })
        }
    })
}
const del=function(req,res){
    db.query(`delete from  mysql.content where id=${req.body.id}`,function(err,insult){
        if(err) {
            res.send({
                status:1,
                data:[],
                message:"失败"
            })
        }else{
            res.send({
                status:0,
                data:[],
                message:"删除成功"
            })
        }
    })
}
exports.inhert=inhert
exports.add=add
exports.edit=edit
exports.del=del
// exports.login=login
// exports.register=register
