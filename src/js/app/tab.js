var Tab = (function(){

    function tab(tabs,panels){
        this.$tabs = tabs; //$('footer > .item');
        this.$panels = panels; // $('section');
        this.bind();
    }

    tab.prototype = {
        bind: function(){
            var _this = this;
            this.$tabs.on('click',function(){
                var index = $(this).index();
                $(this).addClass('active').siblings().removeClass('active');
                _this.$panels.hide().eq(index).show();
            })
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


