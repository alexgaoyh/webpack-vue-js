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
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
        loader: 'file-loader'
      }
    ]
  }
}

rimraf(path.join(__dirname, 'dist'), () => console.log('success remove'))

webpackConfig.devtool = "#source-map"
webpackConfig.externals = {
    vue: 'vue',
    'element-ui': 'element-ui'
}
module.exports = [
    merge(webpackConfig, {
        entry: path.resolve('./src/pap-el-input.js'),
        output: {
            filename: 'pap-el-input.min.js',
            libraryTarget: 'window',
            library: 'PapElInput',
        }
    })
]
