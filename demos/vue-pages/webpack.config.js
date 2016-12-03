const path =  require('path');
const webpack =  require('webpack');

module.exports = {
    cache: true,
    entry: { build: './index.js' },
    output: {
        path: __dirname,
        filename: '[name].js'
    },
    clearBeforeBuild: true,
    module: {
        loaders: [
            {
                test: /\.vue$/,
                loader: 'vue'
            },
            {
                test: /\.js$/,
                loader: "babel-loader",
                exclude: /node_modules/
            },
        ]
    },
    babel: {
        presets: ['es2015'],
        plugins: ['transform-runtime']
    },
    resolve: {
        alias: {
            vue: 'vue/dist/vue.js',
        },
        extensions: ['', '.js', '.vue'],
        fallback: [path.join(__dirname, './node_modules')],
      },
    plugins : [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
              warnings: false
            },
            output: {
                comments: false
            },
            except: ['exports', 'require']
        })
    ]
};