var express = require('express');
var router = express.Router();
var  selectwml=require('../routes/selectwml');
var  category=require('../routes/category');
var  uploads=require('../routes/upload');
var  content=require('../routes/content');
var multer = require('multer'); 
var upload=multer({ dest: 'public/images/' })
const multipart = require('connect-multiparty')
const multipartyMiddleware = multipart()
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
// 设置路由
router.get('/manage/search',selectwml.inhert);
router.post('/manage/add',selectwml.add);
router.post('/manage/updata',selectwml.updata);
router.post('/manage/del',selectwml.del);
router.post('/manage/login',selectwml.login);
router.post('/manage/register',selectwml.register);
router.post('/manage/upload',multipartyMiddleware,upload.single('logo'),uploads.upload);
// 分类
router.get('/manage/categoryList',category.inhert);
router.post('/manage/categoryAdd',category.add);
router.post('/manage/categoryEdit',category.edit);
router.post('/manage/categorydel',category.del);
//内容
router.get('/manage/contentList',content.inhert);
router.post('/manage/contentAdd',content.add);
router.post('/manage/contentEdit',content.edit);
router.post('/manage/contentdel',content.del);

module.exports = router;
