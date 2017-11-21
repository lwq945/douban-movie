var Tab = require("./app/tab.js");
var top250= require("./app/top250.js")
var usBox = require("./app/usbox.js")
var search = require("./app/search.js")
require("../css/style.css")


Tab.init($('footer > .item'),$('section'))
top250.init();
usBox.init();
search.init();