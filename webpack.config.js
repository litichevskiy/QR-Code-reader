const webpack = require('webpack');
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const NODE_ENV = process.env.NODE_ENV || "development";
const IS_PRODUCTION = NODE_ENV === "production";

module.exports = [
  {
    entry: ['./src/js/sw.js'],
    output: {
      path: path.resolve(__dirname, './dist/js'),
      filename: 'sw.js',
    },
    plugins:[],
    watch: !IS_PRODUCTION,
    mode: NODE_ENV,
    devtool: IS_PRODUCTION ? false : 'source-map',
  },
  {
    entry: {
      bundle: ['./src/js/index.js'],
      css: ['./src/style/index.scss']
    },
    output: {
      path: path.resolve(__dirname, './dist/js'),
      filename: '[name].js',
      chunkFilename: '[name].bundle.js',
    },
    resolve: {
      extensions: [' ', '.js', '.scss', 'css'],
    },
    plugins: [
      new CleanWebpackPlugin(),
      new MiniCssExtractPlugin({
        filename: "../css/bundle.css",
        chunkFilename: "[id].css",
      }),
      new webpack.DefinePlugin ({
        'process.env.NODE_ENV': JSON.stringify ( NODE_ENV )
      }),
    ],
    mode: NODE_ENV,
    devtool: IS_PRODUCTION ? false : 'source-map',
    watch: !IS_PRODUCTION,
    module: {
      rules: [
        {
          test: /\.(js)$/,
          exclude: /node_modules/,
          use: ['babel-loader']
        },
        {
          exclude: /\/node_modules\//,
          test: /\.scss$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader
            },
            {
              loader: 'css-loader',
              options: {sourceMap: !IS_PRODUCTION}
            },
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: !IS_PRODUCTION
              }
            },
            {
              loader: 'sass-loader',
              options: {sourceMap: !IS_PRODUCTION}
            }
          ]
        }
      ]
    }
  }
];