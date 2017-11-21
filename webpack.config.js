var webpack = require('webpack');
var path = require('path')
var ExtractTextPlugin = require("extract-text-webpack-plugin")

module.exports = {
	entry: {
    bundle: './src/js/index.js'
  },
	output: {
    path: path.join(__dirname,'/dist'),
    filename: '[name].js'
	},

	module:{
		rules: [
			{
				test: /\.js$/,
				exclude: /(node_modules)/, // 排除 不编译当前目录下的js
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/,
        exclude: /(node_modules)/,
        use: ExtractTextPlugin.extract({
        // 必须这样写，否则会报错
          fallback: "style-loader",
          use: "css-loader"
        })
      }
		]
	},

	resolve: {
    alias: {
        jquery: path.join(__dirname,'src/js/lib/jquery-3.1.1.min.js')   //给jquery取别名
    }
  },

	plugins: [
		new webpack.ProvidePlugin({ //不用手动引入jquery
        $: "jquery"
    }),
    new webpack.optimize.UglifyJsPlugin({  //压缩js
        compress: {
            warnings: false
        }
    }),
    new ExtractTextPlugin("./[name].css") //分离css,js
	]
}