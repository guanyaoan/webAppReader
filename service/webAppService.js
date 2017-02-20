//webAppService是连通前端和后端的数据
var fs = require('fs');//引用fs模块
//todo 测试数据
exports.get_test_data = function () {
    var content = fs.readFileSync('./mock/test.json', 'utf-8');
    return content;
};
//todo 获取首页数据
exports.get_index_data=function(){
    var content = fs.readFileSync('./mock/home.json', 'utf-8');
    return content;
};
//todo 获取章节数据
exports.get_chapter_data=function(){
    var content = fs.readFileSync('./mock/reader/chapter.json', 'utf-8');
    return content;
};
//todo 获取排名数据
exports.get_rank_data=function(){
    var content = fs.readFileSync('./mock/rank.json', 'utf-8');
    return content;
};
//todo 获取分类数据
exports.get_category_data=function(){
    var content = fs.readFileSync('./mock/category.json', 'utf-8');
    return content;
};
//todo 获取书架数据
exports.get_bookbacket_data=function(){
    var content = fs.readFileSync('./mock/bookbacket.json', 'utf-8');
    return content;
};
//todo 获取女生频道数据
exports.get_female_data=function(){
    var content = fs.readFileSync('./mock/channel/female.json', 'utf-8');
    return content;
};
//todo 获取男生频道数据
exports.get_male_data=function(){
    var content = fs.readFileSync('./mock/channel/male.json', 'utf-8');
    return content;
};
//todo 获取具体书籍
exports.get_chapter_content_data=function(id){
    if(!id){
        id = "1";
    }
    var content = fs.readFileSync('./mock/reader/data/data'+id+'.json', 'utf-8');
    return content;
};
//todo 获取书籍详情页
exports.get_book_data=function(id){
    if(!id){
        id='18218';
    }
    if(fs.existsSync('./mock/book/'+id+'.json'))
    var content=fs.readFileSync('./mock/book/'+id+'.json','utf-8');
    return content;
}



//todo 搜索线上数据
exports.get_search_data = function (start, end, keyword) {
    return function (cb) {
        var http = require('http');
        var qs = require('querystring');
        //querystring作用:{a:'1'} http://127.0.0.1/api?a=1
        var data = {
            s: keyword,
            start: start,
            end: end
        };
        var content = qs.stringify(data);//查询参数
        var http_request = {
            hostname: 'dushu.xiaomi.com',
            port: 80,
            path: '/store/v0/lib/query/onebox?' + content,
            method:'GET'
        };
        req_obj = http.request(http_request, function (_res) {
            var content = '';
            _res.setEncoding('utf8');
            _res.on('data', function (chunk) {
                content += chunk;
            });
            _res.on('end', function () {
                cb(null, content);
            });
        });
        req_obj.on('error', function () {
            //监听出错信息
        });
        req_obj.end();
    }
};