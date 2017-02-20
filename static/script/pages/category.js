var id=location.href.split('?id=').pop();
$.get('/ajax/category',function(d){
    new Vue({
        el:'#app',
        data:d,
    });
},'json');