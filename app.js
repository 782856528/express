var createError = require('http-errors');
var express = require('express');
var path = require('path');
const resextra = require("./utils/unifyResFormat")
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const bodyParser = require('body-parser')
var indexRouter = require('./routes/index');
var jwt = require('jsonwebtoken');
var secretkey = 'secretkey';
var app = express();

app.all("*", function(req, res, next) {
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});
app.use(function(req,res,next){
  if(req.url !='/manage/login' && req.url !='/manage/register'&&req.url.indexOf("/images/")){
      //token可能存在post请求和get请求
      let token = req.headers.authorization;
      jwt.verify(token,secretkey,function(err,decode){
         if(err){
             res.json({
                 message: 'token非法',
                 resultCode: '403'
             })
         }else{
             next();
         }
      })
  }else{
      next();
  }
})
app.use(resextra)
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');//设置模板引擎为ejs
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(logger('dev'));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
