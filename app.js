var koa = require("koa");//引用koa框架
var controller = require('koa-route');//引用koa-route中间件
var app = koa();

var views = require('co-views');//引用co-views中间件
var render = views('./view', {
    map: {html: 'ejs'}
});
//引用koa-static-server静态文件中间件
var koa_static = require('koa-static-server');
app.use(koa_static({
    rootDir: './static/',
    rootPath: '/static/',//访问文件的目录地址
    maxage: 0
//    过期时间（缓存）
}));
//测试koa连接
var service = require('./service/webAppService');
app.use(controller.get('/route_test', function*() {
    this.set('Cache-Control', 'no-cache');
    this.body = 'hello koa!';
}));
//测试/view目录下的文件引用，使用test.html模板绑定title_test数据
app.use(controller.get('/ejs_test', function*() {
    this.set('Cache-Control', 'no-cache');
    this.body = yield render('test', {title: 'title_test'});
}));
//todo 测试后端返回的数据
app.use(controller.get('/api_test', function*() {
    this.set('Cache-Control', 'no-cache');
    this.body = service.get_test_data();
}));
//todo 搜索线上数据
app.use(controller.get('/ajax/search', function*() {
    this.set('Cache-Control', 'no-cache');
    var querystring = require('querystring');
    var params = querystring.parse(this.req._parsedUrl.query);
    var start = params.start;
    var end = params.end;
    var keyword = params.keyword;
    this.body = yield service.get_search_data(start, end, keyword);
}));



//todo 访问书城首页
app.use(controller.get('/', function*() {
    this.set('Cache-Control', 'no-cache');
    this.body = yield render('index');
}));
//todo 访问搜索页面
app.use(controller.get('/search', function*() {
    this.set('Cache-Control', 'no-cache');
    this.body = yield render('search', {title: '搜索页面'});
}));
//todo 访问书籍详情
var querystring=require('querystring');
app.use(controller.get('/book', function*() {
    this.set('Cache-Control', 'no-cache');
    var params=querystring.parse(this.req._parsedUrl.query);
    var bookId=params.id;
    this.body = yield render('book',{nav:"书籍详情",bookId:bookId});
}));
//todo 访问男生页面
app.use(controller.get('/male', function*() {
    this.set('Cache-Control', 'no-cache');
    this.body = yield render('male',{title:'男生频道'});
}));
//todo 访问女生页面
app.use(controller.get('/female', function*() {
    this.set('Cache-Control', 'no-cache');
    this.body = yield render('female',{title:'女生频道'});
}));
//todo 访问排名页面
app.use(controller.get('/rank', function*() {
    this.set('Cache-Control', 'no-cache');
    this.body = yield render('rank',{title:'排名'});
}));
//todo 访问分类页面
app.use(controller.get('/category',function*(){
    this.set('Cache-Control','no-cache');
    this.body=yield render('category',{title:'分类'});
}));
//todo 阅读器页面
app.use(controller.get('/reader', function*() {
    this.set('Cache-Control', 'no-cache');
    this.body = yield render('reader');
}));
//todo 渲染章节数据
app.use(controller.get('/ajax/chapter', function*() {
    this.set('Cache-Control', 'no-cache');
    this.body = service.get_chapter_data();
}));

//todo 渲染首页数据
app.use(controller.get('/ajax/index', function*() {
    this.set('Cache-Control', 'no-cache');
    this.body = service.get_index_data();
}));
//todo 渲染排名数据
app.use(controller.get('/ajax/rank', function*() {
    this.set('Cache-Control', 'no-cache');
    this.body = service.get_rank_data();
}));
//todo 渲染分类数据
app.use(controller.get('/ajax/category', function*() {
    this.set('Cache-Control', 'no-cache');
    this.body = service.get_category_data();
}));
//todo 渲染书架数据
app.use(controller.get('/ajax/bookbacket', function*() {
    this.set('Cache-Control', 'no-cache');
    this.body = service.get_bookbacket_data();
}));
//todo 渲染女生数据
app.use(controller.get('/ajax/female', function*() {
    this.set('Cache-Control', 'no-cache');
    var querystring = require('querystring');
    var params = querystring.parse(this.req._parsedUrl.query);
    var id = params.id;
    if(!id){
        id ="11067";
    }
    this.body = service.get_female_data();
}));
//todo 渲染男生数据
app.use(controller.get('/ajax/male', function*() {
    this.set('Cache-Control', 'no-cache');
    var querystring = require('querystring');
    var params = querystring.parse(this.req._parsedUrl.query);
    var id = params.id;
    if(!id){
        id ="11067";
    }
    this.body = service.get_male_data(id);
}));
//todo 具体书籍
// var querystring=require('querystring');
app.use(controller.get('/ajax/book', function*() {
    this.set('Cache-Control', 'no-cache');
    var querystring = require('querystring');
    var params = querystring.parse(this.req._parsedUrl.query);
    var id = params.id;
    if(!id){
        id ="18218";
    }
    this.body = service.get_book_data(id);
}));
//todo 获取章节数据
app.use(controller.get('/ajax/chapter_data', function*() {
    this.set('Cache-Control', 'no-cache');
    var querystring = require('querystring');
    var params = querystring.parse(this.req._parsedUrl.query);
    var id = params.id;
    if(!id){
        id ="";
    }
    this.body = service.get_chapter_content_data(id);
}));

//整站端口：127.0.0.1:3000
app.listen(3000);
console.log('koa server is started');
