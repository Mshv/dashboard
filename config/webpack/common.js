// shared config (dev and prod)
const {resolve} = require('path');
const {CheckerPlugin} = require('awesome-typescript-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const PropertiesReader = require('properties-reader');
const port = process.env.PORT;
const appProperties = PropertiesReader('./application.properties')._properties;

module.exports = {
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  context: resolve(__dirname, '../../src'),
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['source-map-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.tsx?$/,
        use: [ 'awesome-typescript-loader'],
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: "style-loader" // creates style nodes from JS strings
          },
          {
            loader: "css-loader" // translates CSS into CommonJS
          },
          {
            loader: "sass-loader" // compiles Sass to CSS
          }
        ]
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]',
          publicPath: '../'
        }
      },
    ],
  },
  plugins: [
    new CheckerPlugin(),
            new HtmlWebpackPlugin({
            template: resolve(__dirname, '../../src/app', 'index.html'),
            filename: 'index.html'
        }),
         ],
  performance: {
    hints: false,
  },
  externals: {
    'appProperties': JSON.stringify(appProperties)
  },
};