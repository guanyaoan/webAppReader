var id=location.href.split('?id=').pop();
$.get('/ajax/male',function(d){
    new Vue({
        el:'#app',
        data:d,
        data:{

            males:d.items,
            male0:d.items[0].data.data,
            male1:d.items[1].data.data,
            male2:d.items[2].data.data,
            male3:d.items[3].data.data,

        },
        methods:{
            readBook:function(){
                location.href='/reader';
            }
        }
    });
},'json');