'use strict';

const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

const config = {
  entry: [
    'bootstrap/dist/js/bootstrap.js',
    __dirname + '/src/main.js'
  ],
  output: {
    path: __dirname + '/public',
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.ejs',
      title: 'Groceries'
    }),
    new webpack.ProvidePlugin({
      jQuery: "jquery",
      $: "jquery",
      Tether: 'tether'
    })
  ]
};

if (process.env.NODE_ENV === 'production') {
  config.plugins.push(new webpack.optimize.UglifyJsPlugin());
} else {
  config.devtool = 'source-map';
}

module.exports = config;
