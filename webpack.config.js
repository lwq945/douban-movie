var webpack = require('webpack');
var path = require('path')

module.exports = {
	entry: './src/js/index.js',
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname,'dist/js')
	},

	module:{
		rules: [
			{
				test: /\.js$/,
				exclude: /(node_modules)/, // 排除 不编译当前目录下的js
        use: {
            loader: 'babel-loader'
        }
			}
		]
	},

	resolve: {
        alias: {
            jquery: path.join(__dirname,'src/js/lib/jquery-3.1.1.min.js')   //给jquery去别名
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
    })
	]
}