var Reuse = require("./reuse.js");

var Top250 = (function(){

    function top250(){
        this.$target = $('main #top250');
        this.$content = this.$target.find('.container');
        this.index = 0;
        this.isLoading = false;
        this.isFinish = false;
        this.bind();
        this.start();
    }

    top250.prototype = {
        bind: function(){
            var _this = this;
            this.$target.scroll(function(){
                 if(!_this.isFinish && Reuse.isToBottom(_this.$target,_this.$content) ){
                    _this.start();
                 }
            })
        },

        start: function(){
             var _this = this;
            this.getData(function(data){
               _this.render(data); 
            })
        },

        getData: function(callback){
            var _this = this;
            if(_this.isLoading) return; 
            _this.isLoading = true ;
            _this.$target.find('.loading').show();
            $.ajax({
              url: '//api.douban.com/v2/movie/top250',
              dataType: 'jsonp',
              data:{
                start: _this.index||0
              }  
            }).done(function(ret){
              //console.log(ret)
              _this.index += 20;
              if(_this.index >= ret.total){
                  _this.isFinish = true;
              }
              // this.appendHtml(ret);
              callback&&callback(ret);     
            }).fail(function(){
              console.log('数据异常!')
            }).always(function(){
              _this.isLoading = false;  
              _this.$target.find('.loading').hide();
            })
        },
    
        render: function(data){
            var _this = this;
            data.subjects.forEach(function(movie) {
                _this.$content.append(Reuse.createNode(movie));
            });
        } 
    }

        return {
            init: function(){
                new top250()
            }
        }

})()

module.exports = Top250;


/*
var top250 = {
    init: function(){
        this.$target = $('main #top250');
        this.index = 0;
        this.isLoading = false;
        this.isFinish = false;
        
        this.bind();
        this.start();
    },
    bind: function(){
        var _this = this;
        this.$target.scroll(function(){
             if(_this.isToBottom() && !_this.isFinish){
                _this.start();
             }
        })
    },

    start: function(){
        var _this = this;
        this.getData(function(data){
           _this.render(data); 
        })
    },

    getData: function(callback){
        var _this = this;
        if(_this.isLoading) return; 
        _this.isLoading = true ;
        _this.$target.find('.loading').show();
        $.ajax({
          url: 'http://api.douban.com/v2/movie/top250',
          dataType: 'jsonp',
          data:{
            start: _this.index||0
          }  
        }).done(function(ret){
          console.log(ret)
          _this.index += 20;
          if(_this.index >= ret.total){
              _this.isFinish = true;
          }
          // this.appendHtml(ret);
          callback&&callback(ret);     
        }).fail(function(){
          console.log('数据异常!')
        }).always(function(){
          _this.isLoading = false;  
          _this.$target.find('.loading').hide();
        })
    },

    render: function(data){
        var _this = this;
        data.subjects.forEach(function(movie) {
           var tpl =`<div class="subject">
                 <div class="movie-pic">
                    <a href="">
                        <img src="http://img7.doubanio.com/view/movie_poster_cover/spst/public/p480747492.webp" alt="">
                    </a>
                 </div>
                 <div class="movie-info">
                     <div class="movie-name">
                         <a href="" class="movie-name-text">肖申克的救赎</a>
                         <span>(1994)</span>
                     </div>
                     <div class="movie-directors">
                         <span class="p1">导演:</span>
                         <span class="directors">弗兰克·德拉邦特</span>
                     </div>
                     <div class="casts">
                         <span class="p1">主演:</span>
                         <span class="acts">蒂姆·罗宾斯 / 摩根·弗里曼 / 鲍勃·冈顿</span>
                     </div>
                     <div class="type">
                         <span class="p1">类型:</span>
                         <span class="genres">犯罪 / 剧情</span>
                     </div>
                     <div class="collect-count">
                         <span class="p1">收藏人数:</span>
                         <span class="count">1142014</span>
                     </div>
                     <div class="score">
                         <span class="p1">评分:</span>
                         <span class="number">9.2</span>
                     </div>
                 </div>
             </div>`;
             var $node = $(tpl);
             $node.find('.movie-pic img').attr('src',movie.images.medium)
             $node.find('.movie-name .movie-name-text').text(movie.title)
             $node.find('.movie-name span').text(`(${movie.year})`)
             $node.find('.movie-directors .directors').text(function(item){
                 var directArr = []
                 movie.directors.forEach(function(item){
                     directArr.push(item.name)
                 })
                 return directArr.join(' / ')
            })
            $node.find('.collect-count .count').text(movie.collect_count)
            $node.find('.score .number').text(movie.rating.average)
            $node.find('.type .genres').text(movie.genres.join(' / '));
            $node.find('.casts .acts').text(function(){
                var actArr = []
                movie.casts.forEach(function(item){
                   actArr.push(item.name)
                })
                return actArr.join(' / ')
            })
        
            _this.$target.find('.container').append($node);
        });
    },
    isToBottom: function(){
        return this.$target.find('.container').height() <= this.$target.height() + this.$target.scrollTop() + 10;
    }
}
*/
