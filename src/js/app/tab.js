var Tab = (function(){

    function tab(tabs,panels){
        this.$tabs = tabs; //$('footer > .item');
        this.$panels = panels; // $('section');
        this.bind();
        this.initPage()
    }

    tab.prototype = {
        bind: function(){
            var _this = this;
            this.$tabs.on('click',function(e){
                var page = $(this).data("page")
                var index = $(this).index();
                if(page){
                  $(this).addClass('active').siblings().removeClass('active');
                  _this.$panels.hide().eq(index).show();
                  _this.setUrl(page)
                }  
            });

            window.onpopstate =function(){     // 当改变url时触发
              _this.initPage();
           }
        },

        setUrl: function(page) {
            var url = location.pathname + '#' + page
            history.pushState({url: url, title: document.title}, document.title, url)
        },

        initPage: function(){
            var _this = this;
            var hash = location.hash.split('#')
            console.log(hash)
            if(hash[1]){
              this.$tabs.each(function(index,item){
                 var attr = $(item).attr('data-page')
                 if(attr === hash[1]){
                     console.log(index)
                     _this.$tabs.eq(index).addClass('active').siblings().removeClass('active');
                     _this.$panels.eq(index).show().siblings().hide();
                 }
              })   
            }else {
                   console.log(233333)
                  this.$tabs.eq(0).addClass('active').siblings().removeClass('active');
                  this.$panels.eq(0).show().siblings().hide();
            }
        }
    }

    return {
        init: function(tabs,panels){
            new tab(tabs,panels);
        }
    }
})()
    
module.exports = Tab;


    // init: function(){
    //     this.$tabs = $('footer > .item');
    //     this.$panels = $('section');
    //     this.bind();
    // },
    // bind: function(){
    //     var _this = this;
    //     this.$tabs.on('click',function(){
    //         var index = $(this).index();
    //         $(this).addClass('active').siblings().removeClass('active');
    //         _this.$panels.hide().eq(index).show();
    //     })
    // }


