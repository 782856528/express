var express=require('express');
var router=express.Router();
var sql=require('../db/sql');

const path = require('path');
var fs=require('fs');
//引入mysql链接
var db=require('../db/db')
const jwt = require('jsonwebtoken');
var secretkey = 'secretkey';
const login=function(req,res){
    db.query(sql.login,[req.body.account,req.body.password],function(err,insult){
        if(err){
            throw err
        }else if ( insult.length == 0) {
            res.send({
                status:1,
                type:"error",
                message:"账户和密码错误" 
            })  
        } else {
            var token = jwt.sign({account:req.body.account},secretkey,{expiresIn: 60*60*24});
            res.send({
                status:0,
                token:token,
                message:"登陆成功" 
            })
        }   
    })
}
const register=function(req,res){
    if(req.body.account!=""&&req.body.password!=""){
        db.query(sql.register,[req.body.account,req.body.password],function(err,insult){
            if(err){
                console.log('err message:', err)
                return
            }else if ( insult.length == 0) {
                res.send({
                    status:0,
                    type:"error",
                    message:"注册失败" 
                })  
            } else {
                res.send({
                    status:0,
                    type:"success",
                    message:"注册成功" 
                })
            }   
        })
    }else{
        res.send({
            status:0,
            type:"error",
            message:"账号或密码不能为空" 
        })
    }
    
    
}
const inhert=function(req,res){
    db.query(`select * from mysql.wml`,function(err,insult){
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
              db.query(sql.add,[param.name, param.age, param.sex,param.file],function(err,insult){
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
const updata=function(req,res){
        var param=req.body;
    db.query(sql.updata,[param.name,param.sex,param.age,param.file,param.id],function(err,insult){
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
    db.query(sql.delete,[req.body.id],function(err,insult){
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
exports.updata=updata
exports.del=del
exports.login=login
exports.register=register
