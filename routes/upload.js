var express=require('express');
var router=express.Router();

var sql=require('../db/sql');
//引入mysql链接
var db=require('../db/db')
const path = require('path');
var fs=require('fs');
const upload=function(req,res){
    var param=req.body;
    var imges = req.files.file;
          fs.readFile(imges.path, (err, data) => {
          var imgesori = imges.originalFilename; // 图片名称
          var radname = Date.now()+parseInt(Math.random()*999)// 赋给图片的名称用时间戳+随机数获取
          var oriname = imgesori.lastIndexOf(".");
          var hzm = imgesori.substring(oriname,imgesori.length) // 图片后缀名
          var pic = radname+hzm // 拼接处一个完整的图片名称
          var picPath = "http://192.168.1.3:3000/images/"+pic
          fs.writeFile(path.join(__dirname,'../public/images',pic),data,'utf-8',(err) =>{
            if(err){
               console.log(err,"图片写入失败")
              }
              db.query(sql.upload,[picPath],function(err,insult){
                if(err) {
                    res.send({
                        status:1,
                        data:err,
                        message:"失败"
                    })
                }else{
                    res.send({
                        status:0,
                        imgurl:picPath,
                        message:"上传成功"
                    })
                }
            })
              return
            })  })
 
}
exports.upload=upload