const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HTMLPlugin = require('html-webpack-plugin');
const isDev = process.env.NODE_ENV = 'development';
const webpack = require('webpack');

const config = {
  mode: isDev ? 'development' : 'production',
  target: 'web',
  entry: {
    index: path.resolve(__dirname, 'src/index.js')
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: '/node_modules/'
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          'less-loader'
        ]
      },
      {
        test: /\.html$/,
        loader: 'html-withimg-loader'
      },
      {
        test: /\.(jpg|JPG|png|gif)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: 'image/[name].[ext]'
          }
        }
      },
      {
        test: /iconfont\.(ttf|svg|eot|woff)$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: 'font/[name].[ext]'
          }
        }]
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new HTMLPlugin({
      template: './src/index.html'
    })
  ]
};

if(isDev){
  config.devtool = '#cheap-module-eval-source-map';
  config.devServer = {
    port: 8000,
    host: '0.0.0.0',
    overlay: {
      errors: true
    },
    hot: true
  };
  config.plugins.push(
    new webpack.HotModuleReplacementPlugin,
    new webpack.NoEmitOnErrorsPlugin
  );
}

module.exports = config;