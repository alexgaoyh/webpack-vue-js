const path = require('path'),
  webpack = require('webpack'),
  rimraf = require('rimraf'),
  merge = require('webpack-merge')

let webpackConfig = {
  entry: {
    app: ''
  },
  output: {
    filename: '',
    path: path.resolve(__dirname + '/dist')
  },
  resolve: {
    extensions: ['.vue', '.js']
  },
  devtool: '#cheap-module-eval-source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [path.join(__dirname, 'src'), path.join(__dirname, 'demo')],
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"]
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      }
    ]
  }
}

rimraf(path.join(__dirname, 'dist'), () => console.log('success remove'))

webpackConfig.devtool = "#source-map"
webpackConfig.externals = {
    vue: 'vue'
}
module.exports = [
    merge(webpackConfig, {
        entry: path.resolve('./src/build.js'),
        output: {
            filename: 'vue-txt-number.min.js',
            libraryTarget: 'window',
            library: 'VueTxtNumber',
        }
    })
]
