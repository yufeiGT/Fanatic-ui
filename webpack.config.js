var path = require('path'),
	webpack = require('webpack'),
	development = process.env.NODE_ENV === 'development';

module.exports = {
	externals: development ? {} : {
		vue: 'vue',
		'vue-template-compiler': 'vue-template-compiler',
	},
	entry: {
		'fanatic-ui': development ? './src/_dev/main.js' : './src/index.js',
		// 'app.min': './lib/style/index.js',
	},
	output: {
		path: path.resolve(__dirname, './dist'),
		publicPath: '/dist/',
		filename: '[name].js',
		library: 'Fanatic',
		libraryTarget: 'umd',
		umdNamedDefine: true
	},
	module: {
		rules: [{
			test: /\.css$/,
			use: [
				'vue-style-loader',
				'css-loader'
			],
		}, {
			test: /\.scss$/,
			use: [
				'vue-style-loader',
				'css-loader',
				'sass-loader'
			],
		}, {
			test: /\.sass$/,
			use: [
				'vue-style-loader',
				'css-loader',
				'sass-loader?indentedSyntax'
			],
		}, {
			test: /\.vue$/,
			loader: 'vue-loader',
			options: {
				loaders: {
					// Since sass-loader (weirdly) has SCSS as its default parse mode, we map
					// the "scss" and "sass" values for the lang attribute to the right configs here.
					// other preprocessors should work out of the box, no loader config like this necessary.
					'scss': [
						'vue-style-loader',
						'css-loader',
						'sass-loader', 
						{
							loader: 'sass-resources-loader',
							options: {
								resources: path.resolve(__dirname, './lib/style/adapt.scss'),
							},
						}
					],
					'sass': [
						'vue-style-loader',
						'css-loader',
						'sass-loader?indentedSyntax', 
						{
							loader: 'sass-resources-loader',
							options: {
								resources: path.resolve(__dirname, './lib/style/adapt.scss'),
							},
						}
					]
				}
				// other vue-loader options go here
			}
		}, {
			test: /\.js$/,
			loader: 'babel-loader',
			exclude: /node_modules/
		}, {
			test: /\.(png|jpg|gif|svg)$/,
			loader: 'file-loader',
			options: {
				name: '[name].[ext]?[hash]'
			}
		}, {
			test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
			loader: 'file-loader'
		}]
	},
	resolve: {
		alias: {
			'vue$': 'vue/dist/vue.esm.js',
			'@': path.resolve('src')
		},
		extensions: ['*', '.js', '.vue', '.json']
	},
	devServer: {
		historyApiFallback: true,
		noInfo: true,
		overlay: true,
		hot: true,
		disableHostCheck: true,
	},
	performance: {
		hints: false
	},
	devtool: '#eval-source-map'
}

if (process.env.NODE_ENV === 'production') {
	module.exports.devtool = '#source-map'
		// http://vue-loader.vuejs.org/en/workflow/production.html
	module.exports.plugins = (module.exports.plugins || []).concat([
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: '"production"'
			}
		}),
		new webpack.optimize.UglifyJsPlugin({
			sourceMap: true,
			compress: {
				warnings: false
			}
		}),
		new webpack.LoaderOptionsPlugin({
			minimize: true
		})
	])
}
